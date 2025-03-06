import { SPNArray, SPNs } from "spns/chromatic";
import { fromSPNs } from "./building";

it("cache", () => {
  const notes: SPNArray = [SPNs.C4, SPNs.E4, SPNs.G4];
  const actual = fromSPNs(...notes);
  const actual2 = fromSPNs(...notes);

  expect(actual).toBe(actual2);
} );

it("fromNotes - notes", () => {
  const notes: SPNArray = [SPNs.C4, SPNs.E4, SPNs.G4];
  const actual = fromSPNs(...notes);

  expect(actual.pitches).toStrictEqual(notes);
} );
