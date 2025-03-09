import type { Pitch } from "../Pitch";
import type { Interval } from "intervals/alt";
import type { Pitch as CPitch } from "pitches/chromatic";
import type { Pitch as DPitch } from "pitches/diatonic";
import { fromAltInterval as cIntervalFromAltInterval } from "intervals/symbolic/chromatic/building";
import { add as cPitchAdd } from "pitches/chromatic/modifiers/add";
import { fromAltPitch as cPitchFromAltPitch } from "pitches/chromatic/building";
import { add as dPitchAdd } from "pitches/diatonic/modifiers";
import { fromChromaticAndDiatonic } from "../building/chromaticAndDiatonic";

export function add(pitch: Pitch, interval: Interval): Pitch {
  const dPitch: DPitch = dPitchAdd(pitch.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = cIntervalFromAltInterval(interval);
  const cPitch: CPitch = cPitchAdd(cPitchFromAltPitch(pitch), intervalChromaticInterval);

  return fromChromaticAndDiatonic(cPitch, dPitch);
}
