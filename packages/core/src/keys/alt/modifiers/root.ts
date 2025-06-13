import type { Pitch } from "alt";
import type { Key } from "../Key";
import { from } from "../building";

export function root(obj: Key, newRoot: Pitch): Key {
  return from(newRoot, obj.scale);
}
