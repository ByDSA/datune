import { BPM, Chords as C, MusicalDurations as MD } from "@datune/core";
import { Time } from "@datune/utils";
import { expectChordTimeline } from "timelines/tests/chord-timeline";
import { ChordTimeline } from "timelines";

export function expectSample1ChordTimeline(chordTimeline: ChordTimeline, bpm?: BPM) {
  function time(symTime: Time): Time {
    if (!bpm)
      return symTime;

    return bpm.getMillis(symTime);
  }
  expectChordTimeline(chordTimeline).toHaveNodesLength(3);
  expectChordTimeline(chordTimeline).toHaveDuration(time(MD.WHOLE));
  expectChordTimeline(chordTimeline)
    .at(time(0))
    .toHaveChord(C.C);
  expectChordTimeline(chordTimeline)
    .at(time(MD.QUARTER))
    .toHaveChord(C.C);
  expectChordTimeline(chordTimeline)
    .at(time(2 * MD.QUARTER))
    .toHaveChord(C.F.withInv(2));
  expectChordTimeline(chordTimeline)
    .at(time(3 * MD.QUARTER))
    .toHaveChord(C.G.withInv(2));
  expectChordTimeline(chordTimeline)
    .at(time(4 * MD.QUARTER))
    .toHaveChord(undefined);
}
