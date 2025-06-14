import type { Scale } from "../Scale";
import type { DegreeArray as CDegreeArray } from "degrees/chromatic";
import type { DegreeFunc } from "functions/alt/degree-function/DegreeFunc";
import { IntervalSets as IS } from "sets/interval-sets/alt";
import { getDegrees } from "functions/alt/degree-function/conversions";
import { fromDegreeIntervalSet } from "functions/alt/degree-function/building";

export function getDegreeFuncs(obj: Scale): DegreeFunc[] {
  const ret: DegreeFunc[] = [];
  const intervalSets = IS.COMMON;

  for (const degree of obj.degrees) {
    for (const intervalSet of intervalSets) {
      const degreeFunction = fromDegreeIntervalSet(degree, intervalSet);
      const degrees = getDegrees(degreeFunction)
        .map(d=>d.toChromaticDegree()) as CDegreeArray;

      if (obj.hasChromaticDegrees(...degrees))
        ret.push(degreeFunction);
    }
  }

  return ret;
}
