import { IntervalArray } from "@datune/core/intervals/chromatic";
import { stringifyInterval } from ".";

export function stringifyIntervals(array: IntervalArray): string {
  return array.map(stringifyInterval).join("-");
}
