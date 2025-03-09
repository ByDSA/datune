import type { Pitch } from "../Pitch";
import type { PitchArray } from "alt";
import { Pitches as CP, type Pitch as CPitch } from "pitches/chromatic";

export function fromChromaticInPitchArray(
  cPitch: CPitch,
  pitchArray: PitchArray,
): Pitch | null {
  return pitchArray.find(p=>CP.fromAltPitch(p) === cPitch) ?? null;
}
