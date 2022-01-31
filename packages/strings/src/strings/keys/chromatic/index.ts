import { Key } from "keys/chromatic";
import { Options } from "lang";
import pitchStringify from "../../pitches/chromatic";
import scaleStringify from "../../scales/chromatic";

export default function stringify(obj: Key, options?: Options): string {
  return `${pitchStringify(obj.root, options)} ${scaleStringify(obj.scale, options)}`;
}
