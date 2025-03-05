import { Chords } from "chords/chromatic";
import { Funcs as F } from "functions/chromatic";
import { Keys as K } from "keys/chromatic";
import { TestInit } from "tests";
import { fromKeyFunc } from ".";

TestInit.chromaticChord();
TestInit.chromaticKey();
TestInit.chromaticFunc();

it("calculateChord: Key C, DegreeFunc I = Chord C", () => {
  const chord = fromKeyFunc(K.C, F.I);

  expect(chord).toBe(Chords.C);
} );
