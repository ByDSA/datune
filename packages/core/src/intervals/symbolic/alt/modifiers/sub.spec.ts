import { Intervals as I, type Interval } from "..";
import { expectInterval } from "../tests/interval";
import { sub } from "./sub";
import { neg } from "./neg";
import { TestInit } from "tests";

TestInit.diatonicAltInterval();

describe("tests", () => {
  describe.each([
    [I.PERFECT_FIFTH, I.PERFECT_FIFTH, I.PERFECT_UNISON],
    [I.PERFECT_FIFTH, I.MAJOR_THIRD, I.MINOR_THIRD],
    [I.PERFECT_FIFTH, I.MINOR_THIRD, I.MAJOR_THIRD],
    [I.PERFECT_UNISON, I.MINOR_THIRD, neg(I.MINOR_THIRD)],
    [I.PERFECT_UNISON, I.PERFECT_OCTAVE, neg(I.PERFECT_OCTAVE)],
    [I.PERFECT_UNISON, I.AUGMENTED_OCTAVE, neg(I.AUGMENTED_OCTAVE)],
    [I.PERFECT_FIFTH, I.AUGMENTED_FIFTH, neg(I.AUGMENTED_UNISON)],
    [I.AUGMENTED_FIFTH, I.PERFECT_FIFTH, I.AUGMENTED_UNISON],
    [I.PERFECT_UNISON, I.DIMINISHED_OCTAVE, neg(I.DIMINISHED_OCTAVE)],
    [I.PERFECT_OCTAVE, I.AUGMENTED_OCTAVE, neg(I.AUGMENTED_UNISON)],
  ])("test", (a, b, expected) => {
    it(a.toString() + " - " + b.toString() + " should be " + expected.toString(), () => {
      const actual = sub(a, b);

      expect(actual).not.toBeNull();

      expectInterval(actual as Interval, expected);
    } );
  } );
} );
