import type { Voicing } from "../Voicing";
import { IntervalArray, Interval } from "intervals/chromatic";
import { cache } from "../caching/cache";

export function fromRootIntervals(
  ...rootIntervals: IntervalArray
): Voicing {
  let fixedRootIntervals = [...rootIntervals].sort((a, b)=>a - b) as IntervalArray;

  if (fixedRootIntervals[0] > 0)
    fixedRootIntervals = getStartFromZero(fixedRootIntervals);

  return cache.getOrCreate(fixedRootIntervals);
}

function getStartFromZero(array: IntervalArray): IntervalArray {
  return array.map(
    (ic: Interval, _i: number, a: Interval[]) => ic - a[0],
  ) as IntervalArray;
}
