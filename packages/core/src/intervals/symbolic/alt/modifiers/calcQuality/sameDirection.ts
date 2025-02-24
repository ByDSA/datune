import { DiatonicInterval } from "index";
import { fromInt as diatonicIntervalFromInt, isMainInterval } from "intervals/diatonic";
import { fromInt as qualityFromInt, Quality } from "intervals/symbolic/quality";
import { calcAlts, fixAlts } from "pitches/alt";
import { NUMBER as C_NUMBER } from "pitches/chromatic";
import { NUMBER as D_NUMBER } from "pitches/diatonic";
import { toChromaticInterval } from "../../conversions";
import Interval from "../../Interval";

export default function calcFixedQuality(
  self: Interval,
  other: Interval,
  diatonicInterval: DiatonicInterval,
): Quality | null {
  const isMain = isMainInterval(diatonicInterval);
  const selfChromatic = Math.abs(toChromaticInterval(self));
  const otherChromatic = Math.abs(toChromaticInterval(other));
  const resultAbsSimpleChromaticInterval = (selfChromatic + otherChromatic) % C_NUMBER;
  const diatonicIntervalAbsSimpleIntervalInt = Math.abs(diatonicInterval.magnitude) % D_NUMBER;
  const diatonicIntervalAbsSimpleInterval = diatonicIntervalFromInt(
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
