import type { Interval } from "../Interval";
import { Intervals as DIntervals } from "intervals/diatonic";
import { fromIntervalQuality } from "../building/intervalQuality";
import { toInt } from "../quality/conversions/int";
import { calcFixedQualityDifferentDirection } from "./calcQuality/differentDirection";
import { calcFixedQualitySameDirection } from "./calcQuality/sameDirection";

export function sub(
  self: Interval,
  other: Interval,
): Interval {
  let diatonicInterval = DIntervals.sub(self.diatonicInterval, other.diatonicInterval);

  if (diatonicInterval.magnitude === 0
    && (toInt(other.quality, false) || 0) > (toInt(self.quality, false) || 0))
    diatonicInterval = DIntervals.neg(diatonicInterval);

  const quality = self.diatonicInterval.direction !== other.diatonicInterval.direction
    ? calcFixedQualitySameDirection(self, other, diatonicInterval)
    : calcFixedQualityDifferentDirection(self, other, diatonicInterval);

  return fromIntervalQuality(diatonicInterval, quality) as Interval;
}
