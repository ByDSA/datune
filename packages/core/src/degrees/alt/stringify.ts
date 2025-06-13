import { stringifyDegree as stringifyDDegree } from "degrees/diatonic/stringify";
import { Degree } from "./Degree";

export function stringifyDegree(obj: Degree): string {
  if (obj.alts >= 0)
    return "♯".repeat(obj.alts) + stringifyDDegree(obj.diatonicInterval);

  return `${"♭".repeat(-obj.alts)}${stringifyDDegree(obj.diatonicInterval)}`;
}
