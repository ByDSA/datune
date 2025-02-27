import { fromRootScale as from } from "../building";
import { C } from "../constants";
import { rootChord3 } from "./rootChord3";
import { Chords } from "chords/chromatic";
import { Pitches } from "pitches/chromatic";
import { Scales } from "scales/chromatic";
import { TestInit } from "tests";

TestInit.chromaticKey();
TestInit.chromaticVoicing();
TestInit.chromaticChord();

it("rootChord3: C -> C", () => {
  const chord = rootChord3(C);

  expect(chord?.length).toBe(3);
  expect(chord).toBe(Chords.C);
} );

it("rootChord3: C Oriental -> F/C", () => {
  const key = from(Pitches.C, Scales.ORIENTAL);
  const chord = rootChord3(key);

  expect(chord?.length).toBe(3);
  expect(chord).toBe(Chords.bass(Chords.F, Pitches.C));
} );
