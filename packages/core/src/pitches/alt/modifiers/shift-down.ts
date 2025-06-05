import type { Pitch } from "../Pitch";
import type { Pitch as DPitch } from "pitches/diatonic";
import type { Pitch as CPitch } from "pitches/chromatic";
import { type Interval } from "intervals/alt";
import { fromAltInterval as cIntervalFromAltInterval } from "intervals/symbolic/chromatic/building";
import { fromAltPitch as cPitchFromAltPitch } from "pitches/chromatic/building";
import { shiftDown as cPitchShiftDown } from "pitches/chromatic/modifiers/shift-down";
import { shiftDown as dPitchShiftDown } from "pitches/diatonic/modifiers";
import { fromChromaticAndDiatonic } from "../building/chromaticAndDiatonic";

export function shiftDown(obj: Pitch, interval: Interval): Pitch {
  const dPitch: DPitch = dPitchShiftDown(obj.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = cIntervalFromAltInterval(interval);
  const cPitch: CPitch = cPitchShiftDown(cPitchFromAltPitch(obj), intervalChromaticInterval);

  return fromChromaticAndDiatonic(cPitch, dPitch);
}
