import { TestInit } from "tests";
import { OCTAVE, SECOND, THIRD, UNISON } from ".";

TestInit.diatonicInterval();
describe.each([
  [UNISON, 0],
  [SECOND, 1],
  [THIRD, 2],
  [OCTAVE, 7],
])("constants", (interval, intValue) => {
  it("defined", () => {
    expect(interval).toBeDefined();
  } );

  it("valueOf", () => {
    const actual: number = +interval;
    const expected = intValue;

    expect(actual).toBe(expected);
  } );
} );
