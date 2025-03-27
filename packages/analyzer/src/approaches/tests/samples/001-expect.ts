import { BPM, Chords as C, MusicalDurations as MD } from "@datune/core";
import { Time } from "@datune/utils";
import { ChordSequence } from "sequences";
import { expectChordSequence } from "sequences/tests/chord-sequence";

export function expectSample1ChordSequence(chordSequence: ChordSequence, bpm?: BPM) {
  function time(symTime: Time): Time {
    if (!bpm)
      return symTime;

    return bpm.getMillis(symTime);
  }
  expectChordSequence(chordSequence).toHaveNodesLength(3);
  expectChordSequence(chordSequence).toHaveDuration(time(MD.WHOLE));
  expectChordSequence(chordSequence)
    .at(time(0))
    .toHaveChord(C.C);
  expectChordSequence(chordSequence)
    .at(time(MD.QUARTER))
    .toHaveChord(C.C);
  expectChordSequence(chordSequence)
    .at(time(2 * MD.QUARTER))
    .toHaveChord(C.F.withInv(2));
  expectChordSequence(chordSequence)
    .at(time(3 * MD.QUARTER))
    .toHaveChord(C.G.withInv(2));
  expectChordSequence(chordSequence)
    .at(time(4 * MD.QUARTER))
    .toHaveChord(undefined);
}
