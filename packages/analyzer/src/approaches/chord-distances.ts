/* eslint-disable no-use-before-define */
import { Chord, Degrees as D, Degree, Funcs, Intervals as I, Key, Pitch, PitchSet } from "@datune/core";

// Función: distancia de voice leading (suma de movimientos mínimos)
export function voiceLeadingDistance(ps1: PitchSet, ps2: PitchSet) {
  if (ps1 === ps2)
    return 0;

  const pitchesAnt = ps1.pitches;
  const pitchesAct = ps2.pitches;
  let distanciaTotal = 0;

  // Para cada nota del acorde anterior, encuentra la más cercana en el actual
  for (let pitchAnt of pitchesAnt) {
    let minDistancia = Infinity;

    for (let pitchAct of pitchesAct) {
      let distancia = Math.abs(I.between(pitchAnt, pitchAct));

      minDistancia = Math.min(minDistancia, distancia);
    }

    distanciaTotal += minDistancia;
  }

  return distanciaTotal;
}

// Unified function: calculates matches, missing and extra in a single loop
export function matchingDistance(ps1: PitchSet, ps2: PitchSet) {
  let matches = new Set<Pitch>();
  let extras = new Set<Pitch>();
  let missing = new Set<Pitch>();

  // Count matches and extras
  for (let note of ps1) {
    if (ps2.has(note))
      matches.add(note);
    else
      extras.add(note);
  }

  // Count missing
  for (let note of ps2) {
    if (!ps1.has(note))
      missing.add(note);
  }

  return {
    matches,
    missing,
    extras,
  };
}

export function matchingDistanceInt(
  ps1: PitchSet,
  c2: Chord,
): number {
  const ps2 = c2.pitchSet;
  const matchingDist = matchingDistance(ps1, ps2);
  const { matches, missing, extras } = matchingDist;

  if (!ps1.has(c2.bass))
    return +Infinity; // Si falta el bajo, se descarta

  // Normalizar matching por tamaño de acordes
  const totalPitches = Math.max(ps1.pitches.length, ps2.pitches.length);
  // Componentes de distancia (valores entre 0-1)
  const matchingComponent = 1 - (matches.size / totalPitches);
  const missingInt = getMissingInt(missing, c2);
  const missingComponent = missingInt / totalPitches;
  const extrasComponent = extras.size / totalPitches;

  // Combinación con pesos fijos
  return (5 * matchingComponent) + (2 * missingComponent) + extrasComponent;
}

function getMissingInt(missing: Set<Pitch>, c2: Chord): number {
  if (missing.size === 0)
    return 0;

  // Si hay notas faltantes, se penaliza más si son notas importantes del acorde
  let missingInt = 0;

  for (let pitch of missing) {
    const rootInterval = I.betweenNext(c2.root, pitch);

    switch (rootInterval) {
      case I.P1:
        missingInt += 2;
        break;
      case I.P5:
        missingInt += 0.5;
        break;
      default:
        missingInt += 1;
        break;
    }
  }

  return missingInt;
}

export function distanciaCognitiva(ps1: PitchSet, c2: Chord, ctx: HarmonicContext): number {
  const { lastChord } = ctx;
  const ps2 = c2.pitchSet;
  const matchingDistInt = matchingDistanceInt(ps1, c2);
  const isDifferentRoot = lastChord?.root !== c2.root;
  const vlDist = voiceLeadingDistance(ps1, ps2);
  // Voice leading normalizado (asumiendo rango típico 0-12)
  const vlComponent = 0;// Math.min(vlDist / 12, 1);
  const differentRootInt = isDifferentRoot ? 1 : 0;

  // Combinación con pesos cognitivos fijos
  // Coincidencias son lo más importante, voice leading lo menos
  return differentRootInt + matchingDistInt + (0.5 * vlComponent);
}

type Candidates = {
  dist: number;
  chord: Chord;
};
export function getSortedCantidates(
  init: PitchSet,
  chords: Chord[],
  ctx: HarmonicContext,
): Candidates[] {
  const { bass } = ctx;
  const eachDistance = chords
    .filter(c=>c.bass === ctx.bass)
    .map(c=>( {
      dist: distanciaCognitiva(init, c, ctx),
      chord: c,
    } ))
    .sort((a, b)=>{
      const epsilon = 1e-6;

      if (Math.abs(a.dist - b.dist) < epsilon) {
        if (a.chord.bass === bass)
          return -1;

        if (b.chord.bass === bass)
          return 1;

        return 1; // Prioriza los acordes superiores en la lista
      }

      return a.dist - b.dist;
    } );

  return eachDistance;
}

export function getRegionByDegree(degree: Degree): HarmonicRegionName {
  switch (degree) {
    case D.I:
    case D.bIII:
    case D.III:
    case D.bVI:
    case D.VI:
      return HarmonicRegionName.tonic;
    case D.bII:
    case D.II:
    case D.IV:
      return HarmonicRegionName.subDominant;
    case D.V:
    case D.bV:
    case D.bVII:
    case D.VII:
      return HarmonicRegionName.dominant;
    default:
      throw new Error(`Unknown harmonic region for interval ${degree}`);
  }
}
type HarmonicContext = {
  bass: Pitch;
  lastDegree?: Degree;
  harmonicRegions: HarmonicRegions;
  lastChord?: Chord;
};
export function lowestDistanceChord(
  init: PitchSet,
  ctx: HarmonicContext,
): Chord {
  const { harmonicRegions, lastDegree } = ctx;
  const currentRegionName = lastDegree !== undefined
    ? getRegionByDegree(lastDegree)
    : HarmonicRegionName.tonic;
  const currentRegion = harmonicRegions[currentRegionName];
  const currentDegreeChords = lastDegree !== undefined
    ? currentRegion[lastDegree] ?? []
    : [];
  let bestInDegreeRegion;
  let bestInCurrentRegion;
  let bestInOtherRegions;

  if (currentDegreeChords.length > 0) {
    const res = getSortedCantidates(init, currentDegreeChords, ctx);

    bestInDegreeRegion = res[0];
  }

  let currentRegionChords: Chord[] = Object.entries(currentRegion)
    .flatMap(([key, value])=> {
      if (+key === lastDegree)
        return [];

      return value;
    } );

  if (currentRegionChords.length !== 0) {
    const res = getSortedCantidates(init, currentRegionChords, ctx);

    bestInCurrentRegion = res[0];
  }

  const otherRegionsChords = Object.entries(harmonicRegions)
    .flatMap(([regionName, region])=> {
      if (regionName === currentRegionName)
        return [];

      return Object.values(region).flat();
    } );
  const res = getSortedCantidates(init, otherRegionsChords, ctx);

  bestInOtherRegions = res[0];

  if (bestInDegreeRegion && bestInDegreeRegion.dist < 2)
    return bestInDegreeRegion.chord;

  if (bestInCurrentRegion && bestInCurrentRegion.dist < 3
    && (bestInOtherRegions === undefined || bestInOtherRegions.dist > 1)
  )
    return bestInCurrentRegion.chord;

  const possibles = [bestInDegreeRegion, bestInCurrentRegion, bestInOtherRegions]
    .filter((c): c is Candidates => c !== undefined) as Candidates[];
  const minimum = possibles
    .reduce((min, c) => (c.dist < min.dist ? c : min), possibles[0]);

  return minimum.chord;
}

export enum HarmonicRegionName {
  tonic = "tonic",
  subDominant = "subDominant",
  dominant = "dominant",
}
type HarmonicRegion = Partial<Record<Degree, Chord[]>>;
type HarmonicRegions = {
  [HarmonicRegionName.tonic]: HarmonicRegion;
  [HarmonicRegionName.subDominant]: HarmonicRegion;
  [HarmonicRegionName.dominant]: HarmonicRegion;
};
const harmonicRegions = new Map<Key, HarmonicRegions>();

export function getHarmonicRegions(key: Key): HarmonicRegions {
  let harmonicRegion: HarmonicRegions | undefined = harmonicRegions.get(key);

  if (!harmonicRegion) {
    const tonicRegion: HarmonicRegion = {
      [D.I]: [
        Funcs.Im.getChord(key),
        Funcs.Im.getChord(key).withInv(),
        Funcs.Im7.getChord(key),
        Funcs.Im7.getChord(key).withInv(),
        Funcs.fromDegrees(D.I, D.bIII, D.V, D.bVII, D.II).getChord(key), // Im9
        // Im11
        Funcs.ISUS4.getChord(key),
        Funcs.fromDegrees(D.I, D.bIII, D.bVI).getChord(key), // Im6
        // Isus2
        // Iadd9
        Funcs.fromDegrees(D.I, D.II, D.IV).getChord(key),
      ],
      [D.bIII]: [
        Funcs.bIII.getChord(key),
        Funcs.bIIIMaj7.getChord(key),
      ],
      [D.bVI]: [
        Funcs.bVI.getChord(key),
        Funcs.bVIMaj7.getChord(key),
      ],
    };
    const subDominantRegion: HarmonicRegion = {
      [D.IV]: [
        Funcs.IVm.getChord(key),
        Funcs.IVm7.getChord(key),
      ],
      [D.II]: [
        Funcs.II0.getChord(key),
        Funcs.fromDegrees(D.II, D.IV, D.bVI, D.I).getChord(key), // IIº7
      ],
    };
    const dominantRegion = {
      [D.V]: [
        Funcs.Vm.getChord(key),
        Funcs.Vm.getChord(key).withInv(),
        Funcs.Vm.getChord(key).withInv(2),
        Funcs.V.getChord(key),
        Funcs.V7.getChord(key),
        Funcs.VSUS4.getChord(key),
        Funcs.V7SUS4.getChord(key),
      ],
      [D.bVII]: [
        Funcs.bVII.getChord(key),
        Funcs.bVIISUS4.getChord(key),
      ],
    };

    harmonicRegion = {
      dominant: dominantRegion,
      subDominant: subDominantRegion,
      tonic: tonicRegion,
    };
    harmonicRegions.set(key, harmonicRegion);
  }

  return harmonicRegion;
}
