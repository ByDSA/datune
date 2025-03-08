import type { Scale } from "../Scale";
import type { DegreeArray } from "degrees/alt";
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
      const degrees = getDegrees(degreeFunction) as DegreeArray;

      if (obj.hasEnharmonicDegrees(...degrees))
        ret.push(degreeFunction);
    }
  }

  return ret;
}
