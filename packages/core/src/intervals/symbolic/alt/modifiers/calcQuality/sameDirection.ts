import type { Interval } from "../../Interval";
import type { Quality } from "../../quality/Quality";
import type { Interval as DInterval } from "intervals/diatonic";
import { Intervals as DI } from "intervals/diatonic";
import { calcAlts } from "pitches/alt/calcAlts";
import { fixAlts } from "pitches/alt/fixAlts";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { Intervals as CI } from "intervals/chromatic";
import { fromInt as qualityFromInt } from "../../quality/building";

export function calcFixedQualitySameDirection(
  self: Interval,
  other: Interval,
  diatonicInterval: DInterval,
): Quality | null {
  const isMain = DI.isMainInterval(diatonicInterval);
  const selfChromatic = Math.abs(CI.fromAltInterval(self));
  const otherChromatic = Math.abs(CI.fromAltInterval(other));
  const resultAbsSimpleChromaticInterval = (selfChromatic + otherChromatic) % CP.NUMBER;
  const diatonicIntervalAbsSimpleIntervalInt = Math.abs(diatonicInterval.magnitude)
   % DP.NUMBER;
  const diatonicIntervalAbsSimpleInterval = DI.fromInt(
    diatonicIntervalAbsSimpleIntervalInt,
  );
  let differenceWithMajor = calcAlts(
    resultAbsSimpleChromaticInterval,
    diatonicIntervalAbsSimpleInterval,
  );

  differenceWithMajor = fixAlts(differenceWithMajor);
  const quality = qualityFromInt(differenceWithMajor, isMain);

  return quality;
}
