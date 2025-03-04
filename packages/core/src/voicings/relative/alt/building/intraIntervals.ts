import type { Voicing } from "../Voicing";
import { IntervalArray, Intervals } from "intervals/alt";
import { fromRootIntervals } from "./rootIntervals";

export function fromIntraIntervals(
  ...intraIntervals: IntervalArray
): Voicing | null {
  const baseIntervals: IntervalArray = [Intervals.P1];

  for (let i = 0; i < intraIntervals.length - 1; i++) {
    const baseIntervalI = Intervals.add(baseIntervals[baseIntervals.length - 1], intraIntervals[i]);

    if (baseIntervalI === null)
      return null;

    baseIntervals.push(baseIntervalI);
  }

  const ret = fromRootIntervals(...baseIntervals);

  return ret;
}
