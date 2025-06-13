import { Chords as CC } from "chromatic";
import { Chords as C } from "..";

it("toChromaticChord", () => {
  const base = C.Gbm;
  const expected = CC.FFm;
  const actual = base.toChromaticChord();

  expect(actual).toBe(expected);

  const expectedReverse = C.FFm;

  expect(actual.toAltChord()).toBe(expectedReverse);
} );
