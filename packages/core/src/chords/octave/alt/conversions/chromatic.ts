import type { Chord } from "../Chord";
import type { Chord as CChord } from "chords/chromatic";
import type { PitchArray as CArray } from "pitches/chromatic";
import { Chords as CChords } from "chords/chromatic";
import { Pitches } from "pitches/alt";

export function toChromatic(obj: Chord): CChord {
  const pitches = obj.pitches.map(Pitches.toChromatic) as CArray;

  return CChords.fromPitches(...pitches);
}
