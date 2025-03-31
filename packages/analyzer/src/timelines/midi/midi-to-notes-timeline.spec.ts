import { MidiFiles as MF, MidiTimeline } from "@datune/midi";
import { MusicalDurations as MD, Spns as N } from "@datune/core";
import { assertIsDefined } from "datils/datatypes/nullish";
import { expectMidiTimeline } from "timelines/tests/note-timeline";
import { midiFileToTimelines } from "./midifile-to-notes-timeline";

describe("sample midi 1", () => {
  let midiTl: MidiTimeline;

  beforeAll(async () => {
    const midiPath = "../midi/tests/samples/001.mid";
    const mf = await MF.load(midiPath);

    midiTl = midiFileToTimelines(mf).pitched!;

    assertIsDefined(midiTl);
  } );

  it("length", () => {
    expectMidiTimeline(midiTl).toHaveNodesLength(3 + 3 + 3);
  } );

  it("duration have to be a WHOLE", () => {
    expectMidiTimeline(midiTl).toHaveDuration(MD.WHOLE);
  } );

  it("chord 1 have to be 3-length", () => {
    expectMidiTimeline(midiTl).at(0)
      .toHaveSpnsLength(3);
  } );

  it("chord 1 have to be C-E-G", () => {
    expectMidiTimeline(midiTl).at(0)
      .toHaveSpns(N.C4, N.E4, N.G4);
  } );

  it("chord 2 have to be 3-length", () => {
    expectMidiTimeline(midiTl).at(MD.HALF)
      .toHaveSpnsLength(3);
  } );

  it("chord 2 have to be F-A-C", () => {
    expectMidiTimeline(midiTl).at(MD.HALF)
      .toHaveSpns(N.F4, N.A4, N.C4);
  } );

  it("chord 3 have to be 3-length", () => {
    expectMidiTimeline(midiTl).at(3 * MD.QUARTER)
      .toHaveSpnsLength(3);
  } );

  it("chord 2 have to be D-G-B", () => {
    expectMidiTimeline(midiTl).at(3 * MD.QUARTER)
      .toHaveSpns(N.G4, N.B4, N.D4);
  } );
} );
