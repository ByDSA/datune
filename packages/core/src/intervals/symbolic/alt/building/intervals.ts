import type { Interval } from "../Interval";
import type { Interval as CInterval } from "intervals/chromatic";
import type { Interval as DInterval } from "intervals/diatonic";
import { Intervals as DIntervals } from "intervals/diatonic";
import { fixAlts } from "pitches/alt/fixAlts";
import { calcAlts } from "pitches/alt/calcAlts";
import { Pitches as DP } from "pitches/diatonic";
import { fromInt as qualityFromInt } from "../quality/building";
import { fromIntervalQuality } from "./intervalQuality";

type Input = {
  chromaticInterval: CInterval;
  diatonicInterval: DInterval;
};
export function fromIntervals(
  { chromaticInterval,
    diatonicInterval }: Input,
): Interval | null {
  const simplePositiveInterval: DInterval = DIntervals.fromInt(
    Math.abs(+diatonicInterval % DP.NUMBER),
  );
  const simplePositiveChromaticInterval = Math.abs(+chromaticInterval);
  const alts = fixAlts(
    calcAlts(simplePositiveChromaticInterval, simplePositiveInterval),
  );
  const isMain = DIntervals.isMainInterval(diatonicInterval);
  const quality = qualityFromInt(alts, isMain);

  if (!quality)
    return null;

  return fromIntervalQuality(diatonicInterval, quality);
}
