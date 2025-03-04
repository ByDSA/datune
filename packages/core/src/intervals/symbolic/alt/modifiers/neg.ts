import type { Interval } from "../Interval";
import { Intervals as DIntervals } from "intervals/diatonic";
import { fromIntervalQuality } from "../building/intervalQuality";

export function neg(obj: Interval): Interval {
  return fromIntervalQuality(DIntervals.neg(obj.diatonicInterval), obj.quality) as Interval;
}
