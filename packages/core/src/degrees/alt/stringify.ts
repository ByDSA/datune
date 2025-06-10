import { stringifyDegree } from "degrees/diatonic/stringify";
import { Degree } from "./Degree";

export function stringify(obj: Degree): string {
  if (obj.alts >= 0)
    return "♯".repeat(obj.alts) + stringifyDegree(obj.diatonicInterval);

  return `${"♭".repeat(-obj.alts)}${stringifyDegree(obj.diatonicInterval)}`;
}
