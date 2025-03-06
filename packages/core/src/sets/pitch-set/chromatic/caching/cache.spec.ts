import { Pitches as P } from "pitches/chromatic";
import { from } from "../building";

const { C, G } = P;

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
