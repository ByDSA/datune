import type { Pitch } from "../Pitch";
import { Pitches as CPitches } from "pitches/chromatic";
import { Pitches as DPitches } from "pitches/diatonic";

export function toChromatic(obj: Pitch) {
  const intValue = +DPitches.toChromatic(obj.diatonic) + obj.alts;

  return CPitches.fromInt(intValue);
}
