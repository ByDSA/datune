import type { PitchArray } from "pitches/alt";
import { Pitches as P } from "pitches/alt";
import { TestInit } from "tests";
import { C as AC_C, C7 } from "../../constants";
import { fromPitches } from ".";

TestInit.diatonicAltChord();

it("get from ImmutableCache", () => {
  const chord = fromPitches(
    P.C,
    P.E,
    P.G,
    P.Bb,
  );
  const expected = C7;

  expect(chord).toBe(expected);
} );

it("from array const", () => {
  const pitches: PitchArray = [P.C, P.E, P.G];
  const expected = AC_C;
  const actual = fromPitches(...pitches);

  pitches[1] = P.F;

  expect(actual).toBe(expected);
} );
