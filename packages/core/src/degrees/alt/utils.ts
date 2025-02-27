/* eslint-disable import/prefer-default-export */
import { Degree as ChromaticDegree, Degrees as CDegrees } from "degrees/chromatic";
import { Degree as DiatonicDegree } from "degrees/diatonic";
import { Scales as CScales } from "scales/chromatic";

export function toChromatic(diatonicDegree: DiatonicDegree, alts: number): ChromaticDegree {
  const sum = toChromaticIntWithoutAlts(diatonicDegree) + alts;
  const chromaticDegree = CDegrees.fromInt(+sum);

  return chromaticDegree;
}

function toChromaticIntWithoutAlts(diatonicDegree: DiatonicDegree): number {
  return CScales.MAJOR_SCALE_DEGREES[+diatonicDegree];
}
