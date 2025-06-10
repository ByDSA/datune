import type { Interval } from "../Interval";
import { Intervals as DI } from "intervals/diatonic";
import { fromIntervalQuality } from "../building/intervalQuality";
import { calcFixedQuality } from "./calcFixedQuality";

export function shift(
  obj: Interval,
  other: Interval,
): Interval {
  const diatonicInterval = DI.shift(obj.diatonicInterval, other.diatonicInterval);
  const quality = calcFixedQuality(
    obj,
    other,
    diatonicInterval,
  );

  return fromIntervalQuality(diatonicInterval, quality)!;
}
