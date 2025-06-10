import { Intervals as I } from "..";

describe("after initialization", () => {
  const { SECOND, THIRD, OCTAVE, UNISON } = I;

  describe.each([
    [UNISON, 0],
    [SECOND, 1],
    [SECOND.withNeg(), -1],
    [THIRD, 2],
    [THIRD.withNeg(), -2],
    [OCTAVE, 7],
    [OCTAVE.withNeg(), -7],
  ])("constants", (interval, intValue) => {
    describe(`${interval}`, () => {
      it("should be defined", () => {
        expect(interval).toBeDefined();
      } );

      it("should valueOf to be " + intValue, () => {
        const actual: number = +interval;
        const expected = intValue;

        expect(actual).toBe(expected);
      } );

      it("should magnitude to be " + Math.abs(intValue), () => {
        const actual: number = interval.magnitude;
        const expected = Math.abs(intValue);

        expect(actual).toBe(expected);
      } );
    } );
  } );
} );
