import { fromIntervalQuality } from "../building/intervalQuality";
import type { Interval } from "../Interval";
import { Intervals as DIntervals } from "intervals/diatonic";

export function simple(obj: Interval): Interval {
  return fromIntervalQuality(DIntervals.simplify(obj.diatonicInterval), obj.quality) as Interval;
}
