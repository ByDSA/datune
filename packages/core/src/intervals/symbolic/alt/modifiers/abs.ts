import type { Interval } from "../Interval";
import { Intervals as DIntervals } from "intervals/diatonic";
import { fromIntervalQuality } from "../building/intervalQuality";

export function abs(obj: Interval): Interval {
  return fromIntervalQuality(
    DIntervals.abs(obj.diatonicInterval),
    obj.quality,
  ) as Interval;
}
