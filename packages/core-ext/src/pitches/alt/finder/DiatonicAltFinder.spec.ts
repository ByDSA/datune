import { BB, C, Cb, Cbb, CC, CCC, Dbb, Eb, fromDiatonicAlts as from } from "@datune/core/pitches/alt";
import { C as C_C, DD as C_DD } from "@datune/core/pitches/chromatic";
import { A as D_A, B as D_B, C as D_C, D as D_D, E as D_E } from "@datune/core/pitches/diatonic";
import { TestInit } from "tests";
import DiatonicAltFinder from "./DiatonicAltFinder";

beforeAll(() => {
  TestInit.loadAll();
} );
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

  expect(result.length).toBe(5);

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

  expect(result.length).toBe(3);

  expect(result).toContain(BB);
  expect(result).toContain(C);
  expect(result).toContain(Dbb);
} );

it("chromatic = C, diatonics = C, D: C, Dbb", () => {
  const finder = DiatonicAltFinder.create()
    .setNote(C_C)
    .setDiatonics(D_C, D_D);
  const result = finder.find();

  expect(result.length).toBe(2);

  expect(result).toContain(C);
  expect(result).toContain(Dbb);
} );

it("chromatic = C, maxSharp = 3, maxBemol = 1: A###, B#, C", () => {
  const finder = DiatonicAltFinder.create()
    .setNote(C_C)
    .setMaxSharps(3)
    .setMaxFlats(1);
  const result = finder.find();

  expect(result.length).toBe(3);

  expect(result).toContain(from(D_A, 3));
  expect(result).toContain(BB);
  expect(result).toContain(C);
} );
