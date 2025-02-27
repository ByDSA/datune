import { Scale } from "../Scale";
import { DegreeArray } from "degrees/alt";
import { Functions, DegreeFunction } from "functions/alt";
import { from } from "functions/alt/degree-function/building";
import { Voicings } from "voicings/relative/alt";

export default function getDegreeFunctions(obj: Scale): DegreeFunction[] {
  const ret: DegreeFunction[] = [];
  const voicings = Voicings.COMMON;

  for (const degree of obj.degrees) {
    for (const voicing of voicings) {
      const degreeFunction = from( {
        degree,
        voicing,
      } );
      const degrees = Functions.calcDegrees(degreeFunction) as DegreeArray;

      if (obj.hasEnharmonicDegrees(...degrees))
        ret.push(degreeFunction);
    }
  }

  return ret;
}
