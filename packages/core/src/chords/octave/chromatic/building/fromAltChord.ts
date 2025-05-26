import type { Chord as AChord } from "chords/alt";
import type { Chord } from "..";
import { Pitches as CP, PitchArray } from "pitches/chromatic";
import { fromPitches } from "./pitches";

export function fromAltChord(chord: AChord): Chord {
  const pitches = chord.pitches.map(CP.fromAltPitch) as PitchArray;

  return fromPitches(...pitches);
}
