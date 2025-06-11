import { MidiFile, MidiTimeline } from "@datune/midi";
import { midiFileToTimelines, midiTimelineToNotesTimeline } from "timelines/midi/midifile-to-notes-timeline";
import { loadMidiSample } from "tests/loadMidiSample";
import { Analyzer } from "approaches/listener/ListenerAnalyzer";
import { symbolicTimelineToReal } from "approaches/listener/utils";
import { expectChordTimeline } from "timelines/tests/chord-timeline";
import { calculateChords, newTonalApproach } from "../../tonal/TonalApproach";
import { expectSample1ChordTimeline } from "./001-expect";

describe("003", () => {
  let timeline: MidiTimeline;
  let midiFile: MidiFile;

  beforeAll(async () => {
    midiFile = await loadMidiSample("003");

    timeline = midiFileToTimelines(midiFile).pitched!;
  } );

  it.skip("chord", () => {
    const tonalApproach = newTonalApproach();

    tonalApproach.notesTimeline = midiTimelineToNotesTimeline(timeline);
    calculateChords(tonalApproach);

    expectSample1ChordTimeline(tonalApproach.chordTimeline);
  } );

  it("listener", () => {
    const notesTimelineSymbolic = timeline;
    const { bpm } = midiFile.bpmEvents[0];
    const notesTimelineReal = symbolicTimelineToReal(notesTimelineSymbolic, bpm);
    const analyzer = new Analyzer( {
      midiTimeline: notesTimelineReal,
    } );
    const results = analyzer.analyze();

    expectChordTimeline(results.chordTimeline).toHaveDuration(
      bpm.getMillis(notesTimelineSymbolic.duration),
    );

    expectSample1ChordTimeline(results.chordTimeline, bpm);
  } );
} );
