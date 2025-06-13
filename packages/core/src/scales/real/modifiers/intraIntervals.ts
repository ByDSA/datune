import type { IntervalArray, Interval } from "intervals/real";
import type { Scale } from "../Scale";
import { Intervals as I } from "intervals/real";

export function calcIntraIntervals(obj: Scale): IntervalArray {
  const ret: IntervalArray = [] as any;
  const rootIntervals = [...obj.degrees, I.OCTAVE];

  for (let i = 1; i < rootIntervals.length; i++) {
    const interval: Interval = I.shiftDown(rootIntervals[i], rootIntervals[i - 1]);

    ret.push(interval);
  }

  return ret;
}
