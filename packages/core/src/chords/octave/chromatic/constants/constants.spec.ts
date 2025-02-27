/* eslint-disable camelcase */
import { Pitches } from "pitches/chromatic";
import { TestInit } from "tests";
import { ALL, ALL_NON_INVERSIONS, C } from ".";

TestInit.chromaticChord();

it("Trying edit property notes", () => {
  const { pitches } = C;
  const t = () => {
    pitches[0] = Pitches.D;
  };

  expect(t).toThrow(TypeError);
} );

it("all", () => {
  expect(ALL.length).toBe(3468);
} );

it("all non inversions", () => {
  expect(ALL_NON_INVERSIONS.length).toBe(660);
} );
