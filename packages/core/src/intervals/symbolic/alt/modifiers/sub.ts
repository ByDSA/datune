import { fromIntervalQuality } from "../building/intervalQuality";
import type { Interval } from "../Interval";
import { calcFixedQualityDifferentDirection } from "./calcQuality/differentDirection";
import { calcFixedQualitySameDirection } from "./calcQuality/sameDirection";
import { Intervals as DIntervals } from "intervals/diatonic";

export function sub(
  self: Interval,
  other: Interval,
): Interval | null {
  const diatonicInterval = DIntervals.sub(self.diatonicInterval, other.diatonicInterval);
  const quality = self.diatonicInterval.direction !== other.diatonicInterval.direction
    ? calcFixedQualitySameDirection(self, other, diatonicInterval)
    : calcFixedQualityDifferentDirection(self, other, diatonicInterval);

  if (!quality)
    return null;

  return fromIntervalQuality(diatonicInterval, quality);
}
