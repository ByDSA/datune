import { DegreeFunction } from "@datune/core/functions/chromatic";
import degreeStringify from "strings/degrees/chromatic";
import voicingShortName from "strings/voicings/chromatic/shortName";

export default function stringify(obj: DegreeFunction): string {
  return degreeStringify(obj.degree) + voicingShortName(obj.voicing);
}
