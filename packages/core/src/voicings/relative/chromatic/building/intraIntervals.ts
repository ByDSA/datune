import { Array as IntervalArray } from "intervals/symbolic/chromatic";
import Voicing from "../Voicing";
import fromRootIntervals from "./rootIntervals";

export default function fromIntraIntervals(
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
