import { DegreeFunc } from "@datune/core/functions/chromatic/degree-function/DegreeFunc";
import { stringifyDegree } from "strings/degrees/chromatic";
import { stringifyShortName } from "strings/voicings/chromatic/shortName";

export function stringifyDegreeFunc(obj: DegreeFunc): string {
  return stringifyDegree(obj.degree) + stringifyShortName(obj.voicing);
}
