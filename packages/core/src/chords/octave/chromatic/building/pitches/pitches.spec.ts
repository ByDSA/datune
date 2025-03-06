import type { PitchArray } from "pitches/chromatic";
import { Pitches as CP } from "pitches/chromatic";
import { Chords as C } from "../../";
import { fromPitches } from ".";

it("get from ImmutableCache", () => {
  const chord = fromPitches(
    CP.C,
    CP.E,
    CP.G,
    CP.Bb,
  );
  const expected = C.C7;

  expect(chord).toBe(expected);
} );

it("from array const", () => {
  const pitches: PitchArray = [CP.C, CP.E, CP.G];
  const expected = C.C;
  const actual = fromPitches(...pitches);

  pitches[1] = CP.F;

  expect(actual).toBe(expected);
} );
