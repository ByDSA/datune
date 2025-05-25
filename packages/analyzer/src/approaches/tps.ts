import { Intervals as I, Key, Pitch } from "@datune/core";
import { PitchSet } from "@datune/core/chromatic";

// Array circular que representa el Círculo de quintas (en semitonos)
const FIFTHS_CIRCLE: number[] = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];

/**
 * Calcula la distancia mínima entre dos notas en el Círculo de quintas
 */
function tonalDistance(a: Pitch, b: Pitch): number {
  const idxA = FIFTHS_CIRCLE.indexOf(+a);
  const idxB = FIFTHS_CIRCLE.indexOf(+b);
  const diff = Math.abs(idxA - idxB);

  return Math.min(diff, FIFTHS_CIRCLE.length - diff);
}

function chordToneRatio(root: Pitch, pcs: Pitch[]): number {
  const tones = new Set<number>([+root]);
  const maj3 = root.withAdd(I.M3);
  const min3 = root.withAdd(I.m3);
  const p5 = root.withAdd(I.P5);
  const maj7 = root.withAdd(I.M7);
  const min7 = root.withAdd(I.m7);

  if (pcs.includes(maj3) || pcs.includes(min3))
    tones.add(pcs.includes(maj3) ? +maj3 : +min3);

  if (pcs.includes(p5))
    tones.add(+p5);

  if (pcs.includes(maj7) || pcs.includes(min7))
    tones.add(pcs.includes(maj7) ? +maj7 : +min7);

  const count = pcs.filter(p => tones.has(+p)).length;

  return count / pcs.length;
}

/**
 * Detecta la raíz de un pitchset dado una tonalidad
 * @param key Tonalidad (Key)
 * @param pitchSet Conjunto de pitches
 * @param bass Pitch de bajo
 * @returns Pitch raíz más probable
 */
export function detectRootTPS(
  key: Key,
  pitchSet: PitchSet,
  bass: Pitch,
): Pitch {
  const pcs = pitchSet.pitches;
  const keyPc = key.root;

  if (pcs.length < 2)
    return bass;

  // 1. filtrar tríadas completas
  const triadRoots = pcs.filter(root => {
    const maj3 = root.withAdd(I.M3);
    const min3 = root.withAdd(I.m3);
    const p5 = root.withAdd(I.P5);

    return (pcs.includes(maj3) && pcs.includes(p5)) || (pcs.includes(min3) && pcs.includes(p5));
  } );
  let candidates: Pitch[];
  let fallback = false;

  if (triadRoots.length > 0)
    candidates = triadRoots;
  else {
    // fallback todos con ratio > 0
    fallback = true;
    // calcular ratio y filtrar los top máximos
    const ratios = pcs.map(r => ( {
      root: r,
      ratio: chordToneRatio(r, pcs),
    } ));
    const maxRatio = Math.max(...ratios.map(r => r.ratio));

    candidates = ratios.filter(r => r.ratio === maxRatio).map(r => r.root);
  }

  // 2. selección directa
  const direct = candidates.find(r => +r === +bass);

  if (direct)
    return direct;

  // 3. inversión
  for (const root of candidates) {
    if (+bass === +root.withAdd(I.M3) || +bass === +root.withAdd(I.m3) || +bass === +root.withAdd(I.P5))
      return root;
  }

  // 4 y 5. entre candidatos, distancia tonal
  let best = candidates[0];
  let bestScore = Infinity;

  for (const root of candidates) {
    const dist = tonalDistance(keyPc, root);
    const score = fallback ? dist : dist; // igual

    if (score < bestScore) {
      best = root;
      bestScore = score;
    }
  }

  return best;
}
