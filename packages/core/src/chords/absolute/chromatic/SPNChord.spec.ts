import { SpnArray, Spns as N } from "spns/chromatic";
import { fromSpns } from "./building";

it("cache", () => {
  const notes: SpnArray = [N.C4, N.E4, N.G4];
  const actual = fromSpns(...notes);
  const actual2 = fromSpns(...notes);

  expect(actual).toBe(actual2);
} );

it("fromNotes - notes", () => {
  const notes: SpnArray = [N.C4, N.E4, N.G4];
  const actual = fromSpns(...notes);

  expect(actual.pitches).toStrictEqual(notes);
} );
