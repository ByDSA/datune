import { Chord } from "chords/chromatic";
import { HarmonicFunction } from "functions/chromatic";
import { Key } from "keys/chromatic";

export function fromKeyFunction(key: Key, harmonicFunction: HarmonicFunction): Chord {
  return harmonicFunction.getChord(key);
}
