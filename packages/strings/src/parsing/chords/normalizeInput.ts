import { removeMarks, removeSpaces } from "parsing/utils";

export default function normalize(input: string) {
  let ret = removeSpaces(input);

  ret = removeMarks(ret);
  ret = ret.toLowerCase();

  return ret;
}
