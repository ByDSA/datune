import type { IntervalArray } from "chromatic";
import { cyclicOctave, shift as Iadd } from "intervals/symbolic/chromatic/modifiers";
import { Degrees as D } from "degrees/chromatic";
import { Intervals as I } from "intervals/chromatic";
import { P1 } from "./constants";

export function deltaToRootIntervals(...deltaIntervals: IntervalArray): IntervalArray {
  const rootIntervals: IntervalArray = [P1];
  let [last] = rootIntervals;

  for (const deltaInterval of deltaIntervals) {
    const newRootInterval = cyclicOctave(Iadd(last, deltaInterval));

    if (newRootInterval === D.I)
      break;

    last = newRootInterval;

    rootIntervals.push(newRootInterval);
  }

  return rootIntervals;
}

export function rootToDeltaIntervals(...rootIntervals: IntervalArray): IntervalArray {
  const ret = new Array(rootIntervals.length - 1) as IntervalArray;

  for (let i = 1; i < rootIntervals.length; i++) {
    const interval = I.shiftDown(rootIntervals[i], rootIntervals[i - 1]);

    ret[i - 1] = interval;
  }

  return ret;
}
