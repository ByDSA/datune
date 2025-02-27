/* eslint-disable camelcase */
import { PitchArray, Pitches as DA } from "pitches/alt";
import { TestInit } from "tests";
import fromPitches from ".";
import { C as DAC_C, C7 } from "../../constants";

TestInit.diatonicAltChord();
it("get from ImmutableCache", () => {
  const chord = fromPitches(
    DA.C,
    DA.E,
    DA.G,
    DA.Bb,
  );
  const expected = C7;

  expect(chord).toBe(expected);
} );

it("from array const", () => {
  const pitches: PitchArray = [DA.C, DA.E, DA.G];
  const expected = DAC_C;
  const actual = fromPitches(...pitches);

  pitches[1] = DA.F;

  expect(actual).toBe(expected);
} );
