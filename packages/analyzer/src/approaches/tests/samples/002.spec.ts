import { MidiFiles as MF, MidiFile } from "@datune/midi";
import { midiFileToNoteSequence } from "sequences/midi/midifile-to-notes-sequence";
import { calculateChords, newTonalApproach, TonalApproach } from "../../tonal/TonalApproach";
import { expectSample1ChordSequence } from "./001-expect";

describe.skip("sample midi 1", () => {
  let mf: MidiFile;

  beforeAll(async () => {
    const midiPath = "../midi/tests/samples/002.mid";

    mf = await MF.load(midiPath);
  } );

  it("calculateChord", () => {
    let tonalApproach: TonalApproach;

    tonalApproach = newTonalApproach();
    tonalApproach.notesSequence = midiFileToNoteSequence(mf);
    calculateChords(tonalApproach);

    expectSample1ChordSequence(tonalApproach.chordSequence);
  } );
} );
