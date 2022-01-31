import { Array as IntervalArray, Interval, PERFECT_OCTAVE, sub } from "intervals/chromatic";
import Scale from "../Scale";

export default function intraIntervals(obj: Scale): IntervalArray {
  const ret: IntervalArray = [] as any;
  const rootIntervals = [...obj.rootIntervals, PERFECT_OCTAVE];

  for (let i = 1; i < rootIntervals.length; i++) {
    const interval: Interval = sub(rootIntervals[i], rootIntervals[i - 1]);

    ret.push(interval);
  }

  return ret;
}
