import { Intervals as CI } from "chromatic";
import { Degrees as D } from "alt";
import { Intervals as I } from ".";

it("toChromaticInterval", () => {
  const base = I.a7;
  const actual = base.toChromaticInterval();
  const expected = CI.P8;

  expect(actual).toBe(expected);
} );

it("toDegree", () => {
  const actual = I.a6;
  const expected = D.aVI;

  expect(actual).toBe(expected);
} );

describe.each([
  [I.d5, 6],
  [I.P5, 7],
])("valueOf", (base, expected) => {
  it("test", () => {
    const actual1 = base.valueOf();
    const actual2 = +base;

    expect(actual1).toBe(expected);
    expect(actual2).toBe(expected);
  } );
} );
