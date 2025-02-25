import { Options } from "lang";
import { SPN } from "@datune/core/spns/alt";
import stringify from "strings/pitches/alt";

export default function toString(obj: SPN, options?: Options): string {
  return stringify(obj.pitch, options) + obj.octave;
}
