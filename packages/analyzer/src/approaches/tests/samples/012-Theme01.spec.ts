/* eslint-disable no-mixed-operators */
import { Chords as C, MusicalDurations as MD, Pitches as P } from "@datune/core";
import { Interval, intervalBetween } from "datils/math";
import { MidiFile, MidiTimeline } from "@datune/midi";
import { stringifyTimelineNode } from "@datune/utils/datastructures/timeline";
import { Time } from "@datune/utils";
import { midiFileToTimelines, midiTimelineToNotesTimeline } from "timelines/midi/midifile-to-notes-timeline";
import { expectChordTimeline } from "timelines/tests/chord-timeline";
import { loadMidiSample } from "tests/loadMidiSample";
import { Analyzer } from "approaches/listener/ListenerAnalyzer";
import { symbolicTimelineToReal } from "approaches/listener/utils";
import { sortNodesByFrom } from "approaches/utils";
import { ChordTimeline } from "timelines";
import { calculateChords, newTonalApproach, TonalApproach } from "../../tonal/TonalApproach";

describe("004 012-Theme01", () => {
  let timeline: MidiTimeline;
  let midiFile: MidiFile;

  beforeAll(async () => {
    midiFile = await loadMidiSample("004");

    timeline = midiFileToTimelines(midiFile).pitched!;
  } );

  describe.skip("calculateChord", ()=> {
    let tonalApproach: TonalApproach;

    beforeAll(() => {
      tonalApproach = newTonalApproach();
      const midiOffsetTl = new MidiTimeline();

      midiOffsetTl.addTimeline(timeline, -MD.QUARTER);
      tonalApproach.notesTimeline = midiTimelineToNotesTimeline(midiOffsetTl);
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
      )).toBe(4);
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

      expect(nodes).toBe(5);
    } );
  } );

  it("listener", () => {
    const notesTimelineSymbolic = timeline;
    // eslint-disable-next-line prefer-destructuring
    const { bpm } = midiFile.bpmEvents[0];
    const notesTimelineReal = symbolicTimelineToReal(notesTimelineSymbolic, bpm);
    const analyzer = new Analyzer( {
      midiTimeline: notesTimelineReal,
    } );
    const results = analyzer.analyze();

    expectChordTimeline(results.chordTimeline).toHaveDuration(
      bpm.getMillis(notesTimelineSymbolic.duration),
    );

    const nodes = sortNodesByFrom([...results.chordTimeline.nodes]);

    analyzer.showLog();
    console.log(nodes.map(n=>(((n.interval.from - 500) / 2000 + 1) + ": " + stringifyTimelineNode(n))));

    checkIntro(results.chordTimeline);
    checkPartA(results.chordTimeline);
    checkPartB(results.chordTimeline);
  } );
} );

function intervalDuration(interval: Interval<Time>): number {
  return interval.to - interval.from;
}

function checkIntro(timeline: ChordTimeline) {
  expectChordTimeline(timeline).at(500)
    .toHaveChord(
      C.fromPitches(P.FF, P.A, P.CC),
    );

  expect(intervalDuration(timeline.getAt(500)!.interval)).toBe(2000);

  expectChordTimeline(timeline).at(2500)
    .toHaveChord(
      C.fromPitches(P.E, P.GG, P.B, P.FF),
    );

  expect(intervalDuration(timeline.getAt(2500)!.interval)).toBe(2000);

  expectChordTimeline(timeline).at(4500)
    .toHaveChord(
      C.fromPitches(P.D, P.FF, P.A),
    );

  expect(intervalDuration(timeline.getAt(4500)!.interval)).toBe(2000);

  expectChordTimeline(timeline).at(6500)
    .toHaveChord(
      C.fromPitches(P.E, P.GG, P.B, P.FF),
    );

  expect(intervalDuration(timeline.getAt(6500)!.interval)).toBe(2000);
}

function checkPartA(timeline: ChordTimeline) {
  expectChordTimeline(timeline).at(8500)
    .toHaveChord(
      C.fromPitches(P.FF, P.CC, P.A),
    );

  expect(intervalDuration(timeline.getAt(8500)!.interval)).toBe(4000);

  expectChordTimeline(timeline).at(12500)
    .toHaveChord(
      // (-C# encima de B, probablemente apantallado)
      C.fromPitches(P.E, P.B, P.GG),
    );

  expect(intervalDuration(timeline.getAt(12500)!.interval)).toBe(4000);

  expectChordTimeline(timeline).at(16500)
    .toHaveChord(
      C.fromPitches(P.FF, P.CC, P.A),
    );

  expect(intervalDuration(timeline.getAt(16500)!.interval)).toBe(4000);

  expectChordTimeline(timeline).at(20500)
    .toHaveChord(
      // (C# de una octava superior)
      C.fromPitches(P.E, P.B, P.GG, P.CC),
    );

  expect(intervalDuration(timeline.getAt(20500)!.interval)).toBe(4000);

  expectChordTimeline(timeline).at(24500)
    .toHaveChord(
      C.fromPitches(P.D, P.A, P.FF),
    );

  expect(intervalDuration(timeline.getAt(24500)!.interval)).toBe(2000);

  expectChordTimeline(timeline).at(26500)
    .toHaveChord(
      C.fromPitches(P.E, P.B, P.GG),
    );

  expect(intervalDuration(timeline.getAt(26500)!.interval)).toBe(2000);

  expectChordTimeline(timeline).at(28500)
    .toHaveChord(
      // (E5 es nota de paso y se apantalla con F#5)
      C.fromPitches(P.FF, P.CC, P.A),
    );

  expect(intervalDuration(timeline.getAt(28500)!.interval)).toBe(1000);

  expectChordTimeline(timeline).at(29500)
    .toHaveChord(
      C.fromPitches(P.E, P.B, P.GG),
    );

  expect(intervalDuration(timeline.getAt(29500)!.interval)).toBe(1000);

  expectChordTimeline(timeline).at(30500)
    .toHaveChord(
      // (-C#5, bajo D5, probablemente apantallado)
      C.fromPitches(P.D, P.A, P.FF),
    );

  expect(intervalDuration(timeline.getAt(30500)!.interval)).toBe(1500);

  expectChordTimeline(timeline).at(32000)
    .toHaveChord(
      // (-B, -E)
      C.fromPitches(P.CC, P.GG, P.FF),
    );

  expect(intervalDuration(timeline.getAt(32000)!.interval)).toBe(500);

  expectChordTimeline(timeline).at(32500)
    .toHaveChord(
      C.fromPitches(P.D, P.A, P.FF),
    );

  expect(intervalDuration(timeline.getAt(32500)!.interval)).toBe(2000);

  expectChordTimeline(timeline).at(34500)
    .toHaveChord(
      C.fromPitches(P.E, P.B, P.GG),
    );

  expect(intervalDuration(timeline.getAt(34500)!.interval)).toBe(2000);

  expectChordTimeline(timeline).at(36500)
    .toHaveChord(
      // (-E5)
      C.fromPitches(P.FF, P.CC, P.A),
    );

  expect(intervalDuration(timeline.getAt(36500)!.interval)).toBe(4000);
}

function checkPartB(timeline: ChordTimeline) {
  expectChordTimeline(timeline).at(40500)
    .toHaveChord(
      C.fromPitches(P.D, P.CC, P.FF),
    );

  expect(intervalDuration(timeline.getAt(40500)!.interval)).toBe(2000);

  expectChordTimeline(timeline).at(42500)
    .toHaveChord(
      // el B no suena hasta el 3º tiempo
      // debe corregirse de forma retrospectiva
      C.fromPitches(P.E, P.GG, P.B),
    );

  expect(intervalDuration(timeline.getAt(42500)!.interval)).toBe(6000);
}
