import { Keys as K } from "keys/alt";
import { Pitches as P } from "pitches/alt";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { TestInit } from "tests";
import { DiatonicAltBuilder } from "./DiatonicAltBuilder";

beforeAll(() => {
  TestInit.diatonicAlt();
} );

it("from Chromatic and Diatonic", () => {
  expect(DiatonicAltBuilder.create()
    .setNote(CP.C)
    .setDiatonic(DP.B)
    .build()).toBe(P.BB);

  expect(DiatonicAltBuilder.create()
    .setNote(CP.DD)
    .setDiatonic(DP.E)
    .build()).toBe(P.Eb);

  expect(DiatonicAltBuilder.create()
    .setNote(CP.GG)
    .setDiatonic(DP.A)
    .build()).toBe(P.Ab);

  expect(DiatonicAltBuilder.create()
    .setNote(CP.AA)
    .setDiatonic(DP.B)
    .build()).toBe(P.Bb);

  expect(DiatonicAltBuilder.create()
    .setNote(CP.CC)
    .setDiatonic(DP.B)
    .build()).toBe(P.BBB);

  expect(DiatonicAltBuilder.create()
    .setNote(CP.AA)
    .setDiatonic(DP.C)
    .build()).toBe(P.Cbb);

  expect(DiatonicAltBuilder.create()
    .setNote(CP.C)
    .setDiatonic(DP.C)
    .build()).toBe(P.C);

  expect(DiatonicAltBuilder.create()
    .setNote(CP.G)
    .setDiatonic(DP.G)
    .build()).toBe(P.G);

  expect(DiatonicAltBuilder.create()
    .setNote(CP.E)
    .setDiatonic(DP.F)
    .build()).toBe(P.Fb);

  expect(DiatonicAltBuilder.create()
    .setNote(CP.F)
    .setDiatonic(DP.E)
    .build()).toBe(P.EE);
} );

describe("from Chromatic and DiatonicAlt list", () => {
  it("chromatic DD in Key Cm = Eb", () => {
    TestInit.diatonicAltKey();
    const list = K.Cm.pitches;
    const pitch = DiatonicAltBuilder.create()
      .setNote(CP.DD)
      .setNoteAltList(...list)
      .build();

    expect(pitch).toBe(P.Eb);
  } );
} );
