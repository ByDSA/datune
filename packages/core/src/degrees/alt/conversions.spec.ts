import { Degrees as D, Intervals as I } from "alt";
import { Degrees as CD } from "chromatic";

it("toChromatic", () => {
  const actual = D.aVII.toChromatic();
  const expected = CD.I;

  expect(actual).toBe(expected);
} );

it("toInterval", () => {
  const actual = D.aVII.toInterval();
  const expected = I.a7;

  expect(actual).toBe(expected);
} );
