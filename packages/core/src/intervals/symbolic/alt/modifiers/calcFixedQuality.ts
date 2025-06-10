import type { Interval } from "../Interval";
import type { Quality } from "../quality/Quality";
import type { Interval as DInterval } from "intervals/diatonic";
import { calcAlts } from "pitches/alt/calcAlts";
import { fixAlts } from "pitches/alt/fixAlts";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";
import { NUMBER as DNUMBER } from "pitches/diatonic/constants";
import { Intervals as CI } from "intervals/chromatic";
import { Intervals as DI } from "intervals/diatonic";
import { fromInt as qualityFromInt } from "../quality/building";

export function calcFixedQuality(
  self: Interval,
  other: Interval,
  diatonicInterval: DInterval,
): Quality {
  const isMain = DI.isMainInterval(diatonicInterval);
  const selfChromatic = CI.fromAltInterval(self);
  const otherChromatic = CI.fromAltInterval(other);
  const diatonicIntervalAbsSimpleIntervalInt = Math.abs(diatonicInterval.magnitude)
   % DNUMBER;
  const diatonicIntervalAbsSimpleInterval = DI.fromInt(
    diatonicIntervalAbsSimpleIntervalInt,
  );
  const resultAbsSimpleChromaticInterval = diatonicIntervalAbsSimpleIntervalInt === 0
    ? (selfChromatic + otherChromatic) % CNUMBER
    : Math.abs((selfChromatic + otherChromatic) % CNUMBER);
  let differenceWithMajor = calcAlts(
    resultAbsSimpleChromaticInterval,
    diatonicIntervalAbsSimpleInterval,
  );

  differenceWithMajor = fixAlts(differenceWithMajor);
  const quality = qualityFromInt(differenceWithMajor, isMain);

  return quality;
}
