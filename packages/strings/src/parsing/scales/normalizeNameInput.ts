import { normalizeAlts, removeMarks, removeSpaces } from "../utils";

export function normalizeInputName(strValue: string): string {
  let fixed = removeSpaces(strValue)
    .toLowerCase();

  fixed = removeMarks(fixed);

  return normalizeAlts(fixed);
}
