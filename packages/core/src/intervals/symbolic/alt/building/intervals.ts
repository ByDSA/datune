import Interval from "../Interval";
import { fromIntervalQuality } from "./intervalQuality";
import { Interval as Chromatic } from "intervals/chromatic";
import { Interval as DInterval, Intervals as DIntervals } from "intervals/diatonic";
import { fromInt as qualityFromInt } from "intervals/quality";
import { Pitches } from "pitches/alt";
import { Pitches as DPitches } from "pitches/diatonic";

type Input = {
  chromaticInterval: Chromatic;
  diatonicInterval: DInterval;
};
export function fromIntervals(
  { chromaticInterval,
    diatonicInterval }: Input,
): Interval | null {
  const simplePositiveInterval: DInterval = DIntervals.fromInt(
    Math.abs(+diatonicInterval % DPitches.NUMBER),
  );
  const simplePositiveChromaticInterval = Math.abs(+chromaticInterval);
  const alts = Pitches.fixAlts(
    Pitches.calcAlts(simplePositiveChromaticInterval, simplePositiveInterval),
  );
  const isMain = DIntervals.isMainInterval(diatonicInterval);
  const quality = qualityFromInt(alts, isMain);

  if (!quality)
    return null;

  return fromIntervalQuality(diatonicInterval, quality);
}
