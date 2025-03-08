import type { Pitch } from "../Pitch";
import type { Pitch as DPitch } from "pitches/diatonic";
import type { Pitch as CPitch } from "pitches/chromatic";
import { type Interval, Intervals as I } from "intervals/alt";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { toChromatic } from "../conversions/chromatic";
import { fromChromaticAndDiatonic } from "../building/chromaticAndDiatonic";

export function sub(obj: Pitch, interval: Interval): Pitch {
  const dPitch: DPitch = DP.sub(obj.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = I.toChromaticInterval(interval);
  const cPitch: CPitch = CP.sub(toChromatic(obj), intervalChromaticInterval);

  return fromChromaticAndDiatonic(cPitch, dPitch);
}
