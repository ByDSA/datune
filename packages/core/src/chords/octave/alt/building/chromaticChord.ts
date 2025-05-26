import type { Chord as CChord } from "chromatic";
import type { Chord } from "..";
import type { PitchArray } from "pitches/alt";
import { Chords as C } from "chords/alt";
import { Pitches as P } from "pitches/alt";
import { PitchSets as PS } from "sets/pitch-set/alt";

export function fromChromaticChord(cChord: CChord): Chord {
  const pitches = cChord.pitches.map(P.fromChromatic) as PitchArray;
  const pitchSet = PS.fromPitches(...pitches);
  const root = P.fromChromatic(cChord.root);
  const bass = P.fromChromatic(cChord.bass);

  return C.from( {
    bass,
    pitchSet,
    root,
  } );
}
