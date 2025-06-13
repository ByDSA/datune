import type { Scale } from "../Scale";
import { Degrees as D, type DegreeArray } from "degrees/chromatic";
import { cyclicOctave, shift as Iadd } from "intervals/symbolic/chromatic/modifiers";
import { fromDegrees } from "./degrees";

export function fromIntraIntervals(...intraIntervals: DegreeArray): Scale {
  const rootIntervals: DegreeArray = [D.I];
  let [last] = rootIntervals;

  for (const intraInterval of intraIntervals) {
    const newRootInterval = cyclicOctave(Iadd(last, intraInterval));

    if (newRootInterval === D.I)
      break;

    last = newRootInterval;

    rootIntervals.push(newRootInterval);
  }

  return fromDegrees(...rootIntervals);
}
