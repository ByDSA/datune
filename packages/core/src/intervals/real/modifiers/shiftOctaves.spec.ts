import type { Interval } from "../Interval";
import { from, fromCents } from "../building";
import { Intervals as I } from "..";
import { neg } from "./neg";
import { shiftOctaves } from "./shiftOctaves";
import { mult } from "./mult";

const { ET12_P5, ET12_SEMITONE, OCTAVE, UNISON } = I;

describe.each([
  [UNISON, 0, UNISON],
  [UNISON, 1, OCTAVE],
  [OCTAVE, -1, UNISON],
  [OCTAVE, 1, mult(OCTAVE, 2)],
  [UNISON, 2, mult(OCTAVE, 2)],
  [neg(OCTAVE), 1, UNISON],
  [from(1), 1, from(2)],
  [from(1), -1, from(0.5)],
  [ET12_SEMITONE, 1, fromCents(1300)],
  [ET12_P5, 1, fromCents(1900)],
  [ET12_SEMITONE, -1, fromCents(-1100)],
  [ET12_P5, -1, fromCents(-500)],
])("tests", (interval: Interval, octaves: number, expected: Interval): void => {
  describe(`${interval} + ${octaves} octaves => ${expected}`, () => {
    it(`num: ${+interval} + ${octaves} octaves => ${+expected}`, () => {
      const actual = shiftOctaves(interval, octaves);

      expect(+actual).toBe(+expected);
    } );

    it(`${interval} + ${octaves} octaves => ${expected}`, () => {
      const actual = shiftOctaves(interval, octaves);

      expect(actual).toBe(expected);
    } );

    it(`${neg(interval)} - ${octaves} octaves => ${neg(expected)}`, () => {
      const actual = shiftOctaves(neg(interval), -octaves);

      expect(actual).toBe(neg(expected));
    } );

    it(`${expected} - ${octaves} octaves => ${interval}`, () => {
      const actual = shiftOctaves(expected, -octaves);

      expect(actual).toBe(interval);
    } );
  } );
} );
