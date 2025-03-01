import { PitchArray } from "@datune/core/pitches/alt";
import { stringifyPitch } from ".";
import { Options } from "parsing";

export function stringifyPitches(pitches: PitchArray, options?: Options): string {
  return pitches.map((p) => stringifyPitch(p, options)).join("-");
}
