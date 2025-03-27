import { MidiFiles as MF, MidiFile } from "@datune/midi";
import { midiFileToNoteTimeline } from "timelines/midi/midifile-to-notes-timeline";
import { calculateChords, newTonalApproach, TonalApproach } from "../../tonal/TonalApproach";
import { expectSample1ChordTimeline } from "./001-expect";

describe.skip("sample midi 1", () => {
  let mf: MidiFile;

  beforeAll(async () => {
    const midiPath = "../midi/tests/samples/002.mid";

    mf = await MF.load(midiPath);
  } );

  it("calculateChord", () => {
    let tonalApproach: TonalApproach;

    tonalApproach = newTonalApproach();
    tonalApproach.notesTimeline = midiFileToNoteTimeline(mf);
    calculateChords(tonalApproach);

    expectSample1ChordTimeline(tonalApproach.chordTimeline);
  } );
} );
