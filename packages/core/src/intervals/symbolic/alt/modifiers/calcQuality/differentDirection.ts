import type { Interval } from "../../Interval";
import type { Quality } from "../../quality/Quality";
import type { Interval as DiatonicInterval } from "intervals/diatonic";
import { Intervals as DI } from "intervals/diatonic";
import { Intervals as CI } from "intervals/chromatic";
import { calcAlts } from "pitches/alt/calcAlts";
import { fixAlts } from "pitches/alt/fixAlts";
import { Pitches as DPitches } from "pitches/diatonic";
import { fromInt as qualityFromInt } from "../../quality/building";

export function calcFixedQualityDifferentDirection(
  self: Interval,
  other: Interval,
  diatonicInterval: DiatonicInterval,
): Quality {
  const { fromInt: diatonicIntervalFromInt } = DI;
  const isMain = diatonicIsMainInterval(diatonicInterval);
  const selfChromatic = Math.abs(CI.fromAltInterval(self));
  const otherChromatic = Math.abs(CI.fromAltInterval(other));
  const resultChromaticInterval = Math.abs(selfChromatic - otherChromatic);
  const diatonicIntervalAbsSimpleIntervalInt = Math.abs(diatonicInterval.magnitude)
  % DPitches.NUMBER;
  const diatonicIntervalAbsSimpleInterval = diatonicIntervalFromInt(
    diatonicIntervalAbsSimpleIntervalInt,
  );
  let differenceWithMajor = calcAlts(
    resultChromaticInterval,
    diatonicIntervalAbsSimpleInterval,
  );

  differenceWithMajor = fixAlts(differenceWithMajor);
  const quality = qualityFromInt(differenceWithMajor, isMain);

  return quality;
}

function diatonicIsMainInterval(interval: DiatonicInterval): boolean {
  const { abs: diatonicAbs,
    FIFTH, FOURTH,
    simplify: diatonicSimplify, UNISON } = DI;
  const diatonicSimpleAbsInterval = diatonicAbs(diatonicSimplify(interval));

  return diatonicSimpleAbsInterval === UNISON
  || diatonicSimpleAbsInterval === FOURTH
  || diatonicSimpleAbsInterval === FIFTH;
}
