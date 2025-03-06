import { IntervalQualities } from "@datune/core";
import { parseShortName } from "./shortName";

const { M, m } = IntervalQualities;

it("mayor", () => {
  const actual = parseShortName("M");
  const expected = M;

  expect(actual).toBe(expected);
} );

it("minor", () => {
  const actual = parseShortName("m");
  const expected = m;

  expect(actual).toBe(expected);
} );
