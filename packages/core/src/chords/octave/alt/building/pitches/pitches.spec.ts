import type { PitchArray } from "pitches/alt";
import { Pitches as P } from "pitches/alt";
import { Chords as C } from "alt";
import { PitchSets } from "sets/pitch-set/alt";
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

it("two chords with same pitches, same bass and same root should be the same (independent of order)", () => {
  const chord1 = C.fromPitches(P.C, P.D, P.G);
  const chord2 = C.fromPitches(P.C, P.G, P.D);

  expect(chord1).toBe(chord2);
} );

it("should throw error trying to create a chord with empty pitch set", () => {
  expect(() => {
    C.from( {
      pitchSet: PitchSets.EMPTY,
      root: P.C,
      bass: P.D,
    } );
  } ).toThrow();
} );
