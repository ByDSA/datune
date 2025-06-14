import { Chord, Degree, Func, Funcs, Intervals as I, Key, Keys, PitchSet, Scale, Scales, IntervalSet, IntervalSets } from "@datune/core/alt";
import { getId as getChordId } from "@datune/core/chords/octave/alt/caching/cache";
import { getId as getKeyId } from "@datune/core/keys/alt/building/caching/cache";
import { triadRootChord } from "@datune/core/keys/alt/modifiers";
import { CompoundFunc } from "@datune/core/functions/alt/compound-function/CompoundFunc";
import { DegreeFunc } from "@datune/core/functions/alt/degree-function/DegreeFunc";
import { majorMinorKeyFromChord } from "../regional/chord-region-distance-rule";
import { regionalLevelChordDistanceRule } from "../regional/chord-distance-rule";
import { regionalDistanceRule } from "../regional/regional-distance-rule";
import { findManyByDistance } from "./finder";

type FuncChord = {
  chord: Chord;
  func: Func;
};
export function getAllDiatonicChordsInRegion(key: Key): Set<FuncChord> {
  const ret = new Set<FuncChord>();
  const diatonicFuncs: Func[] = [
    Funcs.I,
    Funcs.bII,
    Funcs.II,
    Funcs.bIII,
    Funcs.III,
    Funcs.IV,
    Funcs.IV.withShifted(I.a1),
    Funcs.bV,
    Funcs.V,
    Funcs.bVI,
    Funcs.VI,
    Funcs.bVII,
    Funcs.VII,
  ].flatMap(f=> {
    return [
      f,
      f.withIntervalSet(IntervalSets.TRIAD_MINOR),
      f.withIntervalSet(IntervalSets.TRIAD_DIMINISHED),
    ];
  } );
  const dominantSecondariesFuncs = key.pitches
    .map(p=>I.betweenNext(key.root, p).withSimplified())
    .map(degree => {
      return getSecondariesFromDegree(degree);
    } );

  diatonicFuncs.push(...dominantSecondariesFuncs.flat(1));

  for (const f of diatonicFuncs) {
    const chord = f.getChord(key.root);

    if (key.hasChord(chord)) {
      ret.add( {
        chord,
        func: f,
      } );
    }
  }

  return ret;
}

function getSecondariesFromDegree(degree: Degree): Func[] {
  return [
    Funcs.compose(Funcs.V, degree),
    Funcs.compose(Funcs.V7, degree),
    Funcs.compose(Funcs.SUBV7, degree),
    Funcs.compose(Funcs.V7ALT, degree),
  ];
}

function scaleHasDegrees(scale: Scale, ...degrees: Degree[]): boolean {
  return degrees.every(d=>scale.rootIntervals.includes(d));
}

function scaleIsMajorOrMinor(scale: Scale): boolean {
  if (scaleHasDegrees(scale, ...IntervalSets.TRIAD_MAJOR.rootIntervals))
    return true;

  if (scaleHasDegrees(scale, ...IntervalSets.TRIAD_MINOR.rootIntervals))
    return true;

  return false;
}
function keyIsMajorOrMinor(key: Key): boolean {
  const { scale } = key;

  return scaleIsMajorOrMinor(scale);
}
function chordIsMajorOrMinor(chord: Chord): boolean {
  if (chord.hasRootIntervals(...IntervalSets.TRIAD_MAJOR.rootIntervals))
    return true;

  if (chord.hasRootIntervals(...IntervalSets.TRIAD_MINOR.rootIntervals))
    return true;

  return false;
}

type KeyChord = {
  key: Key;
  chord: Chord;
};
type RegionChordFunc = {
  region: Key;
  chord: Chord;
  func: Func;
};
function hashKeyChord(kc: KeyChord): string {
  return getKeyId(kc.key) + " " + getChordId(kc.chord);
}
export function getAllTriadChordsInRegion(region: Key): Set<RegionChordFunc> {
  if (!keyIsMajorOrMinor(region))
    return new Set();

  const { root, scale } = region;
  const modes = Scales.modes(scale);
  const keyModes = modes.map(s=>Keys.from(root, s));
  const ret = new Set<RegionChordFunc>();

  for (const k of keyModes) {
    const dChordFuncs = getAllDiatonicChordsInRegion(k);

    for (const cf of dChordFuncs) {
      ret.add( {
        chord: cf.chord,
        func: cf.func,
        region: k,
      } );
    }
  }

  return ret;
}

type N = KeyChord;
type Props = {
  start: {
    chord: Chord;
    degreeKey?: Key;
    region: Key;
  };
  goal: {
    pitchSet: PitchSet;
  };
};
type Params = Parameters<typeof findManyByDistance<N>>[0];
type Ret = ReturnType<typeof findManyByDistance<N>>;
export function findChordByPitchSet( { start, goal }: Props): Ret {
  const isTarget: Params["isTarget"] = (node) => {
    return node.chord.pitchSet === goal.pitchSet;
  };
  const getKey: Params["getKey"] = hashKeyChord;
  let { degreeKey } = start;

  if (degreeKey === undefined) {
    const funcs = getFuncsOfChord(start.chord, start.region);

    degreeKey = getChordKeyBaseFromFuncRegion(funcs[0], start.region);
  }

  const startNode: Params["start"] = {
    chord: start.chord,
    key: degreeKey,
  };
  const getNeighbors: Params["getNeighbors"] = (node: N): ReturnType<Params["getNeighbors"]> => {
    const isFirstNode = node.chord === start.chord && node.key === degreeKey;

    if (isFirstNode) {
      const neighbors = [...getAllTriadChordsInRegion(start.region)];
      const goalInNeighbors = neighbors
        .map(n=> ( {
          chord: n.chord,
          key: node.key,
        } ))
        .filter(c=>isTarget(c))
        // filter duplicates:
        .filter((c, index, self) => {
          return self.findIndex(n=>n.chord === c.chord && n.key === c.key) === index;
        } );

      if (goalInNeighbors.length > 0) {
        return goalInNeighbors.map(n=> {
          const distance = regionalLevelChordDistanceRule( {
            x: {
              chord: node.chord,
              key: node.key,
            },
            y: {
              chord: n.chord,
              key: node.key, // TODO: posiblemente haya que poner la keyChord de n.chord
            },
          } ).dist;

          return {
            node: n as N,
            distance,
          };
        } );
      }

      const startTonic = triadRootChord(start.region)!;

      if (node.chord !== startTonic) {
        const distance = regionalLevelChordDistanceRule( {
          x: {
            chord: node.chord,
            key: node.key,
          },
          y: {
            chord: startTonic,
            key: start.region,
          },
        } ).dist;

        return [
          {
            distance,
            node: {
              chord: startTonic,
              key: start.region,
            } as N,
          },
        ];
      }
    }

    const keyFromChord = node.key;
    const neighbors = [...getAllTriadChordsInRegion(keyFromChord)];
    const goalInNeighbors = neighbors
      .map(n=> ( {
        chord: n.chord,
        key: node.key,
      } ))
      .filter(c=>isTarget(c))
      // filter duplicates:
      .filter((c, index, self) => {
        return self.findIndex(n=>n.chord === c.chord && n.key === c.key) === index;
      } );

    if (goalInNeighbors.length > 0) {
      const goalTonic = triadRootChord(keyFromChord)!;

      return goalInNeighbors.flatMap(n=> {
        const funcsOfChord = getFuncsOfChord(n.chord, n.key);

        return funcsOfChord.map(f => {
          let goalChordKey: Key = getChordKeyBaseFromFuncRegion(f, n.key);
          const distance = regionalLevelChordDistanceRule( {
            x: {
              chord: goalTonic,
              key: n.key,
            },
            y: {
              chord: n.chord,
              key: goalChordKey,
            },
          } ).dist;

          return {
            distance,
            node: {
              chord: n.chord,
              key: goalChordKey,
            },
          };
        } );
      } );
    }

    const neighborsMajorOrMinor = neighbors.filter(n=> {
      return chordIsMajorOrMinor(n.chord) && keyIsMajorOrMinor(n.region);
    } );

    return neighborsMajorOrMinor.map(n => {
      const keyTo = majorMinorKeyFromChord(n.chord);
      const distance = regionalDistanceRule( {
        from: keyFromChord,
        to: keyTo,
      } ).dist;

      return {
        distance,
        node: {
          chord: n.chord,
          key: keyTo,
        },
      };
    } ).filter(n => n.distance > 0);
  };
  const ret = findManyByDistance<N>( {
    getKey,
    getNeighbors,
    isTarget,
    // maxDistance: 35,
    start: startNode,
  } );

  return ret;
}

function getFuncsOfChord(chord: Chord, region: Key): Func[] {
  const ret: Func[] = [];
  const all = getAllTriadChordsInRegion(region);

  for (const a of all) {
    if (a.chord === chord)
      ret.push(a.func);
  }

  return ret;
}

function getDegreeFunc(f: Func): DegreeFunc | null {
  if (f instanceof CompoundFunc)
    return f.degreeFunc;
  else if (f instanceof DegreeFunc)
    return f;

  return null;
}

function getDegreeBase(f: Func): Degree | null {
  if (f instanceof CompoundFunc)
    return f.degreeChain.at(-1)!;
  else if (f instanceof DegreeFunc)
    return f.degree;

  return null;
}

function getChordKeyBaseFromFuncRegion(f: Func, region: Key): Key {
  let degree = getDegreeBase(f);
  let degreeFunc = getDegreeFunc(f);

  if (degree === null || degreeFunc === null)
    throw new Error(`The function ${f} does not have a degree or degree function.`);

  const pitch = region.root.withShifted(degree);
  let scale: Scale;
  const mode = region.pitches.indexOf(pitch);

  if (mode === -1)
    throw new Error(`The pitch ${pitch} is not in the region ${region}.`);

  scale = Scales.mode(region.scale, mode + 1);

  if (scale !== Scales.MAJOR && scale !== Scales.MINOR) {
    if (scaleHasDegrees(scale, ...IntervalSets.TRIAD_MAJOR))
      scale = Scales.MAJOR;
    else if (scaleHasDegrees(scale, ...IntervalSets.TRIAD_MINOR))
      scale = Scales.MINOR;
    else
      scale = intervalSetToScale(degreeFunc.intervalSet);
  }

  return Keys.from(pitch, scale!);
}

function intervalSetToScale(intervalSet: IntervalSet): Scale {
  const candidates = [Scales.MAJOR, Scales.MINOR];

  for (const c of candidates) {
    if (scaleHasDegrees(c, ...intervalSet))
      return c;
  }

  throw new Error(`The intervalSet ${intervalSet} is not compatible with any scale.`);
}
