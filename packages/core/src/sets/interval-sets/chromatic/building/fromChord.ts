import type { Chord } from "../../../../chords/octave/chromatic/Chord";
import type { IntervalSet } from "sets/interval-sets/chromatic";
import { fromRootIntervals } from "./rootIntervals";

export function fromChord(chord: Chord): IntervalSet {
  return fromRootIntervals(...chord.rootIntervals);
}
