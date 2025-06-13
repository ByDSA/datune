import { from } from "../building";
import { Key } from "../Key";

export function mode(key: Key, n: number): Key {
  const newScale = key.scale.withMode(n);
  const newRoot = key.pitches[(n - 1) % key.length];

  return from(newRoot, newScale);
}
