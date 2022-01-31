import { Key } from "keys/alt";
import { Options } from "lang";
import pitchStringify from "strings/pitches/alt";
import scaleStringify from "strings/scales/alt";

export default function stringify(obj: Key, options?: Options): string {
  return `${pitchStringify(obj.root, options)} ${scaleStringify(obj.scale, options)}`;
}
