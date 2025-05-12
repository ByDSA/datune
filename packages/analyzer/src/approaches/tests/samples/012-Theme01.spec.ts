/* eslint-disable no-mixed-operators */
import { Chords as C, Pitches as P } from "@datune/core";
import { Interval } from "datils/math";
import { MidiFile, MidiTimeline } from "@datune/midi";
import { stringifyTimelineNode } from "@datune/utils/datastructures/timeline";
import { Time } from "@datune/utils";
import { midiFileToTimelines } from "timelines/midi/midifile-to-notes-timeline";
import { expectChordTimeline } from "timelines/tests/chord-timeline";
import { loadMidiSample } from "tests/loadMidiSample";
import { Analyzer } from "approaches/listener/ListenerAnalyzer";
import { symbolicTimelineToReal } from "approaches/listener/utils";
import { sortNodesByFrom } from "approaches/utils";
import { ChordTimeline } from "timelines";

describe("004 012-Theme01", () => {
  let timeline: MidiTimeline;
  let midiFile: MidiFile;

  beforeAll(async () => {
    midiFile = await loadMidiSample("004");

    timeline = midiFileToTimelines(midiFile).pitched!;
  } );

  it("listener", async () => {
    const notesTimelineSymbolic = timeline;
    // eslint-disable-next-line prefer-destructuring
    const { bpm } = midiFile.bpmEvents[0];
    const notesTimelineReal = symbolicTimelineToReal(notesTimelineSymbolic, bpm);
    const analyzer = new Analyzer( {
      midiTimeline: notesTimelineReal,
    } );
    const results = analyzer.analyze();
    const nodes = sortNodesByFrom([...results.chordTimeline.nodes]);

    await analyzer.saveLog();
    console.log(nodes.map(n=>(((n.interval.from - 500) / 2000 + 1) + ": " + stringifyTimelineNode(n))));

    checkIntro(results.chordTimeline);
    checkPartA(results.chordTimeline);
    checkPartB(results.chordTimeline);

    expectChordTimeline(results.chordTimeline).toHaveDuration(
      bpm.getMillis(notesTimelineSymbolic.duration),
    );
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
  // 21
  expectChordTimeline(timeline).at(40500)
    .toHavePitches(
      // (5a (A) ambigua hasta 21.5. aunque dura sólo 0.25 es definitoria del acorde)
      ...C.fromPitches(P.D, P.CC, P.FF, P.A).pitches,
    );

  expect(intervalDuration(timeline.getAt(40500)!.interval)).toBe(2000);

  // 22
  expectChordTimeline(timeline).at(42500)
    .toHaveChord(
      // la 5a B no suena hasta el 22.25
      // se mantiene estable el resto del compás
      // debe corregirse de forma retrospectiva
      C.fromPitches(P.E, P.GG, P.B),
    );

  expect(intervalDuration(timeline.getAt(42500)!.interval)).toBe(2000);

  // 23
  expectChordTimeline(timeline).at(44500)
    .toHaveChord(
      // (D debería tomarse como apoyatura, no como parte del acorde)
      C.fromPitches(P.A, P.CC, P.FF),
    );

  expect(intervalDuration(timeline.getAt(44500)!.interval)).toBe(1000);

  // 23.5
  expectChordTimeline(timeline).at(45500)
    .toHaveChord(
      C.fromPitches(P.GG, P.E, P.CC),
    );

  expect(intervalDuration(timeline.getAt(45500)!.interval)).toBe(1000);

  // 24
  expectChordTimeline(timeline).at(46500)
    .toHaveChord(
      C.fromPitches(P.FF, P.A, P.CC),
    );

  expect(intervalDuration(timeline.getAt(46500)!.interval)).toBe(1000);

  // 24.5
  expectChordTimeline(timeline).at(47500)
    .toHaveChord(
      C.fromPitches(P.E, P.A, P.FF),
    );

  expect(intervalDuration(timeline.getAt(47500)!.interval)).toBe(1000);

  // 25
  expectChordTimeline(timeline).at(48500)
    .toHaveChord(
      C.fromPitches(P.D, P.A, P.CC, P.FF),
    );

  expect(intervalDuration(timeline.getAt(48500)!.interval)).toBe(2000);

  // 26
  expectChordTimeline(timeline).at(50500)
    .toHaveChord(
      C.fromPitches(P.E, P.B, P.GG),
    );

  expect(intervalDuration(timeline.getAt(50500)!.interval)).toBe(2000);

  // 27
  expectChordTimeline(timeline).at(52500)
    .toHaveChord(
      C.fromPitches(P.FF, P.CC, P.A),
    );

  expect(intervalDuration(timeline.getAt(52500)!.interval)).toBe(3000);

  // 28.5
  expectChordTimeline(timeline).at(55500)
    .toHaveChord(
      C.fromPitches(P.E, P.B, P.FF, P.A),
    );

  expect(intervalDuration(timeline.getAt(55500)!.interval)).toBe(1000);

  // 29
  expectChordTimeline(timeline).at(56500)
    .toHaveChord(
      C.fromPitches(P.D, P.A, P.FF, P.CC),
    );

  expect(intervalDuration(timeline.getAt(56500)!.interval)).toBe(2000);

  // 30
  expectChordTimeline(timeline).at(58500)
    .toHaveChord(
      C.fromPitches(P.E, P.B, P.GG),
    );

  expect(intervalDuration(timeline.getAt(58500)!.interval)).toBe(2000);

  // 31
  expectChordTimeline(timeline).at(60500)
    .toHaveChord(
      C.fromPitches(P.A, P.CC, P.E, P.FF),
    );

  expect(intervalDuration(timeline.getAt(60500)!.interval)).toBe(1000);

  // 31.5
  expectChordTimeline(timeline).at(61500)
    .toHaveChord(
      C.fromPitches(P.GG, P.CC, P.E, P.B),
    );

  expect(intervalDuration(timeline.getAt(61500)!.interval)).toBe(1000);

  // 32
  expectChordTimeline(timeline).at(62500)
    .toHaveChord(
      C.fromPitches(P.FF, P.CC, P.GG, P.A),
    );

  expect(intervalDuration(timeline.getAt(62500)!.interval)).toBe(1000);

  // 32.5
  expectChordTimeline(timeline).at(63500)
    .toHaveChord(
      C.fromPitches(P.E, P.B, P.GG),
    );

  expect(intervalDuration(timeline.getAt(63500)!.interval)).toBe(1000);

  // 33
  expectChordTimeline(timeline).at(64500)
    .toHaveChord(
      C.fromPitches(P.D, P.A, P.FF),
    );

  expect(intervalDuration(timeline.getAt(64500)!.interval)).toBe(2000);

  // 34
  expectChordTimeline(timeline).at(66500)
    .toHaveChord(
      C.fromPitches(P.E, P.B, P.GG),
    );

  expect(intervalDuration(timeline.getAt(66500)!.interval)).toBe(2000);

  // 35
  expectChordTimeline(timeline).at(68500)
    .toHaveChord(
      C.fromPitches(P.FF, P.B, P.CC),
    );

  expect(intervalDuration(timeline.getAt(68500)!.interval)).toBe(2000);

  // 36
  expectChordTimeline(timeline).at(70500)
    .toHaveChord(
      C.fromPitches(P.FF, P.CC, P.AA),
    );

  expect(intervalDuration(timeline.getAt(70500)!.interval)).toBe(2000);
}
