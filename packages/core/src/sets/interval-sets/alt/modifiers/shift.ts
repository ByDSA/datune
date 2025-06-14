import type { IntervalArray, Interval } from "intervals/symbolic/alt";
import type { IntervalSet } from "..";
import { fromRootIntervals } from "../building";

export function shift(obj: IntervalSet, interval: Interval): IntervalSet {
  const rootIntervals = obj.rootIntervals.map(i => i.withShifted(interval)) as IntervalArray;

  return fromRootIntervals(...rootIntervals);
}

export function shiftDown(obj: IntervalSet, interval: Interval): IntervalSet {
  const rootIntervals = obj.rootIntervals.map(i => i.withShiftedDown(interval)) as IntervalArray;

  return fromRootIntervals(...rootIntervals);
}
