import { B, C, D, E, F, G } from "pitches/chromatic";
import { TestInit } from "tests";
import { minDistanceBetweenArraysOfNotes } from "./Distances";

TestInit.loadAll();
it("min distances", () => {
  const a1 = [C, E, G];
  const a2 = [B, D, F];
  const actual = minDistanceBetweenArraysOfNotes(a1, a2);
  const expected = 4;

  expect(actual).toBe(expected);
} );
