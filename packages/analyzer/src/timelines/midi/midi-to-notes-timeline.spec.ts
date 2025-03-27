import { MidiFiles as MF } from "@datune/midi";
import { MusicalDurations as MD, Spns as N } from "@datune/core";
import { expectNoteTimeline } from "timelines/tests/note-timeline";
import { NotesTimeline } from "timelines/NotesTimeline";
import { midiFileToNoteTimeline } from "./midifile-to-notes-timeline";

describe("sample midi 1", () => {
  let nSeq: NotesTimeline;

  beforeAll(async () => {
    const midiPath = "../midi/tests/samples/001.mid";
    const mf = await MF.load(midiPath);

    nSeq = midiFileToNoteTimeline(mf);
  } );

  it("length", () => {
    expectNoteTimeline(nSeq).toHaveNodesLength(3 + 3 + 3);
  } );

  it("duration have to be a WHOLE", () => {
    expectNoteTimeline(nSeq).toHaveDuration(MD.WHOLE);
  } );

  it("chord 1 have to be 3-length", () => {
    expectNoteTimeline(nSeq).at(0)
      .toHaveSpnsLength(3);
  } );

  it("chord 1 have to be C-E-G", () => {
    expectNoteTimeline(nSeq).at(0)
      .toHaveSpns(N.C4, N.E4, N.G4);
  } );

  it("chord 2 have to be 3-length", () => {
    expectNoteTimeline(nSeq).at(MD.HALF)
      .toHaveSpnsLength(3);
  } );

  it("chord 2 have to be F-A-C", () => {
    expectNoteTimeline(nSeq).at(MD.HALF)
      .toHaveSpns(N.F4, N.A4, N.C4);
  } );

  it("chord 3 have to be 3-length", () => {
    expectNoteTimeline(nSeq).at(3 * MD.QUARTER)
      .toHaveSpnsLength(3);
  } );

  it("chord 2 have to be D-G-B", () => {
    expectNoteTimeline(nSeq).at(3 * MD.QUARTER)
      .toHaveSpns(N.G4, N.B4, N.D4);
  } );
} );
