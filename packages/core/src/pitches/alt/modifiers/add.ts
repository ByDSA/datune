import type { Pitch } from "../Pitch";
import type { Interval } from "intervals/alt";
import type { Pitch as CPitch } from "pitches/chromatic";
import type { Pitch as DPitch } from "pitches/diatonic";
import { toChromaticInterval } from "intervals/symbolic/alt/conversions/chromaticInterval";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { toChromatic } from "../conversions/chromatic";
import { fromChromaticAndDiatonic } from "../building/chromaticAndDiatonic";

export function add(pitch: Pitch, interval: Interval): Pitch {
  const dPitch: DPitch = DP.add(pitch.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = toChromaticInterval(interval);
  const cPitch: CPitch = CP.add(toChromatic(pitch), intervalChromaticInterval);

  return fromChromaticAndDiatonic(cPitch, dPitch);
}
