import type { Pitch } from "../Pitch";
import type { Pitch as DPitch } from "pitches/diatonic";
import type { Pitch as CPitch } from "pitches/chromatic";
import { type Interval } from "intervals/alt";
import { fromAltInterval as cIntervalFromAltInterval } from "intervals/symbolic/chromatic/building";
import { fromAltPitch as cPitchFromAltPitch } from "pitches/chromatic/building";
import { sub as cPitchSub } from "pitches/chromatic/modifiers/sub";
import { sub as dPitchSub } from "pitches/diatonic/modifiers";
import { fromChromaticAndDiatonic } from "../building/chromaticAndDiatonic";

export function sub(obj: Pitch, interval: Interval): Pitch {
  const dPitch: DPitch = dPitchSub(obj.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = cIntervalFromAltInterval(interval);
  const cPitch: CPitch = cPitchSub(cPitchFromAltPitch(obj), intervalChromaticInterval);

  return fromChromaticAndDiatonic(cPitch, dPitch);
}
