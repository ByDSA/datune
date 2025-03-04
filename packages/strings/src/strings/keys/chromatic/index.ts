import { Key } from "@datune/core/keys/chromatic";
import { Options } from "lang";
import { stringifyPitch } from "../../pitches/chromatic";
import { stringifyScale } from "../../scales/chromatic";

export function stringifyKey(obj: Key, options?: Options): string {
  return `${stringifyPitch(obj.root, options)} ${stringifyScale(obj.scale, options)}`;
}
