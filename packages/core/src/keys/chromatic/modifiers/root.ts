import type { Pitch } from "chromatic";
import type { Key } from "../Key";
import { from } from "../building";

export function root(obj: Key, newRoot: Pitch): Key {
  return from(newRoot, obj.scale);
}
