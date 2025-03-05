import type { SPN } from "../SPN";
import type { Pitch as OctavePitch } from "pitches/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { TestInit } from "tests";
import { A0, A1, A2, A3, A4, A5, A6, A7, A8, A9, AA0, AA1, AA2, AA3, AA4, AA5, AA6, AA7, AA8, AA9, AA_S1, ALL, A_S1, B0, B1, B2, B3, B4, B5, B6, B7, B8, B_S1, C0, C1, C2, C3, C4, C5, C6, C7, C8, C9, CC0, CC1, CC2, CC3, CC4, CC5, CC6, CC7, CC8, CC9, CC_S1, C_S1, D0, D1, D2, D3, D4, D5, D6, D7, D8, D9, DD0, DD1, DD2, DD3, DD4, DD5, DD6, DD7, DD8, DD9, DD_S1, D_S1, E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E_S1, F0, F1, F2, F3, F4, F5, F6, F7, F8, F9, FF0, FF1, FF2, FF3, FF4, FF5, FF6, FF7, FF8, FF9, FF_S1, F_S1, G0, G1, G2, G3, G4, G5, G6, G7, G8, G9, GG0, GG1, GG2, GG3, GG4, GG5, GG6, GG7, GG8, GG9, GG_S1, G_S1 } from ".";

TestInit.chromaticSPN();

describe("tests", () => {
  const precalcCases: [SPN, OctavePitch, number][] = [
    [C_S1, P.C, -1],
    [CC_S1, P.CC, -1],
    [D_S1, P.D, -1],
    [DD_S1, P.DD, -1],
    [E_S1, P.E, -1],
    [F_S1, P.F, -1],
    [FF_S1, P.FF, -1],
    [G_S1, P.G, -1],
    [GG_S1, P.GG, -1],
    [A_S1, P.A, -1],
    [AA_S1, P.AA, -1],
    [B_S1, P.B, -1],
    [C0, P.C, 0],
    [CC0, P.CC, 0],
    [D0, P.D, 0],
    [DD0, P.DD, 0],
    [E0, P.E, 0],
    [F0, P.F, 0],
    [FF0, P.FF, 0],
    [G0, P.G, 0],
    [GG0, P.GG, 0],
    [A0, P.A, 0],
    [AA0, P.AA, 0],
    [B0, P.B, 0],
    [C1, P.C, 1],
    [CC1, P.CC, 1],
    [D1, P.D, 1],
    [DD1, P.DD, 1],
    [E1, P.E, 1],
    [F1, P.F, 1],
    [FF1, P.FF, 1],
    [G1, P.G, 1],
    [GG1, P.GG, 1],
    [A1, P.A, 1],
    [AA1, P.AA, 1],
    [B1, P.B, 1],
    [C2, P.C, 2],
    [CC2, P.CC, 2],
    [D2, P.D, 2],
    [DD2, P.DD, 2],
    [E2, P.E, 2],
    [F2, P.F, 2],
    [FF2, P.FF, 2],
    [G2, P.G, 2],
    [GG2, P.GG, 2],
    [A2, P.A, 2],
    [AA2, P.AA, 2],
    [B2, P.B, 2],
    [C3, P.C, 3],
    [CC3, P.CC, 3],
    [D3, P.D, 3],
    [DD3, P.DD, 3],
    [E3, P.E, 3],
    [F3, P.F, 3],
    [FF3, P.FF, 3],
    [G3, P.G, 3],
    [GG3, P.GG, 3],
    [A3, P.A, 3],
    [AA3, P.AA, 3],
    [B3, P.B, 3],
    [C4, P.C, 4],
    [CC4, P.CC, 4],
    [D4, P.D, 4],
    [DD4, P.DD, 4],
    [E4, P.E, 4],
    [F4, P.F, 4],
    [FF4, P.FF, 4],
    [G4, P.G, 4],
    [GG4, P.GG, 4],
    [A4, P.A, 4],
    [AA4, P.AA, 4],
    [B4, P.B, 4],
    [C5, P.C, 5],
    [CC5, P.CC, 5],
    [D5, P.D, 5],
    [DD5, P.DD, 5],
    [E5, P.E, 5],
    [F5, P.F, 5],
    [FF5, P.FF, 5],
    [G5, P.G, 5],
    [GG5, P.GG, 5],
    [A5, P.A, 5],
    [AA5, P.AA, 5],
    [B5, P.B, 5],
    [C6, P.C, 6],
    [CC6, P.CC, 6],
    [D6, P.D, 6],
    [DD6, P.DD, 6],
    [E6, P.E, 6],
    [F6, P.F, 6],
    [FF6, P.FF, 6],
    [G6, P.G, 6],
    [GG6, P.GG, 6],
    [A6, P.A, 6],
    [AA6, P.AA, 6],
    [B6, P.B, 6],
    [C7, P.C, 7],
    [CC7, P.CC, 7],
    [D7, P.D, 7],
    [DD7, P.DD, 7],
    [E7, P.E, 7],
    [F7, P.F, 7],
    [FF7, P.FF, 7],
    [G7, P.G, 7],
    [GG7, P.GG, 7],
    [A7, P.A, 7],
    [AA7, P.AA, 7],
    [B7, P.B, 7],
    [C8, P.C, 8],
    [CC8, P.CC, 8],
    [D8, P.D, 8],
    [DD8, P.DD, 8],
    [E8, P.E, 8],
    [F8, P.F, 8],
    [FF8, P.FF, 8],
    [G8, P.G, 8],
    [GG8, P.GG, 8],
    [A8, P.A, 8],
    [AA8, P.AA, 8],
    [B8, P.B, 8],
    [C9, P.C, 9],
    [CC9, P.CC, 9],
    [D9, P.D, 9],
    [DD9, P.DD, 9],
    [E9, P.E, 9],
    [F9, P.F, 9],
    [FF9, P.FF, 9],
    [G9, P.G, 9],
    [GG9, P.GG, 9],
    [A9, P.A, 9],
    [AA9, P.AA, 9],
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
