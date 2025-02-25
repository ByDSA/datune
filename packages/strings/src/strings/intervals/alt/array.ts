import { Array } from "@datune/core/intervals/alt";
import stringify from ".";

export default function stringifyArray(array: Array): string {
  return array.map(stringify).join("-");
}
