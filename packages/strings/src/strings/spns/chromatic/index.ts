import { Spn } from "@datune/core/spns/chromatic";
import { Options } from "lang";
import { stringifyPitch } from "../../pitches/chromatic";

export function stringifySpn(obj: Spn, options?: Options): string {
  return stringifyPitch(obj.pitch, options) + obj.octave;
}
