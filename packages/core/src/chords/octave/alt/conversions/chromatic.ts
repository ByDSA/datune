import type { Chord } from "../Chord";
import type { Chord as CChord } from "chords/chromatic";
import type { PitchArray as CPitchArray } from "pitches/chromatic";
import { Chords as CC } from "chords/chromatic";
import { Pitches as P } from "pitches/alt";

export function toChromatic(obj: Chord): CChord {
  const pitches = obj.pitches.map(P.toChromatic) as CPitchArray;

  return CC.fromPitches(...pitches);
}
