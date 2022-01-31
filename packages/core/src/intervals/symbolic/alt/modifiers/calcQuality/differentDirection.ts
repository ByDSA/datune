import { DiatonicInterval } from "index";
import { abs as diatonicAbs, FIFTH, FOURTH, fromInt as diatonicIntervalFromInt, simple as diatonicSimple, UNISON } from "intervals/diatonic";
import { fromInt as qualityFromInt, Quality } from "intervals/symbolic/quality";
import { calcAlts, fixAlts } from "pitches/alt";
import { NUMBER as D_NUMBER } from "pitches/diatonic";
import { toChromaticInterval } from "../../conversions";
import Interval from "../../Interval";

export default function calcFixedQualitySub(
  self: Interval,
  other: Interval,
  diatonicInterval: DiatonicInterval,
): Quality | null {
  const isMain = diatonicIsMainInterval(diatonicInterval);
  const selfChromatic = Math.abs(toChromaticInterval(self));
  const otherChromatic = Math.abs(toChromaticInterval(other));
  const resultChromaticInterval = Math.abs(selfChromatic - otherChromatic);
  const diatonicIntervalAbsSimpleIntervalInt = Math.abs(diatonicInterval.magnitude) % D_NUMBER;
  const diatonicIntervalAbsSimpleInterval = diatonicIntervalFromInt(
    diatonicIntervalAbsSimpleIntervalInt,
  );
  let differenceWithMajor = calcAlts(resultChromaticInterval, diatonicIntervalAbsSimpleInterval);

  differenceWithMajor = fixAlts(differenceWithMajor);
  const quality = qualityFromInt(differenceWithMajor, isMain);

  return quality;
}

function diatonicIsMainInterval(interval: DiatonicInterval): boolean {
  const diatonicSimpleAbsInterval = diatonicAbs(diatonicSimple(interval));

  return diatonicSimpleAbsInterval === UNISON
  || diatonicSimpleAbsInterval === FOURTH
  || diatonicSimpleAbsInterval === FIFTH;
}
