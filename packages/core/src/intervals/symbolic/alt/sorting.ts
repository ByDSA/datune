import type { IntervalArray } from "./Array";
import type { Interval } from "./Interval";

export function toSorted(intervals: Iterable<Interval>): IntervalArray {
  return [...intervals].sort(
    (a, b)=>{
      const diff = a.diatonicInterval.magnitude - b.diatonicInterval.magnitude;

      if (diff === 0)
        return a.alts - b.alts;

      return diff;
    },
  ) as IntervalArray;
}
