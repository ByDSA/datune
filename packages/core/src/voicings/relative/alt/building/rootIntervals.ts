import type { Voicing } from "../Voicing";
import { Interval, IntervalArray } from "intervals/alt";
import { P1 } from "intervals/symbolic/alt/constants";
import { sub } from "intervals/symbolic/alt/modifiers/sub";
import { cache } from "../caching/cache";

export function fromRootIntervals(
  ...rootIntervals: IntervalArray
): Voicing {
  let fixedRootIntervals = [...rootIntervals].sort(
    (a, b)=>a.diatonicInterval.magnitude - b.diatonicInterval.magnitude,
  ) as IntervalArray;

  if (fixedRootIntervals[0] !== P1)
    fixedRootIntervals = getStartFromZero(fixedRootIntervals);

  return cache.getOrCreate(fixedRootIntervals);
}

function getStartFromZero(array: IntervalArray): IntervalArray {
  return array.map(
    (ic: Interval, _i: number, a: Interval[]) => sub(ic, a[0]),
  ) as IntervalArray;
}
