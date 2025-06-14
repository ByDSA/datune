import type { IntervalSet } from "../IntervalSet";
import type { Interval as DInterval } from "intervals/symbolic/diatonic";
import type { IntervalSet as CIS } from "sets/interval-sets/chromatic";
import type { IntervalSet as DIS } from "sets/interval-sets/diatonic";
import { type IntervalArray, Intervals as I } from "intervals/symbolic/alt";
import { fromRootIntervals } from "./rootIntervals";

export function fromIntervalSets(
  cIntervalSet: CIS,
  dIntervalSet: DIS,
): IntervalSet | null {
  const rootIntervals: IntervalArray = [] as any;

  for (let i = 0; i < cIntervalSet.size; i++) {
    const semisFromRoot = cIntervalSet.rootIntervals[i];
    const diatonicInterval: DInterval = dIntervalSet.rootIntervals[i];
    const rootInterval = I.fromIntervals( {
      chromaticInterval: semisFromRoot,
      diatonicInterval,
    } );

    if (!rootInterval)
      return null;

    rootIntervals.push(rootInterval);
  }

  return fromRootIntervals(...rootIntervals);
}
