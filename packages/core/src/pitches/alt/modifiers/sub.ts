import type { Pitch } from "../Pitch";
import type { Pitch as DPitch } from "pitches/diatonic";
import type { Pitch as CPitch } from "pitches/chromatic";
import { type Interval } from "intervals/alt";
import { Intervals as CI } from "intervals/chromatic";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { fromChromaticAndDiatonic } from "../building/chromaticAndDiatonic";

export function sub(obj: Pitch, interval: Interval): Pitch {
  const dPitch: DPitch = DP.sub(obj.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = CI.fromAltInterval(interval);
  const cPitch: CPitch = CP.sub(CP.fromAltPitch(obj), intervalChromaticInterval);

  return fromChromaticAndDiatonic(cPitch, dPitch);
}
