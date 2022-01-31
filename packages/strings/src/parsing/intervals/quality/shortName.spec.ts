import { MAJOR, MINOR } from "intervals/quality";
import fromShortName from "./shortName";

it("M", () => {
  const actual = fromShortName("M");
  const expected = MAJOR;

  expect(actual).toBe(expected);
} );

it("m", () => {
  const actual = fromShortName("m");
  const expected = MINOR;

  expect(actual).toBe(expected);
} );
