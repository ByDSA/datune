import Chord from "../Chord";
import { Chord as ChromaticChord, Chords as ChromaticChords } from "chords/chromatic";
import { Pitches } from "pitches/alt";
import { PitchArray as CArray } from "pitches/chromatic";

export default function toChromaticChord(obj: Chord): ChromaticChord {
  const pitches = <CArray> obj.pitches.map(Pitches.toChromatic);

  return ChromaticChords.fromPitches(...pitches);
}
