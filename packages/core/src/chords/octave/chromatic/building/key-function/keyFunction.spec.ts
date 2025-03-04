import { Chords } from "chords/chromatic";
import { Functions as F } from "functions/chromatic";
import { Keys as K } from "keys/chromatic";
import { TestInit } from "tests";
import { fromKeyFunction } from ".";

TestInit.chromaticChord();
TestInit.chromaticKey();
TestInit.chromaticFunction();

it("calculateChord: Key C, DegreeFunction I = Chord C", () => {
  const chord = fromKeyFunction(K.C, F.I);

  expect(chord).toBe(Chords.C);
} );
