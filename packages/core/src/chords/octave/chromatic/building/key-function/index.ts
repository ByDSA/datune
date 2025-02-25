import { Chord } from "chords/chromatic";
import { HarmonicFunction } from "functions/chromatic";
import { Key } from "keys/chromatic";

export default function from(key: Key, harmonicFunction: HarmonicFunction): Chord {
  return harmonicFunction.getChord(key);
}
