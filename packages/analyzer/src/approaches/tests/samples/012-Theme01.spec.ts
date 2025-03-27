import { MidiFiles as MF } from "@datune/midi";
import { Chords as C, MusicalDurations as MD, Pitches as P } from "@datune/core";
import { expectChordSequence } from "sequences/tests/chord-sequence";
import { midiFileToNoteSequence } from "sequences/midi/midifile-to-notes-sequence";
import { calculateChords, newTonalApproach, TonalApproach } from "../../tonal/TonalApproach";

describe.skip("sample midi 012-Theme01", () => {
  let tonalApproach: TonalApproach;

  beforeAll(async () => {
    const midiPath = "../midi/tests/samples/004.mid";
    const mf = await MF.load(midiPath);

    tonalApproach = newTonalApproach();
    tonalApproach.notesSequence = midiFileToNoteSequence(mf, {
      offset: -MD.QUARTER,
    } );
    calculateChords(tonalApproach);
    console.log(
      JSON.stringify(
        tonalApproach.chordSequence.nodes.slice(0, 20).map(n=> {
          return (n.interval.from + 1) + "->" + (n.interval.to + 1) + ": " + n.event.toString();
        } ),
        null,
        2,
      ),
    );
  } );

  it("intro", () => {
    expectChordSequence(tonalApproach.chordSequence)
      .at(0)
      .toHaveChord(C.FFm);
    expectChordSequence(tonalApproach.chordSequence)
      .at(1)
      .toHaveChord(C.E);
    expectChordSequence(tonalApproach.chordSequence)
      .at(2)
      .toHaveChord(C.D);
    expectChordSequence(tonalApproach.chordSequence)
      .at(3)
      .toHaveChord(C.E);

    expect(tonalApproach.chordSequence.get( {
      from: 0,
      to: 4,
    } )).toHaveLength(4);
  } );

  it("part A", () => {
    expectChordSequence(tonalApproach.chordSequence)
      .at(4)
      .toHavePitches(...C.FFm.pitches);
    expectChordSequence(tonalApproach.chordSequence)
      .at(6)
      .toHavePitches(...C.E.pitches, P.CC);
    expectChordSequence(tonalApproach.chordSequence)
      .at(8)
      .toHavePitches(...C.FFm.pitches);
    expectChordSequence(tonalApproach.chordSequence)
      .at(10)
      .toHavePitches(...C.E.pitches, P.CC);
    expectChordSequence(tonalApproach.chordSequence)
      .at(11.75)
      .toHavePitches(...C.E.pitches, P.A);

    const nodes = tonalApproach.chordSequence.get( {
      from: 4,
      to: 12,
    } );

    expect(nodes).toHaveLength(5);
  } );
} );
