import { Array } from "@datune/core/intervals/chromatic";
import stringify from ".";

export default function stringifyArray(array: Array): string {
  return array.map(stringify).join("-");
}
