import { fromIntervalQuality } from "../building/intervalQuality";
import Interval from "../Interval";
import { Intervals as DIntervals } from "intervals/diatonic";

export function abs(obj: Interval): Interval {
  return fromIntervalQuality(
    DIntervals.abs(obj.diatonicInterval),
    obj.quality,
  ) as Interval;
}
