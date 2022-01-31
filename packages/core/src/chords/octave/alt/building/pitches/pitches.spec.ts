/* eslint-disable camelcase */
import { Array as PitchArray, Bb as DA_Bb, C as DA_C, E as DA_E, F as DA_F, G as DA_G } from "pitches/alt";
import { TestInit } from "tests";
import fromPitches from ".";
import { C as DAC_C, C7 } from "../../constants";

TestInit.diatonicAltChord();
it("get from ImmutableCache", () => {
  const chord = fromPitches(
    DA_C,
    DA_E,
    DA_G,
    DA_Bb,
  );
  const expected = C7;

  expect(chord).toBe(expected);
} );

it("from array const", () => {
  const pitches: PitchArray = [DA_C, DA_E, DA_G];
  const expected = DAC_C;
  const actual = fromPitches(...pitches);

  pitches[1] = DA_F;

  expect(actual).toBe(expected);
} );
