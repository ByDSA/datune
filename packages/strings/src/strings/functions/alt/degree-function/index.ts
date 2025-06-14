import { DegreeFunc } from "@datune/core/functions/alt/degree-function/DegreeFunc";
import { stringifyShortName } from "strings/intervalSets/alt/shortName";
import { stringifyDegree } from "strings/degrees/alt";

export function stringifyDegreeFunc(obj: DegreeFunc): string {
  return stringifyDegree(obj.degree) + stringifyShortName(obj.intervalSet);
}
