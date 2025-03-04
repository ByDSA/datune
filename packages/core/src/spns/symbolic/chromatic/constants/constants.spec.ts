import type { SPN } from "../SPN";
import { Pitches, Pitch as OctavePitch } from "pitches/chromatic";
import { TestInit } from "tests";
import { A0, A1, A2, A3, A4, A5, A6, A7, A8, A9, AA0, AA1, AA2, AA3, AA4, AA5, AA6, AA7, AA8, AA9, AA_S1, ALL, A_S1, B0, B1, B2, B3, B4, B5, B6, B7, B8, B_S1, C0, C1, C2, C3, C4, C5, C6, C7, C8, C9, CC0, CC1, CC2, CC3, CC4, CC5, CC6, CC7, CC8, CC9, CC_S1, C_S1, D0, D1, D2, D3, D4, D5, D6, D7, D8, D9, DD0, DD1, DD2, DD3, DD4, DD5, DD6, DD7, DD8, DD9, DD_S1, D_S1, E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E_S1, F0, F1, F2, F3, F4, F5, F6, F7, F8, F9, FF0, FF1, FF2, FF3, FF4, FF5, FF6, FF7, FF8, FF9, FF_S1, F_S1, G0, G1, G2, G3, G4, G5, G6, G7, G8, G9, GG0, GG1, GG2, GG3, GG4, GG5, GG6, GG7, GG8, GG9, GG_S1, G_S1 } from ".";

TestInit.chromaticSPN();

describe("tests", () => {
  const precalcCases: [SPN, OctavePitch, number][] = [
    [C_S1, Pitches.C, -1],
    [CC_S1, Pitches.CC, -1],
    [D_S1, Pitches.D, -1],
    [DD_S1, Pitches.DD, -1],
    [E_S1, Pitches.E, -1],
    [F_S1, Pitches.F, -1],
    [FF_S1, Pitches.FF, -1],
    [G_S1, Pitches.G, -1],
    [GG_S1, Pitches.GG, -1],
    [A_S1, Pitches.A, -1],
    [AA_S1, Pitches.AA, -1],
    [B_S1, Pitches.B, -1],
    [C0, Pitches.C, 0],
    [CC0, Pitches.CC, 0],
    [D0, Pitches.D, 0],
    [DD0, Pitches.DD, 0],
    [E0, Pitches.E, 0],
    [F0, Pitches.F, 0],
    [FF0, Pitches.FF, 0],
    [G0, Pitches.G, 0],
    [GG0, Pitches.GG, 0],
    [A0, Pitches.A, 0],
    [AA0, Pitches.AA, 0],
    [B0, Pitches.B, 0],
    [C1, Pitches.C, 1],
    [CC1, Pitches.CC, 1],
    [D1, Pitches.D, 1],
    [DD1, Pitches.DD, 1],
    [E1, Pitches.E, 1],
    [F1, Pitches.F, 1],
    [FF1, Pitches.FF, 1],
    [G1, Pitches.G, 1],
    [GG1, Pitches.GG, 1],
    [A1, Pitches.A, 1],
    [AA1, Pitches.AA, 1],
    [B1, Pitches.B, 1],
    [C2, Pitches.C, 2],
    [CC2, Pitches.CC, 2],
    [D2, Pitches.D, 2],
    [DD2, Pitches.DD, 2],
    [E2, Pitches.E, 2],
    [F2, Pitches.F, 2],
    [FF2, Pitches.FF, 2],
    [G2, Pitches.G, 2],
    [GG2, Pitches.GG, 2],
    [A2, Pitches.A, 2],
    [AA2, Pitches.AA, 2],
    [B2, Pitches.B, 2],
    [C3, Pitches.C, 3],
    [CC3, Pitches.CC, 3],
    [D3, Pitches.D, 3],
    [DD3, Pitches.DD, 3],
    [E3, Pitches.E, 3],
    [F3, Pitches.F, 3],
    [FF3, Pitches.FF, 3],
    [G3, Pitches.G, 3],
    [GG3, Pitches.GG, 3],
    [A3, Pitches.A, 3],
    [AA3, Pitches.AA, 3],
    [B3, Pitches.B, 3],
    [C4, Pitches.C, 4],
    [CC4, Pitches.CC, 4],
    [D4, Pitches.D, 4],
    [DD4, Pitches.DD, 4],
    [E4, Pitches.E, 4],
    [F4, Pitches.F, 4],
    [FF4, Pitches.FF, 4],
    [G4, Pitches.G, 4],
    [GG4, Pitches.GG, 4],
    [A4, Pitches.A, 4],
    [AA4, Pitches.AA, 4],
    [B4, Pitches.B, 4],
    [C5, Pitches.C, 5],
    [CC5, Pitches.CC, 5],
    [D5, Pitches.D, 5],
    [DD5, Pitches.DD, 5],
    [E5, Pitches.E, 5],
    [F5, Pitches.F, 5],
    [FF5, Pitches.FF, 5],
    [G5, Pitches.G, 5],
    [GG5, Pitches.GG, 5],
    [A5, Pitches.A, 5],
    [AA5, Pitches.AA, 5],
    [B5, Pitches.B, 5],
    [C6, Pitches.C, 6],
    [CC6, Pitches.CC, 6],
    [D6, Pitches.D, 6],
    [DD6, Pitches.DD, 6],
    [E6, Pitches.E, 6],
    [F6, Pitches.F, 6],
    [FF6, Pitches.FF, 6],
    [G6, Pitches.G, 6],
    [GG6, Pitches.GG, 6],
    [A6, Pitches.A, 6],
    [AA6, Pitches.AA, 6],
    [B6, Pitches.B, 6],
    [C7, Pitches.C, 7],
    [CC7, Pitches.CC, 7],
    [D7, Pitches.D, 7],
    [DD7, Pitches.DD, 7],
    [E7, Pitches.E, 7],
    [F7, Pitches.F, 7],
    [FF7, Pitches.FF, 7],
    [G7, Pitches.G, 7],
    [GG7, Pitches.GG, 7],
    [A7, Pitches.A, 7],
    [AA7, Pitches.AA, 7],
    [B7, Pitches.B, 7],
    [C8, Pitches.C, 8],
    [CC8, Pitches.CC, 8],
    [D8, Pitches.D, 8],
    [DD8, Pitches.DD, 8],
    [E8, Pitches.E, 8],
    [F8, Pitches.F, 8],
    [FF8, Pitches.FF, 8],
    [G8, Pitches.G, 8],
    [GG8, Pitches.GG, 8],
    [A8, Pitches.A, 8],
    [AA8, Pitches.AA, 8],
    [B8, Pitches.B, 8],
    [C9, Pitches.C, 9],
    [CC9, Pitches.CC, 9],
    [D9, Pitches.D, 9],
    [DD9, Pitches.DD, 9],
    [E9, Pitches.E, 9],
    [F9, Pitches.F, 9],
    [FF9, Pitches.FF, 9],
    [G9, Pitches.G, 9],
    [GG9, Pitches.GG, 9],
    [A9, Pitches.A, 9],
    [AA9, Pitches.AA, 9],
  ];

  describe.each(precalcCases)("tests", (base: SPN, expectedPitch: OctavePitch, expectedOctave: number) => {
    const { pitch, octave } = base;
    const expectedPitchName = expectedPitch.toString();
    const spnName = base.toString();

    describe(`SPN=${spnName}`, () => {
      it(`pitch=${expectedPitchName}`, () => {
        expect(pitch).toBe(expectedPitch);
      } );

      it(`octave=${expectedOctave}`, () => {
        expect(octave).toBe(expectedOctave);
      } );
    } );
  } );

  describe.each(ALL)("defined", (spn: SPN) => {
    it("defined", () => {
      expect(spn).toBeDefined();
    } );
  } );
} );
