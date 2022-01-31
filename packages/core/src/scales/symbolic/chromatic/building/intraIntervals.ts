import { add, Array as IntervalArray, PERFECT_OCTAVE, PERFECT_UNISON } from "intervals/chromatic";
import Scale from "../Scale";
import fromRootIntervals from "./rootIntervals";

export default function fromIntraIntervals(...intraIntervals: IntervalArray): Scale {
  const rootIntervals: IntervalArray = [PERFECT_UNISON];
  let last = rootIntervals[0];

  for (const intraInterval of intraIntervals) {
    const newRootInterval = add(last, intraInterval);

    if (newRootInterval === PERFECT_OCTAVE)
      break;

    last = newRootInterval;

    rootIntervals.push(newRootInterval);
  }

  return fromRootIntervals(...rootIntervals);
}
