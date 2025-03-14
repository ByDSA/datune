import { Pitches } from "@datune/core/pitches/chromatic";
import { TestInit } from "tests";
import { minDistanceBetweenPitchArrays } from "./distances";

TestInit.loadAll();

it("min distances", () => {
  const { B, C, D, E, F, G } = Pitches;
  const a1 = [C, E, G];
  const a2 = [B, D, F];
  const actual = minDistanceBetweenPitchArrays(a1, a2);
  const expected = 4; // B -> C (1), D -> C|E (2), F->E(1)

  expect(actual).toBe(expected);
} );
