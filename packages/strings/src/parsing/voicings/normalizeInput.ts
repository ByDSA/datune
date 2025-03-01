import { normalizeAlts, removeMarks, removeSpaces } from "parsing/utils";

export function normalizeInput(input: string): string {
  let ret = normalizeAlts(input);

  ret = removeMarks(ret);
  ret = removeSpaces(ret);
  ret = ret.toLowerCase();
  ret = ret.trim();

  return ret;
}
