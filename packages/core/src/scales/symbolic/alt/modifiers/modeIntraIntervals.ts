import { Arrays } from "@datune/utils";
import { Scale } from "../Scale";
import { calcIntraIntervals } from "./intraIntervals";
import { IntervalArray } from "intervals/alt";

export function getModeIntraIntervals(
  obj: Scale,
  n: number,
): IntervalArray {
  const intraIntervals = calcIntraIntervals(obj);
  const intervals: IntervalArray = [...intraIntervals];

  if (n > 0)
    Arrays.rotateLeft(intervals, n - 1);
  else if (n < 0)
    Arrays.rotateRight(intervals, -n - 1);

  return intervals;
}
