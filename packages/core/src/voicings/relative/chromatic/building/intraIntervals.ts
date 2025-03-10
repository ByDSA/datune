import type { Voicing } from "../Voicing";
import { IntervalArray } from "intervals/symbolic/chromatic";
import { fromRootIntervals } from "./rootIntervals";

export function fromIntraIntervals(
  ...intraIntervals: IntervalArray
): Voicing {
  const baseIntervals: IntervalArray = [0];

  for (let i = 0; i <= intraIntervals.length - 1; i++) {
    const baseIntervalI = baseIntervals[baseIntervals.length - 1] + intraIntervals[i];

    baseIntervals.push(baseIntervalI);
  }

  const ret = fromRootIntervals(...baseIntervals);

  return ret;
}
