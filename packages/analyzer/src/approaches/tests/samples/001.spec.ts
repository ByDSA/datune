import { Chords } from "@datune/core";
import { MidiFile, MidiTimeline } from "@datune/midi";
import { midiFileToTimelines, midiTimelineToNotesTimeline } from "timelines/midi/midifile-to-notes-timeline";
import { sortNodesByFrom } from "approaches/utils";
import { calculateChords, newTonalApproach } from "approaches/tonal/TonalApproach";
import { loadMidiSample } from "tests/loadMidiSample";
import { symbolicTimelineToReal } from "approaches/listener/utils";
import { expectChordTimeline } from "timelines/tests/chord-timeline";
import { Analyzer } from "../../listener/ListenerAnalyzer";
import { expectSample1ChordTimeline } from "./001-expect";

describe("sample midi 1", () => {
  let timeline: MidiTimeline;
  let midiFile: MidiFile;

  beforeAll(async () => {
    midiFile = await loadMidiSample("001");

    timeline = midiFileToTimelines(midiFile).pitched!;
  } );

  it.skip("calculateChord", () => {
    const tonalApproach = newTonalApproach();

    tonalApproach.notesTimeline = midiTimelineToNotesTimeline(timeline);
    calculateChords(tonalApproach);

    expectSample1ChordTimeline(tonalApproach.chordTimeline);
  } );

  it("listener", () => {
    const notesTimelineSymbolic = timeline;
    // eslint-disable-next-line prefer-destructuring
    const { bpm } = midiFile.bpmEvents[0];
    const midiTimelineReal = symbolicTimelineToReal(notesTimelineSymbolic, bpm);
    const analyzer = new Analyzer( {
      midiTimeline: midiTimelineReal,
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

    expectChordTimeline(results.chordTimeline).toHaveDuration(bpm.getMillis(
      notesTimelineSymbolic.duration,
    ));
    expectSample1ChordTimeline(results.chordTimeline, bpm);
  } );
} );
