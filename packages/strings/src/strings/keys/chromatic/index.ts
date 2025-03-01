import { Key } from "@datune/core/keys/chromatic";
import { stringifyPitch } from "../../pitches/chromatic";
import { stringifyScale } from "../../scales/chromatic";
import { Options } from "lang";

export function stringifyKey(obj: Key, options?: Options): string {
  return `${stringifyPitch(obj.root, options)} ${stringifyScale(obj.scale, options)}`;
}
