import { C } from "../constants";
import { rootChord4 } from "./rootChord4";
import { Chords } from "chords/chromatic";
import { TestInit } from "tests";

TestInit.chromaticKey();
TestInit.chromaticVoicing();
TestInit.chromaticChord();

it("rootChord4: C -> CMaj7", () => {
  const chord = rootChord4(C);

  expect(chord?.length).toBe(4);
  expect(chord).toBe(Chords.CMaj7);
} );
