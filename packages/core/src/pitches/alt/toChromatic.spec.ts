import { Pitches as CP } from "chromatic";
import { Pitches as P } from ".";

it("toChromatic", () => {
  const expected = CP.AA;
  const base = P.Bb;
  const actual = base.toChromatic();

  expect(actual).toBe(expected);
  expect(actual.toAlt()).toBe(P.AA);
} );

it("toChromatic reversible", () => {
  const expected = CP.AA;
  const base = P.AA;
  const actual = base.toChromatic();

  expect(actual).toBe(expected);
  expect(actual.toAlt()).toBe(base);
} );
