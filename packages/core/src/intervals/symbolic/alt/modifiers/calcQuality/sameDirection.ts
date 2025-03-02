import { toChromaticInterval } from "../../conversions";
import type { Interval } from "../../Interval";
import type { Quality } from "../../quality/Quality";
import { fromInt as qualityFromInt } from "../../quality/building";
import type { Interval as DiatonicInterval } from "intervals/diatonic";
import { Intervals as DIntervals } from "intervals/diatonic";
import { Pitches } from "pitches/alt";
import { Pitches as CPitches } from "pitches/chromatic";
import { Pitches as DPitches } from "pitches/diatonic";

export function calcFixedQualitySameDirection(
  self: Interval,
  other: Interval,
  diatonicInterval: DiatonicInterval,
): Quality | null {
  const isMain = DIntervals.isMainInterval(diatonicInterval);
  const selfChromatic = Math.abs(toChromaticInterval(self));
  const otherChromatic = Math.abs(toChromaticInterval(other));
  const resultAbsSimpleChromaticInterval = (selfChromatic + otherChromatic) % CPitches.NUMBER;
  const diatonicIntervalAbsSimpleIntervalInt = Math.abs(diatonicInterval.magnitude)
   % DPitches.NUMBER;
  const diatonicIntervalAbsSimpleInterval = DIntervals.fromInt(
    diatonicIntervalAbsSimpleIntervalInt,
  );
  let differenceWithMajor = Pitches.calcAlts(
    resultAbsSimpleChromaticInterval,
    diatonicIntervalAbsSimpleInterval,
  );

  differenceWithMajor = Pitches.fixAlts(differenceWithMajor);
  const quality = qualityFromInt(differenceWithMajor, isMain);

  return quality;
}
