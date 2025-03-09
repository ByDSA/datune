import type { Chord as AChord } from "chords/alt";
import type { Chord } from "..";
import { Pitches as CP, PitchArray } from "pitches/chromatic";
import { Chords as CC } from "chords/chromatic";

export function fromAltChord(chord: AChord): Chord {
  const pitches = chord.pitches.map(CP.fromAltPitch) as PitchArray;

  return CC.fromPitches(...pitches);
}
