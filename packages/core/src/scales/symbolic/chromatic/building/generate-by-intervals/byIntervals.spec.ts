/* eslint-disable camelcase */
import { Scales, Scale } from "../..";
import { generateByIntervals } from ".";
import { Intervals } from "intervals/chromatic";
import { TestInit } from "tests";

TestInit.chromaticScale();

describe("tests", () => {
  const { MINOR_THIRD, neg, PERFECT_FIFTH, PERFECT_FOURTH } = Intervals;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { CHROMATIC, DIMINISHED_7th, LOCRIAN, LYDIAN, MAJOR, PHRYGIAN } = Scales;

  describe.each([
    [PERFECT_FIFTH, 7, 0, LYDIAN],
    [neg(PERFECT_FIFTH), 7, 0, LOCRIAN],
    [PERFECT_FIFTH, 7, -1, MAJOR],
    [PERFECT_FIFTH, 7, 1, LOCRIAN],
    [PERFECT_FOURTH, 7, 0, LOCRIAN],
    [PERFECT_FOURTH, 7, -1, PHRYGIAN],
    [PERFECT_FIFTH, 12, -1, CHROMATIC],
    [MINOR_THIRD, 4, -1, DIMINISHED_7th],
    [MINOR_THIRD, 7, -1, DIMINISHED_7th],
  ])("tests", (interval, length: number, startIndex: number, expected: Scale) => {
    it(`${interval}, length=${length}, startIndex=${startIndex} => ${String(expected)}`, () => {
      const actual = generateByIntervals( {
        interval,
        length,
        startIndex,
      } );

      expect(actual).toBe(expected);
    } );
  } );
} );
