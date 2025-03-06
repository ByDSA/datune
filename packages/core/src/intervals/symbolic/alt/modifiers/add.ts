import type { Interval } from "../Interval";
import { Intervals as DI } from "intervals/diatonic";
import { fromIntervalQuality } from "../building/intervalQuality";
import { calcFixedQualityDifferentDirection } from "./calcQuality/differentDirection";
import { calcFixedQualitySameDirection } from "./calcQuality/sameDirection";

export function add(
  self: Interval,
  other: Interval,
): Interval | null {
  const diatonicInterval = DI.add(self.diatonicInterval, other.diatonicInterval);
  const quality = self.diatonicInterval.direction === other.diatonicInterval.direction
    ? calcFixedQualitySameDirection(self, other, diatonicInterval)
    : calcFixedQualityDifferentDirection(self, other, diatonicInterval);

  if (!quality)
    return null;

  return fromIntervalQuality(diatonicInterval, quality);
}
