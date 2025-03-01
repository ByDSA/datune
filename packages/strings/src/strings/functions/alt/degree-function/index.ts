import { DegreeFunction } from "@datune/core/functions/alt/degree-function/DegreeFunction";
import { stringifyDegree } from "strings/degrees/alt";
import { stringifyShortName } from "strings/voicings/alt/shortName";

export function stringifyDegreeFunction(obj: DegreeFunction): string {
  return stringifyDegree(obj.degree) + stringifyShortName(obj.voicing);
}
