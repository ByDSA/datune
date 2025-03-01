import { removeMarks, removeSpaces } from "parsing/utils";

export function normalizeInput(input: string) {
  let ret = removeSpaces(input);

  ret = removeMarks(ret);
  ret = ret.toLowerCase();

  return ret;
}
