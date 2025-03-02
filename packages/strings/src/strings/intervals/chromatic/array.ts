import { IntervalArray } from "@datune/core/intervals/chromatic";
import { stringifyInterval } from ".";

export function stringifyIntervalArray(array: IntervalArray): string {
  return array.map(stringifyInterval).join("-");
}
