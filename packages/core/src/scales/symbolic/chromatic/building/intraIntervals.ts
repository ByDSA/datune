import type { IntervalArray } from "intervals/chromatic";
import type { Scale } from "../Scale";
import { add as Iadd } from "intervals/symbolic/chromatic/modifiers";
import * as I from "intervals/symbolic/chromatic/constants";
import { fromRootIntervals } from "./rootIntervals";

export function fromIntraIntervals(...intraIntervals: IntervalArray): Scale {
  const rootIntervals: IntervalArray = [I.P1];
  let [last] = rootIntervals;

  for (const intraInterval of intraIntervals) {
    const newRootInterval = Iadd(last, intraInterval);

    if (newRootInterval === I.P8)
      break;

    last = newRootInterval;

    rootIntervals.push(newRootInterval);
  }

  return fromRootIntervals(...rootIntervals);
}
