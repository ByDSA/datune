import { from } from "../building";
import { Pitches } from "pitches/chromatic";
import { TestInit } from "tests";

TestInit.chromaticPitchSet();

const { C, G } = Pitches;

it("cache works correctly", () => {
  const noteSet1 = from(C, G);
  const noteSet2 = from(C, G);

  expect(noteSet1).toBe(noteSet2);
} );

it("no matter order", () => {
  const noteSet1 = from(C, G);
  const noteSet2 = from(G, C);

  expect(noteSet1).toBe(noteSet2);
} );
