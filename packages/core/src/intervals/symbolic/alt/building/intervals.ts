import { Interval as Chromatic } from "intervals/chromatic";
import { fromInt as DIFromInt, Interval as DiatonicInterval, isMainInterval } from "intervals/diatonic";
import { fromInt as qualityFromInt } from "intervals/quality";
import { calcAlts, fixAlts } from "pitches/alt";
import { NUMBER as D_NUMBER } from "pitches/diatonic";
import Interval from "../Interval";
import fromIntervalQuality from "./intervalQuality";

type Input = {
  chromaticInterval: Chromatic;
  diatonicInterval: DiatonicInterval;
};
export default function fromIntervals(
  { chromaticInterval,
    diatonicInterval }: Input,
): Interval | null {
  const simplePositiveInterval: DiatonicInterval = DIFromInt(
    Math.abs(+diatonicInterval % D_NUMBER),
  );
  const simplePositiveChromaticInterval = Math.abs(+chromaticInterval);
  const alts = fixAlts(
    calcAlts(simplePositiveChromaticInterval, simplePositiveInterval),
  );
  const isMain = isMainInterval(diatonicInterval);
  const quality = qualityFromInt(alts, isMain);

  if (!quality)
    return null;

  return fromIntervalQuality(diatonicInterval, quality);
}
