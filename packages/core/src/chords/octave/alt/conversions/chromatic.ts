import { Chord as ChromaticChord, fromPitches as CCFromNotes } from "chords/chromatic";
import { toChromatic } from "pitches/alt";
import { Array as CArray } from "pitches/chromatic";
import Chord from "../Chord";

export default function toChromaticChord(obj: Chord): ChromaticChord {
  const notes = <CArray> obj.pitches.map(toChromatic);

  return CCFromNotes(...notes);
}
