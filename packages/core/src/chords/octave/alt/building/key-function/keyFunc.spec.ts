import { TestInit } from "tests";
import { Chords } from "chords/alt";
import { Funcs as F } from "functions/alt";
import { Keys as K } from "keys/alt";
import { fromKeyFunc } from ".";

TestInit.diatonicAltChord();
TestInit.diatonicAltFunc();
TestInit.diatonicAltKey();

it("calculateChord: Key C, DegreeFunction I = Chord C", () => {
  const chord = fromKeyFunc(K.C, F.I);

  expect(chord).toBe(Chords.C);
} );
