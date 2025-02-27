import fromKeyFunction from ".";
import { Chords } from "chords/alt";
import { Functions as F } from "functions/alt";
import { Keys as K } from "keys/alt";
import { TestInit } from "tests";

TestInit.diatonicAltChord();
TestInit.diatonicAltFunction();
TestInit.diatonicAltKey();

it("calculateChord: Key C, DegreeFunction I = Chord C", () => {
  const chord = fromKeyFunction(K.C, F.I);

  expect(chord).toBe(Chords.C);
} );
