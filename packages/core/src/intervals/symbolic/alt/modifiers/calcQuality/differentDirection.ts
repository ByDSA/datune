import type { Interval } from "../../Interval";
import type { Quality } from "../../quality/Quality";
import type { Interval as DiatonicInterval } from "intervals/diatonic";
import { Intervals as DIntervals } from "intervals/diatonic";
import { calcAlts } from "pitches/alt/calcAlts";
import { fixAlts } from "pitches/alt/fixAlts";
import { Pitches as DPitches } from "pitches/diatonic";
import { fromInt as qualityFromInt } from "../../quality/building";
import { toChromaticInterval } from "../../conversions";

export function calcFixedQualityDifferentDirection(
  self: Interval,
  other: Interval,
  diatonicInterval: DiatonicInterval,
): Quality | null {
  const { fromInt: diatonicIntervalFromInt } = DIntervals;
  const isMain = diatonicIsMainInterval(diatonicInterval);
  const selfChromatic = Math.abs(toChromaticInterval(self));
  const otherChromatic = Math.abs(toChromaticInterval(other));
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
    simplify: diatonicSimplify, UNISON } = DIntervals;
  const diatonicSimpleAbsInterval = diatonicAbs(diatonicSimplify(interval));

  return diatonicSimpleAbsInterval === UNISON
  || diatonicSimpleAbsInterval === FOURTH
  || diatonicSimpleAbsInterval === FIFTH;
}
