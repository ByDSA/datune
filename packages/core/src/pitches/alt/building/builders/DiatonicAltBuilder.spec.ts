/* eslint-disable camelcase */
import { Cm } from "keys/alt";
import { Ab as DA_Ab, BB as DA_BB, Bb as DA_Bb, BBB as DA_BBB, C as DA_C, Cbb as DA_Cbb, Eb as DA_Eb, EE as DA_EE, Fb as DA_Fb, G as DA_G } from "pitches/alt";
import { AA as C_AA, C as C_C, CC as C_CC, DD as C_DD, E as C_E, F as C_F, G as C_G, GG as C_GG } from "pitches/chromatic";
import { A as D_A, B as D_B, C as D_C, E as D_E, F as D_F, G as D_G } from "pitches/diatonic";
import { TestInit } from "tests";
import DiatonicAltBuilder from "./DiatonicAltBuilder";

beforeAll(() => {
  TestInit.diatonicAlt();
} );
it("from Chromatic and Diatonic", () => {
  expect(DiatonicAltBuilder.create()
    .setNote(C_C)
    .setDiatonic(D_B)
    .build()).toBe(DA_BB);

  expect(DiatonicAltBuilder.create()
    .setNote(C_DD)
    .setDiatonic(D_E)
    .build()).toBe(DA_Eb);

  expect(DiatonicAltBuilder.create()
    .setNote(C_GG)
    .setDiatonic(D_A)
    .build()).toBe(DA_Ab);

  expect(DiatonicAltBuilder.create()
    .setNote(C_AA)
    .setDiatonic(D_B)
    .build()).toBe(DA_Bb);

  expect(DiatonicAltBuilder.create()
    .setNote(C_CC)
    .setDiatonic(D_B)
    .build()).toBe(DA_BBB);

  expect(DiatonicAltBuilder.create()
    .setNote(C_AA)
    .setDiatonic(D_C)
    .build()).toBe(DA_Cbb);

  expect(DiatonicAltBuilder.create()
    .setNote(C_C)
    .setDiatonic(D_C)
    .build()).toBe(DA_C);

  expect(DiatonicAltBuilder.create()
    .setNote(C_G)
    .setDiatonic(D_G)
    .build()).toBe(DA_G);

  expect(DiatonicAltBuilder.create()
    .setNote(C_E)
    .setDiatonic(D_F)
    .build()).toBe(DA_Fb);

  expect(DiatonicAltBuilder.create()
    .setNote(C_F)
    .setDiatonic(D_E)
    .build()).toBe(DA_EE);
} );

describe("from Chromatic and DiatonicAlt list", () => {
  it("Chromatic DD in Key Cm = Eb", () => {
    TestInit.diatonicAltKey();
    const list = Cm.pitches;
    const diatonicAlt = DiatonicAltBuilder.create()
      .setNote(C_DD)
      .setNoteAltList(...list)
      .build();

    expect(diatonicAlt).toBe(DA_Eb);
  } );
} );
