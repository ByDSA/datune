import { DegreeFunc } from "@datune/core/functions/chromatic/degree-function/DegreeFunc";
import { stringifyShortName } from "strings/intervalSets/chromatic/shortName";
import { stringifyDegree } from "strings/degrees/chromatic";

export function stringifyDegreeFunc(obj: DegreeFunc): string {
  return stringifyDegree(obj.degree) + stringifyShortName(obj.intervalSet);
}
