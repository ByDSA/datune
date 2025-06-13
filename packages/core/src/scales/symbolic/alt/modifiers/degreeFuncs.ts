import type { Scale } from "../Scale";
import type { DegreeArray as CDegreeArray } from "degrees/chromatic";
import type { DegreeFunc } from "functions/alt/degree-function/DegreeFunc";
import { getDegrees } from "functions/alt/degree-function/conversions";
import { fromDegreeVoicing } from "functions/alt/degree-function/building";
import { Voicings as V } from "voicings/relative/alt";

export function getDegreeFuncs(obj: Scale): DegreeFunc[] {
  const ret: DegreeFunc[] = [];
  const voicings = V.COMMON;

  for (const degree of obj.degrees) {
    for (const voicing of voicings) {
      const degreeFunction = fromDegreeVoicing(degree, voicing);
      const degrees = getDegrees(degreeFunction)
        .map(d=>d.toChromaticDegree()) as CDegreeArray;

      if (obj.hasChromaticDegrees(...degrees))
        ret.push(degreeFunction);
    }
  }

  return ret;
}
