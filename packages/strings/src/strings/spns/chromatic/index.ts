import { Options } from "lang";
import { SPN } from "@datune/core/spns/chromatic";
import pitchStringify from "../../pitches/chromatic";

export default function toString(obj: SPN, options?: Options): string {
  return pitchStringify(obj.pitch, options) + obj.octave;
}
