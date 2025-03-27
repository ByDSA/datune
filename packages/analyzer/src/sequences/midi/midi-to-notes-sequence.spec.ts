import { MidiFiles as MF } from "@datune/midi";
import { MusicalDurations as MD, Spns as N } from "@datune/core";
import { expectNoteSequence } from "sequences/tests/note-sequence";
import { NotesSequence } from "sequences/NotesSequence";
import { midiFileToNoteSequence } from "./midifile-to-notes-sequence";

describe("sample midi 1", () => {
  let nSeq: NotesSequence;

  beforeAll(async () => {
    const midiPath = "../midi/tests/samples/001.mid";
    const mf = await MF.load(midiPath);

    nSeq = midiFileToNoteSequence(mf);
  } );

  it("length", () => {
    expectNoteSequence(nSeq).toHaveNodesLength(3 + 3 + 3);
  } );

  it("duration have to be a WHOLE", () => {
    expectNoteSequence(nSeq).toHaveDuration(MD.WHOLE);
  } );

  it("chord 1 have to be 3-length", () => {
    expectNoteSequence(nSeq).at(0)
      .toHaveSpnsLength(3);
  } );

  it("chord 1 have to be C-E-G", () => {
    expectNoteSequence(nSeq).at(0)
      .toHaveSpns(N.C4, N.E4, N.G4);
  } );

  it("chord 2 have to be 3-length", () => {
    expectNoteSequence(nSeq).at(MD.HALF)
      .toHaveSpnsLength(3);
  } );

  it("chord 2 have to be F-A-C", () => {
    expectNoteSequence(nSeq).at(MD.HALF)
      .toHaveSpns(N.F4, N.A4, N.C4);
  } );

  it("chord 3 have to be 3-length", () => {
    expectNoteSequence(nSeq).at(3 * MD.QUARTER)
      .toHaveSpnsLength(3);
  } );

  it("chord 2 have to be D-G-B", () => {
    expectNoteSequence(nSeq).at(3 * MD.QUARTER)
      .toHaveSpns(N.G4, N.B4, N.D4);
  } );
} );
