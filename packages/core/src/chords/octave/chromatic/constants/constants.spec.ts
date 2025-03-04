import { Pitches } from "pitches/chromatic";
import { TestInit } from "tests";
import { ALL, ALL_NON_INVERSIONS, C } from ".";

TestInit.chromaticChord();

it("trying edit property notes", () => {
  const { pitches } = C;
  const t = () => {
    pitches[0] = Pitches.D;
  };

  expect(t).toThrow(TypeError);
} );

it("all", () => {
  expect(ALL).toHaveLength(3468);
} );

it("all non inversions", () => {
  expect(ALL_NON_INVERSIONS).toHaveLength(660);
} );
