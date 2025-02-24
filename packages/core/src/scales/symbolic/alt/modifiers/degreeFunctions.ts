import { Array as DegreeArray } from "degrees/alt";
import { calcDegrees, DegreeFunction } from "functions/alt";
import { from } from "functions/alt/degree-function/building";
import { COMMON } from "voicings/relative/alt";
import Scale from "../Scale";

export default function getDegreeFunctions(obj: Scale): DegreeFunction[] {
  const ret: DegreeFunction[] = [];
  const voicings = COMMON;

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
