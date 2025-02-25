import { Array as IntervalArray, Interval, PERFECT_OCTAVE, sub } from "intervals/alt";
import Scale from "../Scale";
import fromIntraIntervals from "./intraIntervals";

export default function fromRootIntervals(...rootIntervals: IntervalArray): Scale {
  const intraIntervals: Interval[] = [];

  for (let i = 1; i < rootIntervals.length; i++) {
    const intraIntervalsI = sub(rootIntervals[i], rootIntervals[i - 1]) as Interval;

    intraIntervals.push(intraIntervalsI);
  }

  const lastIntraInterval = getLastIntraInterval(rootIntervals);

  intraIntervals.push(lastIntraInterval);

  return fromIntraIntervals(...intraIntervals as IntervalArray);
}

function getLastIntraInterval(rootIntervals: IntervalArray): Interval {
  return sub(PERFECT_OCTAVE, rootIntervals[rootIntervals.length - 1]) as Interval;
}
