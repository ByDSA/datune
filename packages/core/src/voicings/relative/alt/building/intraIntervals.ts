import Voicing from "../Voicing";
import { fromRootIntervals } from "./rootIntervals";
import { IntervalArray, Intervals } from "intervals/alt";

export function fromIntraIntervals(
  ...intraIntervals: IntervalArray
): Voicing | null {
  const baseIntervals: IntervalArray = [Intervals.PERFECT_UNISON];

  for (let i = 0; i < intraIntervals.length - 1; i++) {
    const baseIntervalI = Intervals.add(baseIntervals[baseIntervals.length - 1], intraIntervals[i]);

    if (baseIntervalI === null)
      return null;

    baseIntervals.push(baseIntervalI);
  }

  const ret = fromRootIntervals(...baseIntervals);

  return ret;
}
