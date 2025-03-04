import { SPN } from "@datune/core/spns/chromatic";
import { Options } from "lang";
import { stringifyPitch } from "../../pitches/chromatic";

export function stringifySpn(obj: SPN, options?: Options): string {
  return stringifyPitch(obj.pitch, options) + obj.octave;
}
