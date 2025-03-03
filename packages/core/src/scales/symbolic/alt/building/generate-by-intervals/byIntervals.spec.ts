/* eslint-disable camelcase */
import { AUGMENTED_TRIAD, CHROMATIC_BY_FIFTHS, DIMINISHED_7th, LOCRIAN, LYDIAN, MAJOR, MIXOLYDIAN, PHRYGIAN } from "../../constants";
import { Scale } from "../../Scale";
import { generateByIntervals } from ".";
import { Intervals } from "intervals/alt";
import { TestInit } from "tests";

TestInit.diatonicAltScale();

describe("tests", () => {
  const { MAJOR_THIRD, MINOR_THIRD, neg, PERFECT_FIFTH, PERFECT_FOURTH } = Intervals;

  describe.each([
    [PERFECT_FIFTH, 7, 0, LYDIAN],
    [PERFECT_FIFTH, 7, -1, MAJOR],
    [PERFECT_FIFTH, 7, -2, MIXOLYDIAN],
    [PERFECT_FIFTH, 7, 2, PHRYGIAN],
    [PERFECT_FIFTH, 7, 1, LOCRIAN],
    [neg(PERFECT_FIFTH), 7, 0, LOCRIAN],
    [PERFECT_FOURTH, 7, 0, LOCRIAN],
    [PERFECT_FOURTH, 7, -1, PHRYGIAN],
    [PERFECT_FIFTH, 12, 0, CHROMATIC_BY_FIFTHS],
    [MINOR_THIRD, 4, 0, DIMINISHED_7th],
    [MAJOR_THIRD, 3, 0, AUGMENTED_TRIAD],
  ])("tests", (interval, length: number, startIndex: number, expected: Scale) => {
    it(`${String(interval)}, length=${length}, startIndex=${startIndex} => ${String(expected)}`, () => {
      const actual = generateByIntervals( {
        interval,
        length,
        startIndex,
      } );

      expect(actual).toBe(expected);
    } );
  } );
} );
