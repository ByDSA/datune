import { Array as IntervalArray, Interval } from "intervals/chromatic";
import Voicing from "../Voicing";
import cache from "./cache";

export default function fromRootIntervals(
  ...rootIntervals: IntervalArray
): Voicing {
  let fixedRootIntervals = rootIntervals;

  if (fixedRootIntervals[0] > 0)
    fixedRootIntervals = getStartFromZero(fixedRootIntervals);

  return cache.getOrCreate(fixedRootIntervals);
}

function getStartFromZero(array: IntervalArray): IntervalArray {
  return array.map(
    (ic: Interval, i: number, a: Interval[]) => ic - a[0],
  ) as IntervalArray;
}
