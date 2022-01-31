import { Array as SPNArray, C4, E4, G4 } from "spns/chromatic";
import { TestInit } from "tests";
import { fromSPNs } from "./building";

TestInit.chromaticSPN();
TestInit.chromaticVoicing();
it("cache", () => {
  const notes: SPNArray = [C4, E4, G4];
  const actual = fromSPNs(...notes);
  const actual2 = fromSPNs(...notes);

  expect(actual).toBe(actual2);
} );

it("fromNotes - notes", () => {
  const notes: SPNArray = [C4, E4, G4];
  const actual = fromSPNs(...notes);

  expect(actual.pitches).toStrictEqual(notes);
} );
