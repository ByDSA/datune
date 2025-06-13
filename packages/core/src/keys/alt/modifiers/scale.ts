import type { Scale } from "alt";
import type { Key } from "../Key";
import { from } from "../building";

export function scale(obj: Key, newScale: Scale): Key {
  return from(obj.root, newScale);
}
