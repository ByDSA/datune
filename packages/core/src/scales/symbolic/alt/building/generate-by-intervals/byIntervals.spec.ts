/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { Scale } from "../../Scale";
import { Intervals as I } from "intervals/alt";
import { Scales as S } from "alt";
import { generateByIntervals } from ".";

const { AUGMENTED_TRIAD, CHROMATIC_BY_FIFTHS, DIMINISHED_7th,
  LOCRIAN, LYDIAN, MAJOR, MIXOLYDIAN, PHRYGIAN } = S;
const { M3, m3, neg, P5, P4 } = I;

describe.each([
  [P5, 7, 0, LYDIAN],
  [P5, 7, -1, MAJOR],
  [P5, 7, -2, MIXOLYDIAN],
  [P5, 7, 2, PHRYGIAN],
  [P5, 7, 1, LOCRIAN],
  [neg(P5), 7, 0, LOCRIAN],
  [P4, 7, 0, LOCRIAN],
  [P4, 7, -1, PHRYGIAN],
  [P5, 12, 0, CHROMATIC_BY_FIFTHS],
  [m3, 4, 0, DIMINISHED_7th],
  [M3, 3, 0, AUGMENTED_TRIAD],
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
