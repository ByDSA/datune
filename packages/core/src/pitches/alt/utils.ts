import { Degree as DiatonicDegree } from "degrees/diatonic";
import { Interval as ChromaticInterval } from "intervals/chromatic";
import { Interval as DiatonicInterval } from "intervals/diatonic";
import { NUMBER as C_NUMBER } from "pitches/chromatic";
import { MAJOR_SCALE_DEGREES } from "scales/chromatic";

export function fixAlts(alts: number): number {
  let fixed = alts % C_NUMBER;

  if (fixed < -C_NUMBER / 2)
    fixed += C_NUMBER;
  else if (fixed > C_NUMBER / 2)
    fixed -= C_NUMBER;

  return fixed;
}

export function calcAlts(
  chromaticInterval: ChromaticInterval,
  diatonicDegree: DiatonicDegree | DiatonicInterval,
): number {
  return chromaticInterval - MAJOR_SCALE_DEGREES[+diatonicDegree];
}
