import { Options } from "parsing";
import { Array as PitchArray } from "@datune/core/pitches/chromatic";
import stringify from ".";

export default function arrayStringify(pitches: PitchArray, options?: Options): string {
  return pitches.map((p) => stringify(p, options)).join("-");
}
