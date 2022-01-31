import { MAJOR } from "./constants";

it("shortName - MAJOR", () => {
  const actual = String(MAJOR);
  const expected = "M";

  expect(actual).toBe(expected);
} );
