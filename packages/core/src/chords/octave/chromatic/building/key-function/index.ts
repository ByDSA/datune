import type { Chord } from "chords/chromatic";
import type { Func } from "functions/chromatic";
import type { Key } from "keys/chromatic";

export function fromKeyFunc(key: Key, func: Func): Chord {
  return func.getChord(key);
}
