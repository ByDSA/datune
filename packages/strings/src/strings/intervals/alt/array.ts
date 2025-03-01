import { IntervalArray } from "@datune/core/intervals/alt";
import { stringifyInterval } from ".";

export function stringifyArray(array: IntervalArray): string {
  return array.map(stringifyInterval).join("-");
}
