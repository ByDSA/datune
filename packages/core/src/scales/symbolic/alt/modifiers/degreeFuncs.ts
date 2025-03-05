import type { Scale } from "../Scale";
import type { DegreeArray } from "degrees/alt";
import type { DegreeFunc } from "functions/alt/degree-function/DegreeFunc";
import { calcDegrees } from "functions/alt/degree-function/calcs";
import { from } from "functions/alt/degree-function/building";
import { Voicings as V } from "voicings/relative/alt";

export function getDegreeFuncs(obj: Scale): DegreeFunc[] {
  const ret: DegreeFunc[] = [];
  const voicings = V.COMMON;

  for (const degree of obj.degrees) {
    for (const voicing of voicings) {
      const degreeFunction = from( {
        degree,
        voicing,
      } );
      const degrees = calcDegrees(degreeFunction) as DegreeArray;

      if (obj.hasEnharmonicDegrees(...degrees))
        ret.push(degreeFunction);
    }
  }

  return ret;
}
