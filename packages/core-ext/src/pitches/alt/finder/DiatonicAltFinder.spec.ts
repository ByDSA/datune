import { Pitches as P } from "@datune/core/pitches/alt";
import { Pitches as CP } from "@datune/core/pitches/chromatic";
import { Pitches as DP } from "@datune/core/pitches/diatonic";
import { TestInit } from "tests";
import { DiatonicAltFinder } from "./DiatonicAltFinder";

TestInit.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { BB, C, Cb, Cbb, CC, CCC, Dbb, Eb, fromDiatonicAlts: from } = P;

it("from Chromatic and Diatonic", () => {
  expect(DiatonicAltFinder.create()
    .setNote(CP.C)
    .setDiatonics(DP.B)
    .find()[0]).toBe(BB);

  expect(DiatonicAltFinder.create()
    .setNote(CP.DD)
    .setDiatonics(DP.E)
    .find()[0]).toBe(Eb);
} );

it("diatonic = C: Cbb, Cbb,C, C#, C##", () => {
  const finder = DiatonicAltFinder.create()
    .setDiatonics(DP.C);
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
    .setNote(CP.C);
  const result = finder.find();

  expect(result).toHaveLength(3);

  expect(result).toContain(BB);
  expect(result).toContain(C);
  expect(result).toContain(Dbb);
} );

it("chromatic = C, diatonics = C, D: C, Dbb", () => {
  const finder = DiatonicAltFinder.create()
    .setNote(CP.C)
    .setDiatonics(DP.C, DP.D);
  const result = finder.find();

  expect(result).toHaveLength(2);

  expect(result).toContain(C);
  expect(result).toContain(Dbb);
} );

it("chromatic = C, maxSharp = 3, maxBemol = 1: A###, B#, C", () => {
  const finder = DiatonicAltFinder.create()
    .setNote(CP.C)
    .setMaxSharps(3)
    .setMaxFlats(1);
  const result = finder.find();

  expect(result).toHaveLength(3);

  expect(result).toContain(from(DP.A, 3));
  expect(result).toContain(BB);
  expect(result).toContain(C);
} );
