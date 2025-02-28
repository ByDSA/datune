import { calcCents } from "../calcs";
import type { Interval } from "../Interval";
import { CENT, ET12_QUARTER_TONE, J_QUARTER_TONE, OCTAVE, PT_COMMA, UNISON } from ".";
import { TestInit } from "tests";

TestInit.realInterval();

describe.each([
  [UNISON, 0, 1],
  [OCTAVE, 1200, 2],
  [CENT, 1, 1.0005777895065548],
  [ET12_QUARTER_TONE, 50, 1.029302236643492],
  [PT_COMMA, 23.46, 1.0136432647705078],
  [J_QUARTER_TONE, 49.98, 1.0292887029288702],
])("constants", (interval: Interval, cents: number, ratio: number) => {
  describe(`${cents}`, () => {
    it("defined", () => {
      expect(interval).toBeDefined();
    } );

    it(`cents = ${cents}`, () => {
      const actual = calcCents(interval);

      expectNumber(actual, cents);
    } );

    it(`ratio = ${ratio}`, () => {
      const actual = +interval.ratio;

      expectNumber(actual, ratio);
    } );
  } );
} );

function expectNumber(actual: number, expected: number) {
  if (expected % 1 === 0)
    expect(actual).toBe(expected);
  else
    expect(actual).toBeCloseTo(expected);
}
