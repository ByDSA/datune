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
  const base = I.a7;
  const actual = base.toDegree();
  const expected = D.aVII;

  expect(actual).toBe(expected);
} );
