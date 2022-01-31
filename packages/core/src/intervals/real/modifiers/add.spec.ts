import { TestInit } from "tests";
import { add } from ".";
import { fromCents } from "../building";
import { ET12_PERFECT_FIFTH, ET12_SEMITONE, OCTAVE, UNISON } from "../constants";
import Interval from "../Interval";

TestInit.realInterval();
describe.each([
  [ET12_SEMITONE, ET12_SEMITONE, fromCents(200)],
  [ET12_SEMITONE, UNISON, ET12_SEMITONE],
  [OCTAVE, UNISON, OCTAVE],
  [ET12_PERFECT_FIFTH, ET12_PERFECT_FIFTH, fromCents(1400)],
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
