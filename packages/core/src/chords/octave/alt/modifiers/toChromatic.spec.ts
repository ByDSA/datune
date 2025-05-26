import { Chords as CC } from "chromatic";
import { Chords as C } from "..";

it("toChromatic", () => {
  const base = C.Gbm;
  const expected = CC.FFm;
  const actual = base.toChromatic();

  expect(actual).toBe(expected);

  const expectedReverse = C.FFm;

  expect(actual.toAlt()).toBe(expectedReverse);
} );
