import { Intervals as I } from "diatonic";
import { bass } from "./modifiers";
import { fromRootIntervalInts } from "./building";
import { expectVoicing } from "./tests/voicing";
import { Voicings as V } from "./";

describe.each([
  [V.TRIAD, I.UNISON, fromRootIntervalInts(0, 2, 4)],
  [V.TRIAD, I.OCTAVE, fromRootIntervalInts(0, 2, 4)],
  [V.TRIAD, I.SECOND, fromRootIntervalInts(0, 6, 8, 10)],
  [V.TRIAD, I.SECOND, V.TRIAD_OVER_SECOND],
  [V.TRIAD, I.THIRD, fromRootIntervalInts(0, 5, 7, 9)],
  [V.TRIAD, I.THIRD, V.TRIAD_OVER_THIRD],
  [V.TRIAD, I.FOURTH, fromRootIntervalInts(0, 4, 6, 8)],
  [V.TRIAD, I.FOURTH, V.TRIAD_OVER_FOURTH],
  [V.TRIAD, I.FIFTH, fromRootIntervalInts(0, 3, 5, 7)],
  [V.TRIAD, I.FIFTH, V.TRIAD_OVER_FIFTH],
  [V.TRIAD, I.SIXTH, fromRootIntervalInts(0, 2, 4, 6)],
  [V.TRIAD, I.SIXTH, V.TRIAD_OVER_SIXTH],
  [V.TRIAD, I.SEVENTH, fromRootIntervalInts(0, 1, 3, 5)],
  [V.TRIAD, I.SEVENTH, V.TRIAD_OVER_SEVENTH],
])("bass tests", (v, int, expected) => {
  it("base=" + v.rootIntervals.toString() + " bass=" + (+int + 1) + " should result in " + expected.rootIntervals.toString(), () => {
    const actual = bass(v, int);

    expectVoicing(actual, expected);
  } );
} );
