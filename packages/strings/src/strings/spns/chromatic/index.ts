import { SPN } from "@datune/core/spns/chromatic";
import { stringifyPitch } from "../../pitches/chromatic";
import { Options } from "lang";

export function stringifySpn(obj: SPN, options?: Options): string {
  return stringifyPitch(obj.pitch, options) + obj.octave;
}
