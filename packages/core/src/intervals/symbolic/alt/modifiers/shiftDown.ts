import type { Interval } from "../Interval";
import { Intervals as DIntervals } from "intervals/diatonic";
import { fromIntervalQuality } from "../building/intervalQuality";
import { calcFixedQuality } from "./calcFixedQuality";
import { neg } from "./neg";

export function shiftDown(
  obj: Interval,
  other: Interval,
): Interval {
  let diatonicInterval = DIntervals.shiftDown(obj.diatonicInterval, other.diatonicInterval);
  const quality = calcFixedQuality(
    obj,
    neg(other),
    diatonicInterval,
  );

  return fromIntervalQuality(diatonicInterval, quality)!;
}
