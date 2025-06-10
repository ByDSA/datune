import type { Interval } from "../Interval";
import { Intervals as DI } from "intervals/diatonic";
import { fromIntervalQuality } from "../building/intervalQuality";

export function simplify(obj: Interval): Interval {
  return fromIntervalQuality(
    DI.simplify(obj.diatonicInterval),
    obj.quality,
  ) as Interval;
}
