import { IntervalArray, Intervals } from "intervals/chromatic";
import Scale from "../Scale";
import fromRootIntervals from "./rootIntervals";

export default function fromIntraIntervals(...intraIntervals: IntervalArray): Scale {
  const rootIntervals: IntervalArray = [Intervals.PERFECT_UNISON];
  let last = rootIntervals[0];

  for (const intraInterval of intraIntervals) {
    const newRootInterval = Intervals.add(last, intraInterval);

    if (newRootInterval === Intervals.PERFECT_OCTAVE)
      break;

    last = newRootInterval;

    rootIntervals.push(newRootInterval);
  }

  return fromRootIntervals(...rootIntervals);
}
