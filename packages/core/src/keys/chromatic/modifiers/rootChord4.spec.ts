/* eslint-disable camelcase */
import { CMaj7 as CC_CMaj7 } from "chords/chromatic";
import { TestInit } from "tests";
import { C } from "../constants";
import rootChord4 from "./rootChord4";

TestInit.chromaticKey();
TestInit.chromaticVoicing();
TestInit.chromaticChord();
it("rootChord4: C -> CMaj7", () => {
  const chord = rootChord4(C);

  expect(chord?.length).toBe(4);
  expect(chord).toBe(CC_CMaj7);
} );
