import { Chords } from "chords/alt";
import { Funcs as F } from "functions/alt";
import { Keys as K } from "keys/alt";
import { fromKeyFunc } from ".";

it("calculateChord: Key C, DegreeFunction I = Chord C", () => {
  const chord = fromKeyFunc(K.C, F.I);

  expect(chord).toBe(Chords.C);
} );
