import type { Pitch } from "../Pitch";
import type { Pitch as CPitch } from "pitches/chromatic";
import type { PitchArray } from "alt";
import { toChromatic } from "../conversions";

export function fromChromaticInPitchArray(
  cPitch: CPitch,
  pitchArray: PitchArray,
): Pitch | null {
  return pitchArray.find(p=>toChromatic(p) === cPitch) ?? null;
}
