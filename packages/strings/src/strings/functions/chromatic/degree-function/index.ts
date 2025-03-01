import { DegreeFunction } from "@datune/core/functions/chromatic/degree-function/DegreeFunction";
import { stringifyDegree } from "strings/degrees/chromatic";
import { stringifyShortName } from "strings/voicings/chromatic/shortName";

export function stringifyDegreeFunction(obj: DegreeFunction): string {
  return stringifyDegree(obj.degree) + stringifyShortName(obj.voicing);
}
