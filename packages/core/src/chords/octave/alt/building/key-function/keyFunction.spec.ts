import { C as DAC_C } from "chords/alt";
import { I } from "functions/alt";
import { C } from "keys/alt";
import { TestInit } from "tests";
import fromKeyFunction from ".";

TestInit.diatonicAltChord();
TestInit.diatonicAltFunction();
TestInit.diatonicAltKey();
it("calculateChord: Key C, DegreeFunction I = Chord C", () => {
  const chord = fromKeyFunction(C, I);

  expect(chord).toBe(DAC_C);
} );
