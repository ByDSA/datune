import { Degree } from "@datune/core/degrees/alt";
import { alts } from "lang/generation/utils";
import DDstringify from "strings/degrees/diatonic";

export default function stringify(obj: Degree): string {
  const altsStr = alts(obj.alts);

  return altsStr + DDstringify(obj.diatonicDegree);
}
