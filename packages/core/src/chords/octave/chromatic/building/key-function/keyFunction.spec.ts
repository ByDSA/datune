import { C as C_C } from "chords/chromatic";
import { I } from "functions/chromatic";
import { C as T_C } from "keys/chromatic";
import { TestInit } from "tests";
import fromKeyFunction from ".";

TestInit.chromaticChord();
TestInit.chromaticKey();
TestInit.chromaticFunction();
it("calculateChord: Key C, DegreeFunction I = Chord C", () => {
  const chord = fromKeyFunction(T_C, I);

  expect(chord).toBe(C_C);
} );
