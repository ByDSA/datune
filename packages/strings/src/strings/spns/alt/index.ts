import { SPN } from "@datune/core/spns/alt";
import { Options } from "lang";
import { stringifyPitch } from "strings/pitches/alt";

export function stringifySpn(obj: SPN, options?: Options): string {
  return stringifyPitch(obj.pitch, options) + obj.octave;
}
