import type { IntervalArray, Interval } from "intervals/chromatic";
import type { Scale } from "../Scale";
import { Intervals as I } from "intervals/chromatic";

export function calcIntraIntervals(obj: Scale): IntervalArray {
  const ret: IntervalArray = [] as any;
  const rootIntervals = [...obj.rootIntervals, I.P8];

  for (let i = 1; i < rootIntervals.length; i++) {
    const interval: Interval = I.sub(rootIntervals[i], rootIntervals[i - 1]);

    ret.push(interval);
  }

  return ret;
}
