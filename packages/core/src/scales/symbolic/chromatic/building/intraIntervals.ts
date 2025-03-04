import type { IntervalArray } from "intervals/chromatic";
import type { Scale } from "../Scale";
import { Intervals as I } from "intervals/chromatic";
import { fromRootIntervals } from "./rootIntervals";

export function fromIntraIntervals(...intraIntervals: IntervalArray): Scale {
  const rootIntervals: IntervalArray = [I.P1];
  let [last] = rootIntervals;

  for (const intraInterval of intraIntervals) {
    const newRootInterval = I.add(last, intraInterval);

    if (newRootInterval === I.P8)
      break;

    last = newRootInterval;

    rootIntervals.push(newRootInterval);
  }

  return fromRootIntervals(...rootIntervals);
}
