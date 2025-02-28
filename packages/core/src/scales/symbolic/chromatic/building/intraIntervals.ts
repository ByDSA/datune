import { Scale } from "../Scale";
import { fromRootIntervals } from "./rootIntervals";
import { IntervalArray, Intervals } from "intervals/chromatic";

export function fromIntraIntervals(...intraIntervals: IntervalArray): Scale {
  const rootIntervals: IntervalArray = [Intervals.PERFECT_UNISON];
  let [last] = rootIntervals;

  for (const intraInterval of intraIntervals) {
    const newRootInterval = Intervals.add(last, intraInterval);

    if (newRootInterval === Intervals.PERFECT_OCTAVE)
      break;

    last = newRootInterval;

    rootIntervals.push(newRootInterval);
  }

  return fromRootIntervals(...rootIntervals);
}
