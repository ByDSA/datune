import { C as DAC_C, C7 } from "../../constants";
import { fromPitches } from ".";
import { PitchArray, Pitches as CPitches } from "pitches/chromatic";
import { TestInit } from "tests";

TestInit.chromaticChord();

it("get from ImmutableCache", () => {
  const chord = fromPitches(
    CPitches.C,
    CPitches.E,
    CPitches.G,
    CPitches.Bb,
  );
  const expected = C7;

  expect(chord).toBe(expected);
} );

it("from array const", () => {
  const pitches: PitchArray = [CPitches.C, CPitches.E, CPitches.G];
  const expected = DAC_C;
  const actual = fromPitches(...pitches);

  pitches[1] = CPitches.F;

  expect(actual).toBe(expected);
} );
