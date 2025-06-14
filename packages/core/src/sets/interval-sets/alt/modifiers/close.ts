import type { IntervalArray } from "intervals/alt";
import type { IntervalSet } from "sets/interval-sets/alt";
import { Intervals } from "intervals/alt";
import { fromRootIntervals } from "../building";

export function close(intervalSet: IntervalSet): IntervalSet {
  const rootIntervals = intervalSet.rootIntervals
    .map(Intervals.simplify)
    .sort((a, b)=>+a - +b) as IntervalArray;

  return fromRootIntervals(...rootIntervals);
}
