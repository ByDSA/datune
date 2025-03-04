import { PitchArray, Pitches as CP } from "pitches/chromatic";
import { TestInit } from "tests";
import { C as AC_C, C7 } from "../../constants";
import { fromPitches } from ".";

TestInit.chromaticChord();

it("get from ImmutableCache", () => {
  const chord = fromPitches(
    CP.C,
    CP.E,
    CP.G,
    CP.Bb,
  );
  const expected = C7;

  expect(chord).toBe(expected);
} );

it("from array const", () => {
  const pitches: PitchArray = [CP.C, CP.E, CP.G];
  const expected = AC_C;
  const actual = fromPitches(...pitches);

  pitches[1] = CP.F;

  expect(actual).toBe(expected);
} );
