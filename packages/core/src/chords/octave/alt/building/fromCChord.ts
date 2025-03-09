import type { Chord as CChord } from "chromatic";
import type { Chord } from "..";
import type { PitchArray } from "pitches/alt";
import { Chords as C } from "chords/alt";
import { Pitches as P } from "pitches/alt";

export function fromChromaticChord(cChord: CChord): Chord {
  const pitches = cChord.pitches.map(P.fromChromatic) as PitchArray;

  return C.fromPitches(...pitches);
}
