import { TestInit } from "tests";
import { CENT, ET12_QUARTER_TONE, J_QUARTER_TONE, OCTAVE, PT_COMMA, UNISON } from ".";
import { calcCents } from "../calcs";
import RealInterval from "../Interval";

TestInit.realInterval();

describe.each([
  [UNISON, 0, 1],
  [OCTAVE, 1200, 2],
  [CENT, 1, 1.0005777895065548],
  [ET12_QUARTER_TONE, 50, 1.029302236643492],
  [PT_COMMA, 23.46, 1.0136432647705078],
  [J_QUARTER_TONE, 49.98, 1.0292887029288702],
])("constants", (interval: RealInterval, cents: number, ratio: number) => {
  describe(`${cents}`, () => {
    it("defined", () => {
      expect(interval).toBeDefined();
    } );
    it(`cents = ${cents}`, () => {
      const actual = calcCents(interval);

      if (cents % 1 === 0)
        expect(actual).toBe(cents);
      else
        expect(actual).toBeCloseTo(cents);
    } );

    it(`ratio = ${ratio}`, () => {
      const actual = +interval.ratio;

      if (ratio % 1 === 0)
        expect(actual).toBe(ratio);
      else
        expect(actual).toBeCloseTo(ratio);
    } );
  } );
} );
