import type { SPN } from "../SPN";
import type { SPNArray } from "../Array";
import { lockr } from "@datune/utils/immutables";
import * as DP from "pitches/diatonic/constants";
import * as P from "pitches/alt/constants";
import { fromDPitchAlts } from "pitches/alt/building/diatonicAlts";
import { fromPitchOctave } from "../building";

export function initialize() {
  if (C0)
    throw new Error("Already initialized");

  if (!P.C)
    P.initialize();

  const { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } = P;

  // El negativo es por compatibilidad con MidiPitch
  C_S1 = fromPitchOctave(C, -1) as SPN;
  CC_S1 = fromPitchOctave(CC, -1) as SPN;
  D_S1 = fromPitchOctave(D, -1) as SPN;
  DD_S1 = fromPitchOctave(DD, -1) as SPN;
  E_S1 = fromPitchOctave(E, -1) as SPN;
  F_S1 = fromPitchOctave(F, -1) as SPN;
  FF_S1 = fromPitchOctave(FF, -1) as SPN;
  G_S1 = fromPitchOctave(G, -1) as SPN;
  GG_S1 = fromPitchOctave(GG, -1) as SPN;
  A_S1 = fromPitchOctave(A, -1) as SPN;
  AA_S1 = fromPitchOctave(AA, -1) as SPN;
  B_S1 = fromPitchOctave(B, -1) as SPN;
  C0 = fromPitchOctave(C, 0) as SPN;
  CC0 = fromPitchOctave(CC, 0) as SPN;
  D0 = fromPitchOctave(D, 0) as SPN;
  DD0 = fromPitchOctave(DD, 0) as SPN;
  E0 = fromPitchOctave(E, 0) as SPN;
  F0 = fromPitchOctave(F, 0) as SPN;
  FF0 = fromPitchOctave(FF, 0) as SPN;
  G0 = fromPitchOctave(G, 0) as SPN;
  GG0 = fromPitchOctave(GG, 0) as SPN;
  A0 = fromPitchOctave(A, 0) as SPN;
  AA0 = fromPitchOctave(AA, 0) as SPN;
  B0 = fromPitchOctave(B, 0) as SPN;
  C1 = fromPitchOctave(C, 1) as SPN;
  CC1 = fromPitchOctave(CC, 1) as SPN;
  D1 = fromPitchOctave(D, 1) as SPN;
  DD1 = fromPitchOctave(DD, 1) as SPN;
  E1 = fromPitchOctave(E, 1) as SPN;
  F1 = fromPitchOctave(F, 1) as SPN;
  FF1 = fromPitchOctave(FF, 1) as SPN;
  G1 = fromPitchOctave(G, 1) as SPN;
  GG1 = fromPitchOctave(GG, 1) as SPN;
  A1 = fromPitchOctave(A, 1) as SPN;
  AA1 = fromPitchOctave(AA, 1) as SPN;
  B1 = fromPitchOctave(B, 1) as SPN;
  C2 = fromPitchOctave(C, 2) as SPN;
  CC2 = fromPitchOctave(CC, 2) as SPN;
  D2 = fromPitchOctave(D, 2) as SPN;
  DD2 = fromPitchOctave(DD, 2) as SPN;
  E2 = fromPitchOctave(E, 2) as SPN;
  F2 = fromPitchOctave(F, 2) as SPN;
  FF2 = fromPitchOctave(FF, 2) as SPN;
  G2 = fromPitchOctave(G, 2) as SPN;
  GG2 = fromPitchOctave(GG, 2) as SPN;
  A2 = fromPitchOctave(A, 2) as SPN;
  AA2 = fromPitchOctave(AA, 2) as SPN;
  B2 = fromPitchOctave(B, 2) as SPN;
  C3 = fromPitchOctave(C, 3) as SPN;
  CC3 = fromPitchOctave(CC, 3) as SPN;
  D3 = fromPitchOctave(D, 3) as SPN;
  DD3 = fromPitchOctave(DD, 3) as SPN;
  E3 = fromPitchOctave(E, 3) as SPN;
  F3 = fromPitchOctave(F, 3) as SPN;
  FF3 = fromPitchOctave(FF, 3) as SPN;
  G3 = fromPitchOctave(G, 3) as SPN;
  GG3 = fromPitchOctave(GG, 3) as SPN;
  A3 = fromPitchOctave(A, 3) as SPN;
  AA3 = fromPitchOctave(AA, 3) as SPN;
  B3 = fromPitchOctave(B, 3) as SPN;
  C4 = fromPitchOctave(C, 4) as SPN;
  CC4 = fromPitchOctave(CC, 4) as SPN;
  D4 = fromPitchOctave(D, 4) as SPN;
  DD4 = fromPitchOctave(DD, 4) as SPN;
  E4 = fromPitchOctave(E, 4) as SPN;
  F4 = fromPitchOctave(F, 4) as SPN;
  FF4 = fromPitchOctave(FF, 4) as SPN;
  G4 = fromPitchOctave(G, 4) as SPN;
  GG4 = fromPitchOctave(GG, 4) as SPN;
  A4 = fromPitchOctave(A, 4) as SPN;
  AA4 = fromPitchOctave(AA, 4) as SPN;
  B4 = fromPitchOctave(B, 4) as SPN;
  C5 = fromPitchOctave(C, 5) as SPN;
  CC5 = fromPitchOctave(CC, 5) as SPN;
  D5 = fromPitchOctave(D, 5) as SPN;
  DD5 = fromPitchOctave(DD, 5) as SPN;
  E5 = fromPitchOctave(E, 5) as SPN;
  F5 = fromPitchOctave(F, 5) as SPN;
  FF5 = fromPitchOctave(FF, 5) as SPN;
  G5 = fromPitchOctave(G, 5) as SPN;
  GG5 = fromPitchOctave(GG, 5) as SPN;
  A5 = fromPitchOctave(A, 5) as SPN;
  AA5 = fromPitchOctave(AA, 5) as SPN;
  B5 = fromPitchOctave(B, 5) as SPN;
  C6 = fromPitchOctave(C, 6) as SPN;
  CC6 = fromPitchOctave(CC, 6) as SPN;
  D6 = fromPitchOctave(D, 6) as SPN;
  DD6 = fromPitchOctave(DD, 6) as SPN;
  E6 = fromPitchOctave(E, 6) as SPN;
  F6 = fromPitchOctave(F, 6) as SPN;
  FF6 = fromPitchOctave(FF, 6) as SPN;
  G6 = fromPitchOctave(G, 6) as SPN;
  GG6 = fromPitchOctave(GG, 6) as SPN;
  A6 = fromPitchOctave(A, 6) as SPN;
  AA6 = fromPitchOctave(AA, 6) as SPN;
  B6 = fromPitchOctave(B, 6) as SPN;
  C7 = fromPitchOctave(C, 7) as SPN;
  CC7 = fromPitchOctave(CC, 7) as SPN;
  D7 = fromPitchOctave(D, 7) as SPN;
  DD7 = fromPitchOctave(DD, 7) as SPN;
  E7 = fromPitchOctave(E, 7) as SPN;
  F7 = fromPitchOctave(F, 7) as SPN;
  FF7 = fromPitchOctave(FF, 7) as SPN;
  G7 = fromPitchOctave(G, 7) as SPN;
  GG7 = fromPitchOctave(GG, 7) as SPN;
  A7 = fromPitchOctave(A, 7) as SPN;
  AA7 = fromPitchOctave(AA, 7) as SPN;
  B7 = fromPitchOctave(B, 7) as SPN;
  C8 = fromPitchOctave(C, 8) as SPN;
  CC8 = fromPitchOctave(CC, 8) as SPN;
  D8 = fromPitchOctave(D, 8) as SPN;
  DD8 = fromPitchOctave(DD, 8) as SPN;
  E8 = fromPitchOctave(E, 8) as SPN;
  F8 = fromPitchOctave(F, 8) as SPN;
  FF8 = fromPitchOctave(FF, 8) as SPN;
  G8 = fromPitchOctave(G, 8) as SPN;
  GG8 = fromPitchOctave(GG, 8) as SPN;
  A8 = fromPitchOctave(A, 8) as SPN;
  AA8 = fromPitchOctave(AA, 8) as SPN;
  B8 = fromPitchOctave(B, 8) as SPN;
  C9 = fromPitchOctave(C, 9) as SPN;
  CC9 = fromPitchOctave(CC, 9) as SPN;
  D9 = fromPitchOctave(D, 9) as SPN;
  DD9 = fromPitchOctave(DD, 9) as SPN;
  E9 = fromPitchOctave(E, 9) as SPN;
  F9 = fromPitchOctave(F, 9) as SPN;
  FF9 = fromPitchOctave(FF, 9) as SPN;
  G9 = fromPitchOctave(G, 9) as SPN;
  GG9 = fromPitchOctave(GG, 9) as SPN;
  A9 = fromPitchOctave(A, 9) as SPN;
  AA9 = fromPitchOctave(AA, 9) as SPN;
  B9 = fromPitchOctave(B, 9) as SPN;

  COMMON = calcCommon();

  lockr(COMMON);
}

function calcCommon(): SPNArray {
  const ret = [];

  for (let octave = -1; octave <= 9; octave++) {
    for (const diatonic of DP.ALL) {
      for (let alt = -1; alt <= -1; alt++) {
        const pitch = fromDPitchAlts(diatonic, alt);
        const spn = fromPitchOctave(pitch, octave) as SPN;

        ret.push(spn);
      }
    }
  }

  return ret as SPNArray;
}

export let COMMON: SPNArray;

export let C_S1: SPN;

export let CC_S1: SPN;

export let D_S1: SPN;

export let DD_S1: SPN;

export let E_S1: SPN;

export let F_S1: SPN;

export let FF_S1: SPN;

export let G_S1: SPN;

export let GG_S1: SPN;

export let A_S1: SPN;

export let AA_S1: SPN;

export let B_S1: SPN;

export let C0: SPN;

export let CC0: SPN;

export let D0: SPN;

export let DD0: SPN;

export let E0: SPN;

export let F0: SPN;

export let FF0: SPN;

export let G0: SPN;

export let GG0: SPN;

export let A0: SPN;

export let AA0: SPN;

export let B0: SPN;

export let C1: SPN;

export let CC1: SPN;

export let D1: SPN;

export let DD1: SPN;

export let E1: SPN;

export let F1: SPN;

export let FF1: SPN;

export let G1: SPN;

export let GG1: SPN;

export let A1: SPN;

export let AA1: SPN;

export let B1: SPN;

export let C2: SPN;

export let CC2: SPN;

export let D2: SPN;

export let DD2: SPN;

export let E2: SPN;

export let F2: SPN;

export let FF2: SPN;

export let G2: SPN;

export let GG2: SPN;

export let A2: SPN;

export let AA2: SPN;

export let B2: SPN;

export let C3: SPN;

export let CC3: SPN;

export let D3: SPN;

export let DD3: SPN;

export let E3: SPN;

export let F3: SPN;

export let FF3: SPN;

export let G3: SPN;

export let GG3: SPN;

export let A3: SPN;

export let AA3: SPN;

export let B3: SPN;

export let C4: SPN;

export let CC4: SPN;

export let D4: SPN;

export let DD4: SPN;

export let E4: SPN;

export let F4: SPN;

export let FF4: SPN;

export let G4: SPN;

export let GG4: SPN;

export let A4: SPN;

export let AA4: SPN;

export let B4: SPN;

export let C5: SPN;

export let CC5: SPN;

export let D5: SPN;

export let DD5: SPN;

export let E5: SPN;

export let F5: SPN;

export let FF5: SPN;

export let G5: SPN;

export let GG5: SPN;

export let A5: SPN;

export let AA5: SPN;

export let B5: SPN;

export let C6: SPN;

export let CC6: SPN;

export let D6: SPN;

export let DD6: SPN;

export let E6: SPN;

export let F6: SPN;

export let FF6: SPN;

export let G6: SPN;

export let GG6: SPN;

export let A6: SPN;

export let AA6: SPN;

export let B6: SPN;

export let C7: SPN;

export let CC7: SPN;

export let D7: SPN;

export let DD7: SPN;

export let E7: SPN;

export let F7: SPN;

export let FF7: SPN;

export let G7: SPN;

export let GG7: SPN;

export let A7: SPN;

export let AA7: SPN;

export let B7: SPN;

export let C8: SPN;

export let CC8: SPN;

export let D8: SPN;

export let DD8: SPN;

export let E8: SPN;

export let F8: SPN;

export let FF8: SPN;

export let G8: SPN;

export let GG8: SPN;

export let A8: SPN;

export let AA8: SPN;

export let B8: SPN;

export let C9: SPN;

export let CC9: SPN;

export let D9: SPN;

export let DD9: SPN;

export let E9: SPN;

export let F9: SPN;

export let FF9: SPN;

export let G9: SPN;

export let GG9: SPN;

export let A9: SPN;

export let AA9: SPN;

export let B9: SPN;
