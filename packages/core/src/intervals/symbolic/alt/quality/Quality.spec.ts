import { M } from "./constants";

it("shortName - MAJOR", () => {
  const actual = String(M);
  const expected = "M";

  expect(actual).toBe(expected);
} );
