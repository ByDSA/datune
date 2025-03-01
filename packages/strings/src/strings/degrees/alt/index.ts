import { Degree } from "@datune/core/degrees/alt";
import { alts } from "lang/generation/utils";
import { stringifyDegree as stringifyDDegree } from "strings/degrees/diatonic";

export function stringifyDegree(obj: Degree): string {
  const altsStr = alts(obj.alts);

  return altsStr + stringifyDDegree(obj.diatonicDegree);
}
