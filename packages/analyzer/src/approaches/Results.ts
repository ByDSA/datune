import { NotesSequence, KeySequence } from "sequences";
import { ChordSequence } from "sequences/ChordSequence";

export type Results = {
  beatSequence: NotesSequence;

  chordSequence: ChordSequence;

  keySequence: KeySequence;
};
