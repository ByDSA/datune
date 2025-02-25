/* eslint-disable camelcase */
import { D as P_D } from "pitches/chromatic";
import { TestInit } from "tests";
import { ALL, ALL_NON_INVERSIONS, C } from ".";

TestInit.chromaticChord();

it("Trying edit property notes", () => {
  const { pitches } = C;
  const t = () => {
    pitches[0] = P_D;
  };

  expect(t).toThrow(TypeError);
} );

it("all", () => {
  expect(ALL.length).toBe(3468);
} );

it("all non inversions", () => {
  expect(ALL_NON_INVERSIONS.length).toBe(660);
} );
