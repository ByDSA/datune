import { MAJOR, MINOR } from "@datune/core/intervals/quality";
import { parseShortName } from "./shortName";

it("mayor", () => {
  const actual = parseShortName("M");
  const expected = MAJOR;

  expect(actual).toBe(expected);
} );

it("minor", () => {
  const actual = parseShortName("m");
  const expected = MINOR;

  expect(actual).toBe(expected);
} );
