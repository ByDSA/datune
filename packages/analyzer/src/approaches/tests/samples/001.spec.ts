import { MidiFiles as MF } from "@datune/midi";
import { BPM, Chords } from "@datune/core";
import { MidiFile } from "@datune/midi";
import { NotesTimeline } from "timelines/NotesTimeline";
import { midiFileToNoteTimeline } from "timelines/midi/midifile-to-notes-timeline";
import { sortNodesByFrom } from "approaches/utils";
import { calculateChords, newTonalApproach } from "approaches/tonal/TonalApproach";
import { Analyzer } from "../../listener/ListenerAnalyzer";
import { expectSample1ChordTimeline } from "./001-expect";

describe("sample midi 1", () => {
  let midiFile: MidiFile;

  beforeAll(async () => {
    const midiPath = "../midi/tests/samples/001.mid";

    midiFile = await MF.load(midiPath);
  } );

  it.skip("calculateChord", () => {
    const tonalApproach = newTonalApproach();

    tonalApproach.notesTimeline = midiFileToNoteTimeline(midiFile);
    calculateChords(tonalApproach);

    expectSample1ChordTimeline(tonalApproach.chordTimeline);
  } );

  it("test", () => {
    const notesTimelineSymbolic = midiFileToNoteTimeline(midiFile);
    // eslint-disable-next-line prefer-destructuring
    const { bpm } = midiFile.bpmEvents[0];
    const notesTimelineReal = symbolicTimelineToReal(notesTimelineSymbolic, bpm);
    const analyzer = new Analyzer( {
      notesTimeline: notesTimelineReal,
    } );
    const results = analyzer.analyze();
    const beatNodes = sortNodesByFrom(results.beatTimeline.nodes);

    expect(beatNodes).toHaveLength(4);
    expect(beatNodes[0].interval.from).toBe(0);
    expect(beatNodes[1].interval.from).toBe(500);
    expect(beatNodes[2].interval.from).toBe(1000);
    expect(beatNodes[3].interval.from).toBe(1500);

    const chordNodes = results.chordTimeline.nodes;

    expect(results.chordTimeline.nodes).toHaveLength(3);
    expect(chordNodes[0].interval.from).toBe(0);
    expect(chordNodes[0].interval.to).toBe(1000);
    expect(chordNodes[0].event).toBe(Chords.C);

    expectSample1ChordTimeline(results.chordTimeline, bpm);
  } );
} );

function symbolicTimelineToReal(notesTimelineSymbolic: NotesTimeline, bpm: BPM): NotesTimeline {
  const notesTimelineReal = new NotesTimeline( {
    startTime: bpm.getMillis(notesTimelineSymbolic.startTime),
    cellSize: bpm.getMillis(notesTimelineSymbolic.cellSize),
  } );

  for (const n of notesTimelineSymbolic.nodes) {
    notesTimelineReal.add( {
      event: n.event,
      interval: {
        ...n.interval,
        from: bpm.getMillis(n.interval.from),
        to: bpm.getMillis(n.interval.to),
      },
    } );
  }

  return notesTimelineReal;
}
