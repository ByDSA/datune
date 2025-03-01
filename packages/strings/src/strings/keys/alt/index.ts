import { Key } from "@datune/core/keys/alt";
import { Options } from "lang";
import { stringifyPitch } from "strings/pitches/alt";
import { stringifyScale } from "strings/scales/alt";

export function stringifyKey(obj: Key, options?: Options): string {
  return `${stringifyPitch(obj.root, options)} ${stringifyScale(obj.scale, options)}`;
}
