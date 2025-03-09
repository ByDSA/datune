import type { Interval as ChromaticInterval } from "intervals/chromatic";
import type { Interval as DiatonicInterval } from "intervals/diatonic";
import { Degree as DiatonicDegree } from "degrees/diatonic";
import { MAJOR_SCALE_DEGREES } from "scales/symbolic/chromatic/constants/majorScaleDegrees";

export function calcAlts(
  chromaticInterval: ChromaticInterval,
  diatonicDegree: DiatonicDegree | DiatonicInterval,
): number {
  return chromaticInterval - MAJOR_SCALE_DEGREES[+diatonicDegree];
}
