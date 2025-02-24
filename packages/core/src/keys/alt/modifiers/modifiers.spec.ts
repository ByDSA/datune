/* eslint-disable camelcase */
import { Am as C_Am, C as C_C, CMaj7 } from "chords/alt";
import { C as P_C } from "pitches/alt";
import { ORIENTAL } from "scales/alt";
import { TestInit } from "tests";
import { rootChord3, rootChord4 } from ".";
import { from } from "../building";
import { C } from "../constants";

TestInit.diatonicAltChord();
TestInit.diatonicAltKey();
it("rootChord3: C -> C", () => {
  const chord = rootChord3(C);

  expect(chord?.length).toBe(3);
  expect(chord).toBe(C_C);
} );

it("rootChord3: C Oriental -> Am", () => {
  const key = from(P_C, ORIENTAL);
  const chord = rootChord3(key);

  expect(chord?.length).toBe(3);
  expect(chord).toBe(C_Am);
} );

it("rootChord4: C -> CMaj7", () => {
  const chord = rootChord4(C);

  expect(chord?.length).toBe(4);
  expect(chord).toBe(CMaj7);
} );
