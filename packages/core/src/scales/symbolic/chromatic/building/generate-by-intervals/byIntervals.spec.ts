/* eslint-disable camelcase */
import type { Scale } from "../..";
import { Intervals as I } from "intervals/chromatic";
import { Scales as S } from "../..";
import { generateByIntervals } from ".";

const { m3, neg, P5, P4 } = I;
// eslint-disable-next-line @typescript-eslint/naming-convention
const { CHROMATIC, DIMINISHED_7th, LOCRIAN, LYDIAN, MAJOR, PHRYGIAN } = S;

describe.each([
  [P5, 7, 0, LYDIAN],
  [neg(P5), 7, 0, LOCRIAN],
  [P5, 7, -1, MAJOR],
  [P5, 7, 1, LOCRIAN],
  [P4, 7, 0, LOCRIAN],
  [P4, 7, -1, PHRYGIAN],
  [P5, 12, -1, CHROMATIC],
  [m3, 4, -1, DIMINISHED_7th],
  [m3, 7, -1, DIMINISHED_7th],
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
