import { Scale } from "../Scale";
import { IntervalArray, Interval, Intervals } from "intervals/chromatic";

export function calcIntraIntervals(obj: Scale): IntervalArray {
  const ret: IntervalArray = [] as any;
  const rootIntervals = [...obj.rootIntervals, Intervals.PERFECT_OCTAVE];

  for (let i = 1; i < rootIntervals.length; i++) {
    const interval: Interval = Intervals.sub(rootIntervals[i], rootIntervals[i - 1]);

    ret.push(interval);
  }

  return ret;
}
