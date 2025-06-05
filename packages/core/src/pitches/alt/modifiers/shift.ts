import type { Pitch } from "../Pitch";
import type { Interval } from "intervals/alt";
import type { Pitch as CPitch } from "pitches/chromatic";
import type { Pitch as DPitch } from "pitches/diatonic";
import { fromAltInterval as cIntervalFromAltInterval } from "intervals/symbolic/chromatic/building";
import { shift as cPitchShift } from "pitches/chromatic/modifiers/shift";
import { fromAltPitch as cPitchFromAltPitch } from "pitches/chromatic/building";
import { shift as dPitchShift } from "pitches/diatonic/modifiers";
import { fromChromaticAndDiatonic } from "../building/chromaticAndDiatonic";

export function shift(pitch: Pitch, interval: Interval): Pitch {
  const dPitch: DPitch = dPitchShift(pitch.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = cIntervalFromAltInterval(interval);
  const cPitch: CPitch = cPitchShift(cPitchFromAltPitch(pitch), intervalChromaticInterval);

  return fromChromaticAndDiatonic(cPitch, dPitch);
}
