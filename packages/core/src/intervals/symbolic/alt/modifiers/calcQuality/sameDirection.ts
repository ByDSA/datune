import type { Interval } from "../../Interval";
import type { Quality } from "../../quality/Quality";
import type { Interval as DInterval } from "intervals/diatonic";
import { Intervals as DI } from "intervals/diatonic";
import { calcAlts } from "pitches/alt/calcAlts";
import { fixAlts } from "pitches/alt/fixAlts";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";
import { NUMBER as DNUMBER } from "pitches/diatonic/constants";
import { Intervals as CI } from "intervals/chromatic";
import { fromInt as qualityFromInt } from "../../quality/building";

export function calcFixedQualitySameDirection(
  self: Interval,
  other: Interval,
  diatonicInterval: DInterval,
): Quality {
  const isMain = DI.isMainInterval(diatonicInterval);
  const selfChromatic = Math.abs(CI.fromAltInterval(self));
  const otherChromatic = Math.abs(CI.fromAltInterval(other));
  const resultAbsSimpleChromaticInterval = (selfChromatic + otherChromatic) % CNUMBER;
  const diatonicIntervalAbsSimpleIntervalInt = Math.abs(diatonicInterval.magnitude)
   % DNUMBER;
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
