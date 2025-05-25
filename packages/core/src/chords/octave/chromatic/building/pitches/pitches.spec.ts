import type { PitchArray } from "pitches/chromatic";
import { Pitches as CP } from "pitches/chromatic";
import { PitchSets as PS } from "sets/pitch-set/chromatic";
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

it("two chords with same pitches, same bass and same root should be the same (independent of order)", () => {
  const chord1 = C.fromPitches(CP.C, CP.E, CP.G);
  const chord2 = C.fromPitches(CP.C, CP.G, CP.E);

  expect(chord1).toBe(chord2);
} );

it("should throw error trying to create a chord with empty pitch set", () => {
  expect(() => {
    C.from( {
      pitchSet: PS.EMPTY,
      root: CP.C,
      bass: CP.E,
    } );
  } ).toThrow();
} );
