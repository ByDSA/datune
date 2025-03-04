import type { Interval } from "../Interval";
import { Intervals as DIntervals } from "intervals/diatonic";
import { fromIntervalQuality } from "../building/intervalQuality";

export function simplify(obj: Interval): Interval {
  return fromIntervalQuality(DIntervals.simplify(obj.diatonicInterval), obj.quality) as Interval;
}
