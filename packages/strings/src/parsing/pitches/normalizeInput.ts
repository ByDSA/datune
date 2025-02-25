import { normalizeAlts, removeSpaces } from "../utils";

export default function normalizeInput(input: string) {
  let ret = input.toLowerCase();

  ret = removeSpaces(ret);

  return normalizeAlts(ret);
}
