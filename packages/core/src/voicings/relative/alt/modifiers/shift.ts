import type { IntervalArray, Interval } from "intervals/symbolic/alt";
import type { Voicing } from "..";
import { fromRootIntervals } from "../building";

export function shift(obj: Voicing, interval: Interval): Voicing {
  const rootIntervals = obj.rootIntervals.map(i => i.withShifted(interval)) as IntervalArray;

  return fromRootIntervals(...rootIntervals);
}

export function shiftDown(obj: Voicing, interval: Interval): Voicing {
  const rootIntervals = obj.rootIntervals.map(i => i.withShiftedDown(interval)) as IntervalArray;

  return fromRootIntervals(...rootIntervals);
}
