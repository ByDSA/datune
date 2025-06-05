import type { Interval } from "../Interval";
import { Intervals as DIntervals } from "intervals/diatonic";
import { fromIntervalQuality } from "../building/intervalQuality";
import { toInt } from "../quality/conversions/int";
import { calcFixedQualityDifferentDirection } from "./calcQuality/differentDirection";
import { calcFixedQualitySameDirection } from "./calcQuality/sameDirection";

export function shiftDown(
  obj: Interval,
  other: Interval,
): Interval {
  let diatonicInterval = DIntervals.shiftDown(obj.diatonicInterval, other.diatonicInterval);

  if (diatonicInterval.magnitude === 0
    && (toInt(other.quality, false) || 0) > (toInt(obj.quality, false) || 0))
    diatonicInterval = DIntervals.neg(diatonicInterval);

  const quality = obj.diatonicInterval.direction !== other.diatonicInterval.direction
    ? calcFixedQualitySameDirection(obj, other, diatonicInterval)
    : calcFixedQualityDifferentDirection(obj, other, diatonicInterval);

  return fromIntervalQuality(diatonicInterval, quality) as Interval;
}
