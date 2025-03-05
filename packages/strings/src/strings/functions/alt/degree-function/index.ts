import { DegreeFunc } from "@datune/core/functions/alt/degree-function/DegreeFunc";
import { stringifyDegree } from "strings/degrees/alt";
import { stringifyShortName } from "strings/voicings/alt/shortName";

export function stringifyDegreeFunc(obj: DegreeFunc): string {
  return stringifyDegree(obj.degree) + stringifyShortName(obj.voicing);
}
