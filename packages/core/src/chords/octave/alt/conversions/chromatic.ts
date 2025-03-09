import type { Chord } from "../Chord";
import type { Chord as CChord } from "chords/chromatic";
import { Pitches as CP, type PitchArray as CPitchArray } from "pitches/chromatic";
import { Chords as CC } from "chords/chromatic";

export function toChromatic(chord: Chord): CChord {
  const pitches = chord.pitches.map(CP.fromAltPitch) as CPitchArray;

  return CC.fromPitches(...pitches);
}
