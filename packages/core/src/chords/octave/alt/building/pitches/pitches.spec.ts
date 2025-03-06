import type { PitchArray } from "pitches/alt";
import { Pitches as P } from "pitches/alt";
import { Chords as C } from "alt";
import { fromPitches } from ".";

it("get from ImmutableCache", () => {
  const chord = fromPitches(
    P.C,
    P.E,
    P.G,
    P.Bb,
  );
  const expected = C.C7;

  expect(chord).toBe(expected);
} );

it("from array const", () => {
  const pitches: PitchArray = [P.C, P.E, P.G];
  const expected = C.C;
  const actual = fromPitches(...pitches);

  pitches[1] = P.F;

  expect(actual).toBe(expected);
} );
