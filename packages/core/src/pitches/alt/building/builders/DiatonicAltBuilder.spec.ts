import DiatonicAltBuilder from "./DiatonicAltBuilder";
import { Keys as K } from "keys/alt";
import { Pitches as DA } from "pitches/alt";
import { Pitches as CPitches } from "pitches/chromatic";
import { Pitches as DPitches } from "pitches/diatonic";
import { TestInit } from "tests";

beforeAll(() => {
  TestInit.diatonicAlt();
} );

it("from Chromatic and Diatonic", () => {
  expect(DiatonicAltBuilder.create()
    .setNote(CPitches.C)
    .setDiatonic(DPitches.B)
    .build()).toBe(DA.BB);

  expect(DiatonicAltBuilder.create()
    .setNote(CPitches.DD)
    .setDiatonic(DPitches.E)
    .build()).toBe(DA.Eb);

  expect(DiatonicAltBuilder.create()
    .setNote(CPitches.GG)
    .setDiatonic(DPitches.A)
    .build()).toBe(DA.Ab);

  expect(DiatonicAltBuilder.create()
    .setNote(CPitches.AA)
    .setDiatonic(DPitches.B)
    .build()).toBe(DA.Bb);

  expect(DiatonicAltBuilder.create()
    .setNote(CPitches.CC)
    .setDiatonic(DPitches.B)
    .build()).toBe(DA.BBB);

  expect(DiatonicAltBuilder.create()
    .setNote(CPitches.AA)
    .setDiatonic(DPitches.C)
    .build()).toBe(DA.Cbb);

  expect(DiatonicAltBuilder.create()
    .setNote(CPitches.C)
    .setDiatonic(DPitches.C)
    .build()).toBe(DA.C);

  expect(DiatonicAltBuilder.create()
    .setNote(CPitches.G)
    .setDiatonic(DPitches.G)
    .build()).toBe(DA.G);

  expect(DiatonicAltBuilder.create()
    .setNote(CPitches.E)
    .setDiatonic(DPitches.F)
    .build()).toBe(DA.Fb);

  expect(DiatonicAltBuilder.create()
    .setNote(CPitches.F)
    .setDiatonic(DPitches.E)
    .build()).toBe(DA.EE);
} );

describe("from Chromatic and DiatonicAlt list", () => {
  it("chromatic DD in Key Cm = Eb", () => {
    TestInit.diatonicAltKey();
    const list = K.Cm.pitches;
    const diatonicAlt = DiatonicAltBuilder.create()
      .setNote(CPitches.DD)
      .setNoteAltList(...list)
      .build();

    expect(diatonicAlt).toBe(DA.Eb);
  } );
} );
