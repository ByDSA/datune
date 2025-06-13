import type { IntervalArray } from "intervals/real";
import type { Scale } from "../Scale";
import { shift as Ishift } from "intervals/real/modifiers/shift";
import * as I from "intervals/real/constants/index";
import { fromRootIntervals } from "./rootIntervals";

export function fromIntraIntervals(...intraIntervals: IntervalArray): Scale {
  const rootIntervals: IntervalArray = [I.UNISON];
  let [last] = rootIntervals;

  for (const intraInterval of intraIntervals) {
    const newRootInterval = Ishift(last, intraInterval);

    if (newRootInterval === I.OCTAVE)
      break;

    last = newRootInterval;

    rootIntervals.push(newRootInterval);
  }

  return fromRootIntervals(...rootIntervals);
}
