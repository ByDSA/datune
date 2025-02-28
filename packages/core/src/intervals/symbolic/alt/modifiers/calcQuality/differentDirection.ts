import { toChromaticInterval } from "../../conversions";
import type { Interval } from "../../Interval";
import { DiatonicInterval } from "index";
import { Intervals as DIntervals } from "intervals/diatonic";
import { fromInt as qualityFromInt, Quality } from "intervals/symbolic/quality";
import { Pitches } from "pitches/alt";
import { Pitches as DPitches } from "pitches/diatonic";

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
  let differenceWithMajor = Pitches.calcAlts(
    resultChromaticInterval,
    diatonicIntervalAbsSimpleInterval,
  );

  differenceWithMajor = Pitches.fixAlts(differenceWithMajor);
  const quality = qualityFromInt(differenceWithMajor, isMain);

  return quality;
}

function diatonicIsMainInterval(interval: DiatonicInterval): boolean {
  const { abs: diatonicAbs,
    FIFTH, FOURTH,
    simple: diatonicSimple, UNISON } = DIntervals;
  const diatonicSimpleAbsInterval = diatonicAbs(diatonicSimple(interval));

  return diatonicSimpleAbsInterval === UNISON
  || diatonicSimpleAbsInterval === FOURTH
  || diatonicSimpleAbsInterval === FIFTH;
}
