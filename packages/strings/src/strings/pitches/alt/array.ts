import { PitchArray } from "@datune/core/pitches/alt";
import { Options } from "parsing";
import { stringifyPitch } from ".";

export function stringifyPitches(pitches: PitchArray, options?: Options): string {
  return pitches.map((p) => stringifyPitch(p, options)).join("-");
}
