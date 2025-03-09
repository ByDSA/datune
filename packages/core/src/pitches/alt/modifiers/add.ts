import type { Pitch } from "../Pitch";
import type { Interval } from "intervals/alt";
import type { Pitch as CPitch } from "pitches/chromatic";
import type { Pitch as DPitch } from "pitches/diatonic";
import { Intervals as CI } from "intervals/chromatic";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { fromChromaticAndDiatonic } from "../building/chromaticAndDiatonic";

export function add(pitch: Pitch, interval: Interval): Pitch {
  const dPitch: DPitch = DP.add(pitch.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = CI.fromAltInterval(interval);
  const cPitch: CPitch = CP.add(CP.fromAltPitch(pitch), intervalChromaticInterval);

  return fromChromaticAndDiatonic(cPitch, dPitch);
}
