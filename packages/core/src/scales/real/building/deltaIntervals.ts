import type { IntervalArray } from "intervals/real";
import type { Scale } from "../Scale";
import { shift as Ishift } from "intervals/real/modifiers/shift";
import * as I from "intervals/real/constants/index";
import { fromRootIntervals } from "./rootIntervals";

export function fromDeltaIntervals(...deltaIntervals: IntervalArray): Scale {
  const rootIntervals: IntervalArray = [I.UNISON];
  let [last] = rootIntervals;

  for (const deltaInterval of deltaIntervals) {
    const newRootInterval = Ishift(last, deltaInterval);

    if (newRootInterval === I.OCTAVE)
      break;

    last = newRootInterval;

    rootIntervals.push(newRootInterval);
  }

  return fromRootIntervals(...rootIntervals);
}
