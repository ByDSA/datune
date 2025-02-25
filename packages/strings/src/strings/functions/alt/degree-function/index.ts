import { DegreeFunction } from "@datune/core/functions/alt";
import degreeStringify from "strings/degrees/alt";
import voicingShortName from "strings/voicings/alt/shortName";

export default function stringify(obj: DegreeFunction): string {
  return degreeStringify(obj.degree) + voicingShortName(obj.voicing);
}
