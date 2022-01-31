import { add, Array as IntervalArray, PERFECT_UNISON } from "intervals/alt";
import { Voicing } from "voicings/relative/alt";
import fromRootIntervals from "./rootIntervals";

export default function fromIntraIntervals(
  ...intraIntervals: IntervalArray
): Voicing | null {
  const baseIntervals: IntervalArray = [PERFECT_UNISON];

  for (let i = 0; i < intraIntervals.length - 1; i++) {
    const baseIntervalI = add(baseIntervals[baseIntervals.length - 1], intraIntervals[i]);

    if (baseIntervalI === null)
      return null;

    baseIntervals.push(baseIntervalI);
  }

  const ret = fromRootIntervals(...baseIntervals);

  return ret;
}
