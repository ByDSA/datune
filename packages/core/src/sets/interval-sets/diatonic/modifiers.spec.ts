import { Intervals as I } from "diatonic";
import { bass } from "./modifiers";
import { fromRootIntervalsMagnitude } from "./building";
import { expectIntervalSet } from "./tests/interval-set";
import { IntervalSets as IS } from ".";

describe.each([
  [IS.TRIAD, I.UNISON, fromRootIntervalsMagnitude(0, 2, 4)],
  [IS.TRIAD, I.OCTAVE, fromRootIntervalsMagnitude(0, 2, 4)],
  [IS.TRIAD, I.SECOND, fromRootIntervalsMagnitude(0, 6, 8, 10)],
  [IS.TRIAD, I.SECOND, IS.TRIAD_OVER_SECOND],
  [IS.TRIAD, I.THIRD, fromRootIntervalsMagnitude(0, 5, 7, 9)],
  [IS.TRIAD, I.THIRD, IS.TRIAD_OVER_THIRD],
  [IS.TRIAD, I.FOURTH, fromRootIntervalsMagnitude(0, 4, 6, 8)],
  [IS.TRIAD, I.FOURTH, IS.TRIAD_OVER_FOURTH],
  [IS.TRIAD, I.FIFTH, fromRootIntervalsMagnitude(0, 3, 5, 7)],
  [IS.TRIAD, I.FIFTH, IS.TRIAD_OVER_FIFTH],
  [IS.TRIAD, I.SIXTH, fromRootIntervalsMagnitude(0, 2, 4, 6)],
  [IS.TRIAD, I.SIXTH, IS.TRIAD_OVER_SIXTH],
  [IS.TRIAD, I.SEVENTH, fromRootIntervalsMagnitude(0, 1, 3, 5)],
  [IS.TRIAD, I.SEVENTH, IS.TRIAD_OVER_SEVENTH],
])("bass tests", (v, int, expected) => {
  it("base=" + v.rootIntervals.toString() + " bass=" + (+int + 1) + " should result in " + expected.rootIntervals.toString(), () => {
    const actual = bass(v, int);

    expectIntervalSet(actual, expected);
  } );
} );
