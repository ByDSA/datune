import { DiatonicInterval } from "index";
import { Intervals as DIntervals } from "intervals/diatonic";
import { fromInt as qualityFromInt, Quality } from "intervals/symbolic/quality";
import { Pitches } from "pitches/alt";
import { Pitches as CPitches } from "pitches/chromatic";
import { Pitches as DPitches } from "pitches/diatonic";
import { toChromaticInterval } from "../../conversions";
import Interval from "../../Interval";

export default function calcFixedQuality(
  self: Interval,
  other: Interval,
  diatonicInterval: DiatonicInterval,
): Quality | null {
  const isMain = DIntervals.isMainInterval(diatonicInterval);
  const selfChromatic = Math.abs(toChromaticInterval(self));
  const otherChromatic = Math.abs(toChromaticInterval(other));
  const resultAbsSimpleChromaticInterval = (selfChromatic + otherChromatic) % CPitches.NUMBER;
  const diatonicIntervalAbsSimpleIntervalInt = Math.abs(diatonicInterval.magnitude) % DPitches.NUMBER;
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
