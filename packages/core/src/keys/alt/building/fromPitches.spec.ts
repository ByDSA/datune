import { Pitches as P, type PitchArray } from "alt";
import { Scales } from "scales/alt";
import { type Key, Keys } from "..";
import { fromPitches } from "./fromPitches";

type TestCase = {
  pitches: PitchArray;
  expected: Key;
};

describe.each([
  {
    pitches: [P.C, P.D, P.F, P.E, P.A, P.B, P.G],
    expected: Keys.C,
  },
  {
    pitches: [P.D, P.C, P.F, P.E, P.A, P.B, P.G],
    expected: Keys.from(P.D, Scales.DORIAN),
  },
] as TestCase[])("fromPitches", ( { pitches, expected } ) => {
  describe(`fromPitches(${pitches.join(", ")}) => ${expected}`, () => {
    const actual = fromPitches(...pitches);

    it("returns the correct key", () => {
      expect(actual).toBe(expected);
    } );

    it("should have all pitches", () => {
      expect(actual.hasPitches(...pitches)).toBeTruthy();
    } );
  } );
} );
