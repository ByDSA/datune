import { Chords as C } from "chords/chromatic";
import { Funcs as F } from "functions/chromatic";
import { Keys as K } from "keys/chromatic";
import { fromKeyFunc } from ".";

it("calculateChord: Key C, DegreeFunc I = Chord C", () => {
  const chord = fromKeyFunc(K.C, F.I);

  expect(chord).toBe(C.C);
} );
