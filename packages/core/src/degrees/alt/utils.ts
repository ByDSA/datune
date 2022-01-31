/* eslint-disable import/prefer-default-export */
import { Degree as ChromaticDegree, fromInt } from "degrees/chromatic";
import { Degree as DiatonicDegree } from "degrees/diatonic";
import { MAJOR_SCALE_DEGREES } from "scales/chromatic";

export function toChromatic(diatonicDegree: DiatonicDegree, alts: number): ChromaticDegree {
  const sum = toChromaticIntWithoutAlts(diatonicDegree) + alts;
  const chromaticDegree = fromInt(+sum);

  return chromaticDegree;
}

function toChromaticIntWithoutAlts(diatonicDegree: DiatonicDegree): number {
  return MAJOR_SCALE_DEGREES[+diatonicDegree];
}
