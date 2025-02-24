import { add as diatonicAdd } from "intervals/diatonic";
import { fromIntervalQuality } from "../building";
import Interval from "../Interval";
import calcFixedQualityDifferentDirection from "./calcQuality/differentDirection";
import calcFixedQualitySameDirection from "./calcQuality/sameDirection";

export default function add(
  self: Interval,
  other: Interval,
): Interval | null {
  const diatonicInterval = diatonicAdd(self.diatonicInterval, other.diatonicInterval);
  const quality = self.diatonicInterval.direction === other.diatonicInterval.direction
    ? calcFixedQualitySameDirection(self, other, diatonicInterval)
    : calcFixedQualityDifferentDirection(self, other, diatonicInterval);

  if (!quality)
    return null;

  return fromIntervalQuality(diatonicInterval, quality);
}
