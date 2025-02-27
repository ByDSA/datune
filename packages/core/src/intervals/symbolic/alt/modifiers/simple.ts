import { fromIntervalQuality } from "../building/intervalQuality";
import Interval from "../Interval";
import { Intervals as DIntervals } from "intervals/diatonic";

export function simple(obj: Interval): Interval {
  return fromIntervalQuality(DIntervals.simple(obj.diatonicInterval), obj.quality) as Interval;
}
