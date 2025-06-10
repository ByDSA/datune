import { Pitch, Pitches } from "@datune/core";

// Array circular que representa el Círculo de quintas (en semitonos)
const FIFTHS_CIRCLE: number[] = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];
const FIFTHS_CIRCLE_INDEX: { [key: number]: number } = Object.freeze(FIFTHS_CIRCLE.reduce(
  (acc, pitch, index) => {
    acc[pitch] = index;

    return acc;
  },
  {} as { [key: number]: number },
));

/**
 * Calcula la distancia mínima entre dos notas en el Círculo de quintas
 */
export function fifthDistance(a: Pitch, b: Pitch): number {
  const idxA = FIFTHS_CIRCLE_INDEX[+a];
  const idxB = FIFTHS_CIRCLE_INDEX[+b];
  const diff = idxB - idxA;

  if (diff > 6)
    return diff - Pitches.NUMBER;

  if (diff < -5)
    return diff + Pitches.NUMBER;

  return diff;
}

export function fifthDistanceAbs(a: Pitch, b: Pitch): number {
  const idxA = FIFTHS_CIRCLE_INDEX[+a];
  const idxB = FIFTHS_CIRCLE_INDEX[+b];
  const diff = Math.abs(idxB - idxA);

  return Math.min(diff, Pitches.NUMBER - diff);
}
