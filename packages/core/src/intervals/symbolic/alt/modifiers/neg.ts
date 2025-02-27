import { fromIntervalQuality } from "../building/intervalQuality";
import Interval from "../Interval";
import { Intervals as DIntervals } from "intervals/diatonic";

export function neg(obj: Interval): Interval {
  return fromIntervalQuality(DIntervals.neg(obj.diatonicInterval), obj.quality) as Interval;
}
