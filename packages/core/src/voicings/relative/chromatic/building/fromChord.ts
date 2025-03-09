import type { Chord } from "../../../../chords/octave/chromatic/Chord";
import type { Voicing } from "voicings/chromatic";
import { fromPitches } from "./pitches";

export function fromChord(chord: Chord): Voicing {
  return fromPitches(...chord.pitches);
}
