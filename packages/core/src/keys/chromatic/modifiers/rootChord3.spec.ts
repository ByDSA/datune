/* eslint-disable camelcase */
import { bass, C as CC_C, F as CC_F } from "chords/chromatic";
import { C as P_C } from "pitches/chromatic";
import { ORIENTAL } from "scales/chromatic";
import { TestInit } from "tests";
import { from } from "../building";
import { C } from "../constants";
import rootChord3 from "./rootChord3";

TestInit.chromaticKey();
TestInit.chromaticVoicing();
TestInit.chromaticChord();
it("rootChord3: C -> C", () => {
  const chord = rootChord3(C);

  expect(chord?.length).toBe(3);
  expect(chord).toBe(CC_C);
} );

it("rootChord3: C Oriental -> F/C", () => {
  const key = from(P_C, ORIENTAL);
  const chord = rootChord3(key);

  expect(chord?.length).toBe(3);
  expect(chord).toBe(bass(CC_F, P_C));
} );
