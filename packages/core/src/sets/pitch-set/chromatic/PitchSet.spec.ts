import { Pitches as P } from "pitches/chromatic";
import { from } from "./building";
import { PitchSets as PS } from ".";

const { C, E, G } = P;

it("constants", () => {
  const noteSet1 = PS.C5;
  const noteSet2 = from(C, G);

  expect(noteSet1).toBe(noteSet2);
} );

it("content", () => {
  expect(PS.C5.has(C)).toBeTruthy();
  expect(PS.C5.has(G)).toBeTruthy();
  expect(PS.C5.has(E)).toBeFalsy();
} );
