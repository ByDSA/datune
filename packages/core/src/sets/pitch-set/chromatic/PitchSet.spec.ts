import { from } from "./building";
import { C5 } from "./constants";
import { Pitches } from "pitches/chromatic";
import { TestInit } from "tests";

TestInit.chromaticPitchSet();

const { C, E, G } = Pitches;

it("constants", () => {
  const noteSet1 = C5;
  const noteSet2 = from(C, G);

  expect(noteSet1).toBe(noteSet2);
} );

it("content", () => {
  expect(C5.has(C)).toBeTruthy();
  expect(C5.has(G)).toBeTruthy();
  expect(C5.has(E)).toBeFalsy();
} );
