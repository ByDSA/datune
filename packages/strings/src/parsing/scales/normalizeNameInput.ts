import { normalizeAlts, removeMarks, removeSpaces } from "../utils";

export default function normalize(strValue: string): string {
  let fixed = removeSpaces(strValue)
    .toLowerCase();

  fixed = removeMarks(fixed);

  return normalizeAlts(fixed);
}
