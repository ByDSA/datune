import { C, G } from "pitches/chromatic";
import { TestInit } from "tests";
import { from } from "../building";

TestInit.chromaticPitchSet();
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
