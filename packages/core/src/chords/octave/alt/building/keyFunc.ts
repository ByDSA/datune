import type { Chord } from "chords/alt";
import type { Func } from "functions/alt";
import type { Key } from "keys/alt";

export function fromKeyFunc(
  key: Key,
  func: Func,
): Chord | null {
  return func.getChord(key.root);
}
