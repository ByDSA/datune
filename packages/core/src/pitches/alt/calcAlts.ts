import { Degree as DiatonicDegree } from "degrees/diatonic";
import type { Interval as ChromaticInterval } from "intervals/chromatic";
import type { Interval as DiatonicInterval } from "intervals/diatonic";
import { Scales } from "scales/chromatic";

export function calcAlts(
  chromaticInterval: ChromaticInterval,
  diatonicDegree: DiatonicDegree | DiatonicInterval,
): number {
  return chromaticInterval - Scales.MAJOR_SCALE_DEGREES[+diatonicDegree];
}
