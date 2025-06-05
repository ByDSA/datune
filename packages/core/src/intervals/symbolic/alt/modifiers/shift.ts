import type { Interval } from "../Interval";
import { Intervals as DI } from "intervals/diatonic";
import { fromIntervalQuality } from "../building/intervalQuality";
import { calcFixedQualityDifferentDirection } from "./calcQuality/differentDirection";
import { calcFixedQualitySameDirection } from "./calcQuality/sameDirection";

export function shift(
  obj: Interval,
  other: Interval,
): Interval {
  const diatonicInterval = DI.shift(obj.diatonicInterval, other.diatonicInterval);
  const quality = obj.diatonicInterval.direction === other.diatonicInterval.direction
    ? calcFixedQualitySameDirection(obj, other, diatonicInterval)
    : calcFixedQualityDifferentDirection(obj, other, diatonicInterval);

  return fromIntervalQuality(diatonicInterval, quality) as Interval;
}
