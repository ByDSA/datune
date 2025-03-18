import type { IntervalArray } from "intervals/alt";
import type { Scale } from "../Scale";
import { Arrays } from "datils";
import { calcIntraIntervals } from "./intraIntervals";

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
