import type { Chord } from "../../../../chords/octave/chromatic/Chord";
import type { Voicing } from "voicings/chromatic";
import { fromRootIntervals } from "./rootIntervals";

export function fromRootChord(chord: Chord): Voicing {
  return fromRootIntervals(...chord.rootIntervals);
}
