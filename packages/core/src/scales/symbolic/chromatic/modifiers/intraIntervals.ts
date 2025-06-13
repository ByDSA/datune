import type { Scale } from "../Scale";
import type { Degree, DegreeArray } from "degrees/chromatic";
import { Intervals as I } from "intervals/chromatic";
import { cyclicOctave } from "intervals/symbolic/chromatic/modifiers";

export function calcIntraIntervals(obj: Scale): DegreeArray {
  const ret: DegreeArray = [] as any;
  const rootIntervals = [...obj.degrees, I.P8];

  for (let i = 1; i < rootIntervals.length; i++) {
    const interval: Degree = cyclicOctave(I.shiftDown(rootIntervals[i], rootIntervals[i - 1]));

    ret.push(interval);
  }

  return ret;
}
