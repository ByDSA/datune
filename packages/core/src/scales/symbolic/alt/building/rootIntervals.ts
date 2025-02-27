import { Scale } from "../Scale";
import { fromIntraIntervals } from "./intraIntervals";
import { IntervalArray, Interval, Intervals } from "intervals/alt";

export function fromRootIntervals(...rootIntervals: IntervalArray): Scale {
  const intraIntervals: Interval[] = [];

  for (let i = 1; i < rootIntervals.length; i++) {
    const intraIntervalsI = Intervals.sub(rootIntervals[i], rootIntervals[i - 1]) as Interval;

    intraIntervals.push(intraIntervalsI);
  }

  const lastIntraInterval = getLastIntraInterval(rootIntervals);

  intraIntervals.push(lastIntraInterval);

  return fromIntraIntervals(...intraIntervals as IntervalArray);
}

function getLastIntraInterval(rootIntervals: IntervalArray): Interval {
  return Intervals.sub(
    Intervals.PERFECT_OCTAVE,
    rootIntervals[rootIntervals.length - 1],
  ) as Interval;
}
