/* eslint-disable camelcase */
import { MINOR_THIRD, neg, PERFECT_FIFTH, PERFECT_FOURTH } from "intervals/chromatic";
import { TestInit } from "tests";
import generate from ".";
import { CHROMATIC, DIMINISHED_7th, LOCRIAN, LYDIAN, MAJOR, PHRYGIAN, Scale } from "../..";

TestInit.chromaticScale();
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
    const actual = generate( {
      interval,
      length,
      startIndex,
    } );

    expect(actual).toBe(expected);
  } );
} );
