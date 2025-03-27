import { MidiFiles as MF } from "@datune/midi";
import { Chords as C, MusicalDurations as MD, Pitches as P } from "@datune/core";
import { intervalBetween } from "datils/math";
import { midiFileToNoteTimeline } from "timelines/midi/midifile-to-notes-timeline";
import { expectChordTimeline } from "timelines/tests/chord-timeline";
import { calculateChords, newTonalApproach, TonalApproach } from "../../tonal/TonalApproach";

describe.skip("sample midi 012-Theme01", () => {
  let tonalApproach: TonalApproach;

  beforeAll(async () => {
    const midiPath = "../midi/tests/samples/004.mid";
    const mf = await MF.load(midiPath);

    tonalApproach = newTonalApproach();
    tonalApproach.notesTimeline = midiFileToNoteTimeline(mf, {
      offset: -MD.QUARTER,
    } );
    calculateChords(tonalApproach);
    console.log(
      JSON.stringify(
        tonalApproach.chordTimeline.nodes.slice(0, 20).map(n=> {
          return (n.interval.from + 1) + "->" + (n.interval.to + 1) + ": " + n.event.toString();
        } ),
        null,
        2,
      ),
    );
  } );

  it("intro", () => {
    expectChordTimeline(tonalApproach.chordTimeline)
      .at(0)
      .toHaveChord(C.FFm);
    expectChordTimeline(tonalApproach.chordTimeline)
      .at(1)
      .toHaveChord(C.E);
    expectChordTimeline(tonalApproach.chordTimeline)
      .at(2)
      .toHaveChord(C.D);
    expectChordTimeline(tonalApproach.chordTimeline)
      .at(3)
      .toHaveChord(C.E);

    expect(tonalApproach.chordTimeline.getAtInterval(
      intervalBetween(0, 4),
    )).toHaveLength(4);
  } );

  it("part A", () => {
    expectChordTimeline(tonalApproach.chordTimeline)
      .at(4)
      .toHavePitches(...C.FFm.pitches);
    expectChordTimeline(tonalApproach.chordTimeline)
      .at(6)
      .toHavePitches(...C.E.pitches, P.CC);
    expectChordTimeline(tonalApproach.chordTimeline)
      .at(8)
      .toHavePitches(...C.FFm.pitches);
    expectChordTimeline(tonalApproach.chordTimeline)
      .at(10)
      .toHavePitches(...C.E.pitches, P.CC);
    expectChordTimeline(tonalApproach.chordTimeline)
      .at(11.75)
      .toHavePitches(...C.E.pitches, P.A);

    const nodes = tonalApproach.chordTimeline.getAtInterval(
      intervalBetween(4, 12),
    );

    expect(nodes).toHaveLength(5);
  } );
} );
