import { TestInit } from "tests";
import { UNISON, SECOND, THIRD, OCTAVE } from ".";

describe("initial state", () => {
  it("should be undefined", () => {
    expect(UNISON).toBeUndefined();
  } );
} );

describe("after initialization", () => {
  beforeAll(() => {
    TestInit.diatonicInterval();
  } );

  describe.each([
    [() => UNISON, 0],
    [()=>SECOND, 1],
    [()=>THIRD, 2],
    [()=>OCTAVE, 7],
  ])("constants", (getInterval, intValue) => {
    it("defined", () => {
      const interval = getInterval();

      expect(interval).toBeDefined();
    } );

    it("valueOf", () => {
      const interval = getInterval();
      const actual: number = +interval;
      const expected = intValue;

      expect(actual).toBe(expected);
    } );
  } );
} );
