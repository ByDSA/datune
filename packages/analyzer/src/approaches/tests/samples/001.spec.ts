import { MidiFiles as MF } from "@datune/midi";
import { BPM, Chords } from "@datune/core";
import { MidiFile } from "@datune/midi";
import { midiFileToNoteSequence } from "sequences/midi/midifile-to-notes-sequence";
import { NotesSequence } from "sequences/NotesSequence";
import { sortNodesByFrom } from "approaches/utils";
import { calculateChords, newTonalApproach } from "approaches/tonal/TonalApproach";
import { Analyzer } from "../../listener/ListenerAnalyzer";
import { expectSample1ChordSequence } from "./001-expect";

describe("sample midi 1", () => {
  let midiFile: MidiFile;

  beforeAll(async () => {
    const midiPath = "../midi/tests/samples/001.mid";

    midiFile = await MF.load(midiPath);
  } );

  it.skip("calculateChord", () => {
    const tonalApproach = newTonalApproach();

    tonalApproach.notesSequence = midiFileToNoteSequence(midiFile);
    calculateChords(tonalApproach);

    expectSample1ChordSequence(tonalApproach.chordSequence);
  } );

  it("test", () => {
    const notesSequenceSymbolic = midiFileToNoteSequence(midiFile);
    // eslint-disable-next-line prefer-destructuring
    const { bpm } = midiFile.bpmEvents[0];
    const notesSequenceReal = symbolicSequenceToReal(notesSequenceSymbolic, bpm);
    const analyzer = new Analyzer( {
      notesSequence: notesSequenceReal,
    } );
    const results = analyzer.analyze();
    const beatNodes = sortNodesByFrom(results.beatSequence.nodes);

    expect(beatNodes).toHaveLength(4);
    expect(beatNodes[0].interval.from).toBe(0);
    expect(beatNodes[1].interval.from).toBe(500);
    expect(beatNodes[2].interval.from).toBe(1000);
    expect(beatNodes[3].interval.from).toBe(1500);

    const chordNodes = results.chordSequence.nodes;

    expect(results.chordSequence.nodes).toHaveLength(3);
    expect(chordNodes[0].interval.from).toBe(0);
    expect(chordNodes[0].interval.to).toBe(1000);
    expect(chordNodes[0].event).toBe(Chords.C);

    expectSample1ChordSequence(results.chordSequence, bpm);
  } );
} );

function symbolicSequenceToReal(notesSequenceSymbolic: NotesSequence, bpm: BPM): NotesSequence {
  const notesSequenceReal = new NotesSequence( {
    startTime: bpm.getMillis(notesSequenceSymbolic.startTime),
    cellSize: bpm.getMillis(notesSequenceSymbolic.cellSize),
  } );

  for (const n of notesSequenceSymbolic.nodes) {
    notesSequenceReal.add( {
      event: n.event,
      interval: {
        ...n.interval,
        from: bpm.getMillis(n.interval.from),
        to: bpm.getMillis(n.interval.to),
      },
    } );
  }

  return notesSequenceReal;
}
