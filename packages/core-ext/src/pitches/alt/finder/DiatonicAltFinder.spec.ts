import { Pitches } from "@datune/core/pitches/alt";
import { Pitches as CPitches } from "@datune/core/pitches/chromatic";
import { Pitches as DPitches } from "@datune/core/pitches/diatonic";
import { DiatonicAltFinder } from "./DiatonicAltFinder";
import { TestInit } from "tests";

TestInit.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { BB, C, Cb, Cbb, CC, CCC, Dbb, Eb, fromDiatonicAlts: from } = Pitches;
const { A: D_A, B: D_B, C: D_C, D: D_D, E: D_E } = DPitches;
const { C: C_C, DD: C_DD } = CPitches;

it("from Chromatic and Diatonic", () => {
  expect(DiatonicAltFinder.create()
    .setNote(C_C)
    .setDiatonics(D_B)
    .find()[0]).toBe(BB);

  expect(DiatonicAltFinder.create()
    .setNote(C_DD)
    .setDiatonics(D_E)
    .find()[0]).toBe(Eb);
} );

it("diatonic = C: Cbb, Cbb,C, C#, C##", () => {
  const finder = DiatonicAltFinder.create()
    .setDiatonics(D_C);
  const result = finder.find();

  expect(result).toHaveLength(5);

  expect(result).toContain(Cbb);
  expect(result).toContain(Cb);
  expect(result).toContain(C);
  expect(result).toContain(CC);
  expect(result).toContain(CCC);
} );

it("chromatic = C: B#, C, Dbb", () => {
  const finder = DiatonicAltFinder.create()
    .setNote(C_C);
  const result = finder.find();

  expect(result).toHaveLength(3);

  expect(result).toContain(BB);
  expect(result).toContain(C);
  expect(result).toContain(Dbb);
} );

it("chromatic = C, diatonics = C, D: C, Dbb", () => {
  const finder = DiatonicAltFinder.create()
    .setNote(C_C)
    .setDiatonics(D_C, D_D);
  const result = finder.find();

  expect(result).toHaveLength(2);

  expect(result).toContain(C);
  expect(result).toContain(Dbb);
} );

it("chromatic = C, maxSharp = 3, maxBemol = 1: A###, B#, C", () => {
  const finder = DiatonicAltFinder.create()
    .setNote(C_C)
    .setMaxSharps(3)
    .setMaxFlats(1);
  const result = finder.find();

  expect(result).toHaveLength(3);

  expect(result).toContain(from(D_A, 3));
  expect(result).toContain(BB);
  expect(result).toContain(C);
} );
