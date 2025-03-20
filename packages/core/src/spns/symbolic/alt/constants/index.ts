import type { Spn } from "../Spn";
import type { SpnArray } from "../Array";
import { deepFreeze } from "datils/datatypes/objects";
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
  C_S1 = fromPitchOctave(C, -1) as Spn;
  CC_S1 = fromPitchOctave(CC, -1) as Spn;
  D_S1 = fromPitchOctave(D, -1) as Spn;
  DD_S1 = fromPitchOctave(DD, -1) as Spn;
  E_S1 = fromPitchOctave(E, -1) as Spn;
  F_S1 = fromPitchOctave(F, -1) as Spn;
  FF_S1 = fromPitchOctave(FF, -1) as Spn;
  G_S1 = fromPitchOctave(G, -1) as Spn;
  GG_S1 = fromPitchOctave(GG, -1) as Spn;
  A_S1 = fromPitchOctave(A, -1) as Spn;
  AA_S1 = fromPitchOctave(AA, -1) as Spn;
  B_S1 = fromPitchOctave(B, -1) as Spn;
  C0 = fromPitchOctave(C, 0) as Spn;
  CC0 = fromPitchOctave(CC, 0) as Spn;
  D0 = fromPitchOctave(D, 0) as Spn;
  DD0 = fromPitchOctave(DD, 0) as Spn;
  E0 = fromPitchOctave(E, 0) as Spn;
  F0 = fromPitchOctave(F, 0) as Spn;
  FF0 = fromPitchOctave(FF, 0) as Spn;
  G0 = fromPitchOctave(G, 0) as Spn;
  GG0 = fromPitchOctave(GG, 0) as Spn;
  A0 = fromPitchOctave(A, 0) as Spn;
  AA0 = fromPitchOctave(AA, 0) as Spn;
  B0 = fromPitchOctave(B, 0) as Spn;
  C1 = fromPitchOctave(C, 1) as Spn;
  CC1 = fromPitchOctave(CC, 1) as Spn;
  D1 = fromPitchOctave(D, 1) as Spn;
  DD1 = fromPitchOctave(DD, 1) as Spn;
  E1 = fromPitchOctave(E, 1) as Spn;
  F1 = fromPitchOctave(F, 1) as Spn;
  FF1 = fromPitchOctave(FF, 1) as Spn;
  G1 = fromPitchOctave(G, 1) as Spn;
  GG1 = fromPitchOctave(GG, 1) as Spn;
  A1 = fromPitchOctave(A, 1) as Spn;
  AA1 = fromPitchOctave(AA, 1) as Spn;
  B1 = fromPitchOctave(B, 1) as Spn;
  C2 = fromPitchOctave(C, 2) as Spn;
  CC2 = fromPitchOctave(CC, 2) as Spn;
  D2 = fromPitchOctave(D, 2) as Spn;
  DD2 = fromPitchOctave(DD, 2) as Spn;
  E2 = fromPitchOctave(E, 2) as Spn;
  F2 = fromPitchOctave(F, 2) as Spn;
  FF2 = fromPitchOctave(FF, 2) as Spn;
  G2 = fromPitchOctave(G, 2) as Spn;
  GG2 = fromPitchOctave(GG, 2) as Spn;
  A2 = fromPitchOctave(A, 2) as Spn;
  AA2 = fromPitchOctave(AA, 2) as Spn;
  B2 = fromPitchOctave(B, 2) as Spn;
  C3 = fromPitchOctave(C, 3) as Spn;
  CC3 = fromPitchOctave(CC, 3) as Spn;
  D3 = fromPitchOctave(D, 3) as Spn;
  DD3 = fromPitchOctave(DD, 3) as Spn;
  E3 = fromPitchOctave(E, 3) as Spn;
  F3 = fromPitchOctave(F, 3) as Spn;
  FF3 = fromPitchOctave(FF, 3) as Spn;
  G3 = fromPitchOctave(G, 3) as Spn;
  GG3 = fromPitchOctave(GG, 3) as Spn;
  A3 = fromPitchOctave(A, 3) as Spn;
  AA3 = fromPitchOctave(AA, 3) as Spn;
  B3 = fromPitchOctave(B, 3) as Spn;
  C4 = fromPitchOctave(C, 4) as Spn;
  CC4 = fromPitchOctave(CC, 4) as Spn;
  D4 = fromPitchOctave(D, 4) as Spn;
  DD4 = fromPitchOctave(DD, 4) as Spn;
  E4 = fromPitchOctave(E, 4) as Spn;
  F4 = fromPitchOctave(F, 4) as Spn;
  FF4 = fromPitchOctave(FF, 4) as Spn;
  G4 = fromPitchOctave(G, 4) as Spn;
  GG4 = fromPitchOctave(GG, 4) as Spn;
  A4 = fromPitchOctave(A, 4) as Spn;
  AA4 = fromPitchOctave(AA, 4) as Spn;
  B4 = fromPitchOctave(B, 4) as Spn;
  C5 = fromPitchOctave(C, 5) as Spn;
  CC5 = fromPitchOctave(CC, 5) as Spn;
  D5 = fromPitchOctave(D, 5) as Spn;
  DD5 = fromPitchOctave(DD, 5) as Spn;
  E5 = fromPitchOctave(E, 5) as Spn;
  F5 = fromPitchOctave(F, 5) as Spn;
  FF5 = fromPitchOctave(FF, 5) as Spn;
  G5 = fromPitchOctave(G, 5) as Spn;
  GG5 = fromPitchOctave(GG, 5) as Spn;
  A5 = fromPitchOctave(A, 5) as Spn;
  AA5 = fromPitchOctave(AA, 5) as Spn;
  B5 = fromPitchOctave(B, 5) as Spn;
  C6 = fromPitchOctave(C, 6) as Spn;
  CC6 = fromPitchOctave(CC, 6) as Spn;
  D6 = fromPitchOctave(D, 6) as Spn;
  DD6 = fromPitchOctave(DD, 6) as Spn;
  E6 = fromPitchOctave(E, 6) as Spn;
  F6 = fromPitchOctave(F, 6) as Spn;
  FF6 = fromPitchOctave(FF, 6) as Spn;
  G6 = fromPitchOctave(G, 6) as Spn;
  GG6 = fromPitchOctave(GG, 6) as Spn;
  A6 = fromPitchOctave(A, 6) as Spn;
  AA6 = fromPitchOctave(AA, 6) as Spn;
  B6 = fromPitchOctave(B, 6) as Spn;
  C7 = fromPitchOctave(C, 7) as Spn;
  CC7 = fromPitchOctave(CC, 7) as Spn;
  D7 = fromPitchOctave(D, 7) as Spn;
  DD7 = fromPitchOctave(DD, 7) as Spn;
  E7 = fromPitchOctave(E, 7) as Spn;
  F7 = fromPitchOctave(F, 7) as Spn;
  FF7 = fromPitchOctave(FF, 7) as Spn;
  G7 = fromPitchOctave(G, 7) as Spn;
  GG7 = fromPitchOctave(GG, 7) as Spn;
  A7 = fromPitchOctave(A, 7) as Spn;
  AA7 = fromPitchOctave(AA, 7) as Spn;
  B7 = fromPitchOctave(B, 7) as Spn;
  C8 = fromPitchOctave(C, 8) as Spn;
  CC8 = fromPitchOctave(CC, 8) as Spn;
  D8 = fromPitchOctave(D, 8) as Spn;
  DD8 = fromPitchOctave(DD, 8) as Spn;
  E8 = fromPitchOctave(E, 8) as Spn;
  F8 = fromPitchOctave(F, 8) as Spn;
  FF8 = fromPitchOctave(FF, 8) as Spn;
  G8 = fromPitchOctave(G, 8) as Spn;
  GG8 = fromPitchOctave(GG, 8) as Spn;
  A8 = fromPitchOctave(A, 8) as Spn;
  AA8 = fromPitchOctave(AA, 8) as Spn;
  B8 = fromPitchOctave(B, 8) as Spn;
  C9 = fromPitchOctave(C, 9) as Spn;
  CC9 = fromPitchOctave(CC, 9) as Spn;
  D9 = fromPitchOctave(D, 9) as Spn;
  DD9 = fromPitchOctave(DD, 9) as Spn;
  E9 = fromPitchOctave(E, 9) as Spn;
  F9 = fromPitchOctave(F, 9) as Spn;
  FF9 = fromPitchOctave(FF, 9) as Spn;
  G9 = fromPitchOctave(G, 9) as Spn;
  GG9 = fromPitchOctave(GG, 9) as Spn;
  A9 = fromPitchOctave(A, 9) as Spn;
  AA9 = fromPitchOctave(AA, 9) as Spn;
  B9 = fromPitchOctave(B, 9) as Spn;

  COMMON = calcCommon();

  deepFreeze(COMMON);
}

function calcCommon(): SpnArray {
  const ret = [];

  for (let octave = -1; octave <= 9; octave++) {
    for (const diatonic of DP.ALL) {
      for (let alt = -1; alt <= -1; alt++) {
        const pitch = fromDPitchAlts(diatonic, alt);
        const spn = fromPitchOctave(pitch, octave) as Spn;

        ret.push(spn);
      }
    }
  }

  return ret as SpnArray;
}

export let COMMON: SpnArray;

export let C_S1: Spn;

export let CC_S1: Spn;

export let D_S1: Spn;

export let DD_S1: Spn;

export let E_S1: Spn;

export let F_S1: Spn;

export let FF_S1: Spn;

export let G_S1: Spn;

export let GG_S1: Spn;

export let A_S1: Spn;

export let AA_S1: Spn;

export let B_S1: Spn;

export let C0: Spn;

export let CC0: Spn;

export let D0: Spn;

export let DD0: Spn;

export let E0: Spn;

export let F0: Spn;

export let FF0: Spn;

export let G0: Spn;

export let GG0: Spn;

export let A0: Spn;

export let AA0: Spn;

export let B0: Spn;

export let C1: Spn;

export let CC1: Spn;

export let D1: Spn;

export let DD1: Spn;

export let E1: Spn;

export let F1: Spn;

export let FF1: Spn;

export let G1: Spn;

export let GG1: Spn;

export let A1: Spn;

export let AA1: Spn;

export let B1: Spn;

export let C2: Spn;

export let CC2: Spn;

export let D2: Spn;

export let DD2: Spn;

export let E2: Spn;

export let F2: Spn;

export let FF2: Spn;

export let G2: Spn;

export let GG2: Spn;

export let A2: Spn;

export let AA2: Spn;

export let B2: Spn;

export let C3: Spn;

export let CC3: Spn;

export let D3: Spn;

export let DD3: Spn;

export let E3: Spn;

export let F3: Spn;

export let FF3: Spn;

export let G3: Spn;

export let GG3: Spn;

export let A3: Spn;

export let AA3: Spn;

export let B3: Spn;

export let C4: Spn;

export let CC4: Spn;

export let D4: Spn;

export let DD4: Spn;

export let E4: Spn;

export let F4: Spn;

export let FF4: Spn;

export let G4: Spn;

export let GG4: Spn;

export let A4: Spn;

export let AA4: Spn;

export let B4: Spn;

export let C5: Spn;

export let CC5: Spn;

export let D5: Spn;

export let DD5: Spn;

export let E5: Spn;

export let F5: Spn;

export let FF5: Spn;

export let G5: Spn;

export let GG5: Spn;

export let A5: Spn;

export let AA5: Spn;

export let B5: Spn;

export let C6: Spn;

export let CC6: Spn;

export let D6: Spn;

export let DD6: Spn;

export let E6: Spn;

export let F6: Spn;

export let FF6: Spn;

export let G6: Spn;

export let GG6: Spn;

export let A6: Spn;

export let AA6: Spn;

export let B6: Spn;

export let C7: Spn;

export let CC7: Spn;

export let D7: Spn;

export let DD7: Spn;

export let E7: Spn;

export let F7: Spn;

export let FF7: Spn;

export let G7: Spn;

export let GG7: Spn;

export let A7: Spn;

export let AA7: Spn;

export let B7: Spn;

export let C8: Spn;

export let CC8: Spn;

export let D8: Spn;

export let DD8: Spn;

export let E8: Spn;

export let F8: Spn;

export let FF8: Spn;

export let G8: Spn;

export let GG8: Spn;

export let A8: Spn;

export let AA8: Spn;

export let B8: Spn;

export let C9: Spn;

export let CC9: Spn;

export let D9: Spn;

export let DD9: Spn;

export let E9: Spn;

export let F9: Spn;

export let FF9: Spn;

export let G9: Spn;

export let GG9: Spn;

export let A9: Spn;

export let AA9: Spn;

export let B9: Spn;
