import type { Interval } from "../Interval";
import { Intervals as I } from "..";
import { fromCents } from "../building";
import { add } from "./independentModifiers";

const { ET12_P5, ET12_SEMITONE, OCTAVE, UNISON } = I;

describe.each([
  [ET12_SEMITONE, ET12_SEMITONE, fromCents(200)],
  [ET12_SEMITONE, UNISON, ET12_SEMITONE],
  [OCTAVE, UNISON, OCTAVE],
  [ET12_P5, ET12_P5, fromCents(1400)],
])("tests", (a: Interval, b: Interval, expected: Interval): void => {
  describe(`${a} adds ${b}`, () => {
    it(`${+a} * ${+b} => ${+expected}`, (): void => {
      const actual = +a * +b;

      expect(actual).toBe(+expected);
    } );

    it(`${a} adds ${b} => ${expected}`, (): void => {
      const actual = add(a, b);

      expect(actual).toBe(expected);
    } );

    it(`associative: ${b} adds ${a} => ${expected}`, (): void => {
      const actual = add(b, a);

      expect(actual).toBe(expected);
    } );
  } );
} );
