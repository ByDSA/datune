import type { MidiPitch } from "./MidiPitch";
import { lock, lockr } from "datils/datatypes";
import { Spns as N } from "@datune/core";
import { from } from "./building";

export function initialize() {
  if (C0)
    throw new Error("Already initialized");

  C0 = lockr(from(N.C_S1, 0));
  CC0 = lockr(from(N.CC_S1, 0));
  D0 = lockr(from(N.D_S1, 0));
  DD0 = lockr(from(N.DD_S1, 0));
  E0 = lockr(from(N.E_S1, 0));
  F0 = lockr(from(N.F_S1, 0));
  FF0 = lockr(from(N.FF_S1, 0));
  G0 = lockr(from(N.G_S1, 0));
  GG0 = lockr(from(N.GG_S1, 0));
  A0 = lockr(from(N.A_S1, 0));
  AA0 = lockr(from(N.AA_S1, 0));
  B0 = lockr(from(N.B_S1, 0));
  C1 = lockr(from(N.C0, 0));
  CC1 = lockr(from(N.CC0, 0));
  D1 = lockr(from(N.D0, 0));
  DD1 = lockr(from(N.DD0, 0));
  E1 = lockr(from(N.E0, 0));
  F1 = lockr(from(N.F0, 0));
  FF1 = lockr(from(N.FF0, 0));
  G1 = lockr(from(N.G0, 0));
  GG1 = lockr(from(N.GG0, 0));
  A1 = lockr(from(N.A0, 0));
  AA1 = lockr(from(N.AA0, 0));
  B1 = lockr(from(N.B0, 0));
  C2 = lockr(from(N.C1, 0));
  CC2 = lockr(from(N.CC1, 0));
  D2 = lockr(from(N.D1, 0));
  DD2 = lockr(from(N.DD1, 0));
  E2 = lockr(from(N.E1, 0));
  F2 = lockr(from(N.F1, 0));
  FF2 = lockr(from(N.FF1, 0));
  G2 = lockr(from(N.G1, 0));
  GG2 = lockr(from(N.GG1, 0));
  A2 = lockr(from(N.A1, 0));
  AA2 = lockr(from(N.AA1, 0));
  B2 = lockr(from(N.B1, 0));
  C3 = lockr(from(N.C2, 0));
  CC3 = lockr(from(N.CC2, 0));
  D3 = lockr(from(N.D2, 0));
  DD3 = lockr(from(N.DD2, 0));
  E3 = lockr(from(N.E2, 0));
  F3 = lockr(from(N.F2, 0));
  FF3 = lockr(from(N.FF2, 0));
  G3 = lockr(from(N.G2, 0));
  GG3 = lockr(from(N.GG2, 0));
  A3 = lockr(from(N.A2, 0));
  AA3 = lockr(from(N.AA2, 0));
  B3 = lockr(from(N.B2, 0));
  C4 = lockr(from(N.C3, 0));
  CC4 = lockr(from(N.CC3, 0));
  D4 = lockr(from(N.D3, 0));
  DD4 = lockr(from(N.DD3, 0));
  E4 = lockr(from(N.E3, 0));
  F4 = lockr(from(N.F3, 0));
  FF4 = lockr(from(N.FF3, 0));
  G4 = lockr(from(N.G3, 0));
  GG4 = lockr(from(N.GG3, 0));
  A4 = lockr(from(N.A3, 0));
  AA4 = lockr(from(N.AA3, 0));
  B4 = lockr(from(N.B3, 0));
  C5 = lockr(from(N.C4, 0));
  CC5 = lockr(from(N.CC4, 0));
  D5 = lockr(from(N.D4, 0));
  DD5 = lockr(from(N.DD4, 0));
  E5 = lockr(from(N.E4, 0));
  F5 = lockr(from(N.F4, 0));
  FF5 = lockr(from(N.FF4, 0));
  G5 = lockr(from(N.G4, 0));
  GG5 = lockr(from(N.GG4, 0));
  A5 = lockr(from(N.A4, 0));
  AA5 = lockr(from(N.AA4, 0));
  B5 = lockr(from(N.B4, 0));
  C6 = lockr(from(N.C5, 0));
  CC6 = lockr(from(N.CC5, 0));
  D6 = lockr(from(N.D5, 0));
  DD6 = lockr(from(N.DD5, 0));
  E6 = lockr(from(N.E5, 0));
  F6 = lockr(from(N.F5, 0));
  FF6 = lockr(from(N.FF5, 0));
  G6 = lockr(from(N.G5, 0));
  GG6 = lockr(from(N.GG5, 0));
  A6 = lockr(from(N.A5, 0));
  AA6 = lockr(from(N.AA5, 0));
  B6 = lockr(from(N.B5, 0));
  C7 = lockr(from(N.C6, 0));
  CC7 = lockr(from(N.CC6, 0));
  D7 = lockr(from(N.D6, 0));
  DD7 = lockr(from(N.DD6, 0));
  E7 = lockr(from(N.E6, 0));
  F7 = lockr(from(N.F6, 0));
  FF7 = lockr(from(N.FF6, 0));
  G7 = lockr(from(N.G6, 0));
  GG7 = lockr(from(N.GG6, 0));
  A7 = lockr(from(N.A6, 0));
  AA7 = lockr(from(N.AA6, 0));
  B7 = lockr(from(N.B6, 0));
  C8 = lockr(from(N.C7, 0));
  CC8 = lockr(from(N.CC7, 0));
  D8 = lockr(from(N.D7, 0));
  DD8 = lockr(from(N.DD7, 0));
  E8 = lockr(from(N.E7, 0));
  F8 = lockr(from(N.F7, 0));
  FF8 = lockr(from(N.FF7, 0));
  G8 = lockr(from(N.G7, 0));
  GG8 = lockr(from(N.GG7, 0));
  A8 = lockr(from(N.A7, 0));
  AA8 = lockr(from(N.AA7, 0));
  B8 = lockr(from(N.B7, 0));
  C9 = lockr(from(N.C8, 0));
  CC9 = lockr(from(N.CC8, 0));
  D9 = lockr(from(N.D8, 0));
  DD9 = lockr(from(N.DD8, 0));
  E9 = lockr(from(N.E8, 0));
  F9 = lockr(from(N.F8, 0));
  FF9 = lockr(from(N.FF8, 0));
  G9 = lockr(from(N.G8, 0));
  GG9 = lockr(from(N.GG8, 0));
  A9 = lockr(from(N.A8, 0));
  AA9 = lockr(from(N.AA8, 0));
  B9 = lockr(from(N.B8, 0));
  C10 = lockr(from(N.C9, 0));
  CC10 = lockr(from(N.CC9, 0));
  D10 = lockr(from(N.D9, 0));
  DD10 = lockr(from(N.DD9, 0));
  E10 = lockr(from(N.E9, 0));
  F10 = lockr(from(N.F9, 0));
  FF10 = lockr(from(N.FF9, 0));
  G10 = lockr(from(N.G9, 0));

  MIN = lock(C0);
  MAX = lock(G10);
}

export let C0: Readonly<MidiPitch>;

export let CC0: Readonly<MidiPitch>;

export let D0: Readonly<MidiPitch>;

export let DD0: Readonly<MidiPitch>;

export let E0: Readonly<MidiPitch>;

export let F0: Readonly<MidiPitch>;

export let FF0: Readonly<MidiPitch>;

export let G0: Readonly<MidiPitch>;

export let GG0: Readonly<MidiPitch>;

export let A0: Readonly<MidiPitch>;

export let AA0: Readonly<MidiPitch>;

export let B0: Readonly<MidiPitch>;

export let C1: Readonly<MidiPitch>;

export let CC1: Readonly<MidiPitch>;

export let D1: Readonly<MidiPitch>;

export let DD1: Readonly<MidiPitch>;

export let E1: Readonly<MidiPitch>;

export let F1: Readonly<MidiPitch>;

export let FF1: Readonly<MidiPitch>;

export let G1: Readonly<MidiPitch>;

export let GG1: Readonly<MidiPitch>;

export let A1: Readonly<MidiPitch>;

export let AA1: Readonly<MidiPitch>;

export let B1: Readonly<MidiPitch>;

export let C2: Readonly<MidiPitch>;

export let CC2: Readonly<MidiPitch>;

export let D2: Readonly<MidiPitch>;

export let DD2: Readonly<MidiPitch>;

export let E2: Readonly<MidiPitch>;

export let F2: Readonly<MidiPitch>;

export let FF2: Readonly<MidiPitch>;

export let G2: Readonly<MidiPitch>;

export let GG2: Readonly<MidiPitch>;

export let A2: Readonly<MidiPitch>;

export let AA2: Readonly<MidiPitch>;

export let B2: Readonly<MidiPitch>;

export let C3: Readonly<MidiPitch>;

export let CC3: Readonly<MidiPitch>;

export let D3: Readonly<MidiPitch>;

export let DD3: Readonly<MidiPitch>;

export let E3: Readonly<MidiPitch>;

export let F3: Readonly<MidiPitch>;

export let FF3: Readonly<MidiPitch>;

export let G3: Readonly<MidiPitch>;

export let GG3: Readonly<MidiPitch>;

export let A3: Readonly<MidiPitch>;

export let AA3: Readonly<MidiPitch>;

export let B3: Readonly<MidiPitch>;

export let C4: Readonly<MidiPitch>;

export let CC4: Readonly<MidiPitch>;

export let D4: Readonly<MidiPitch>;

export let DD4: Readonly<MidiPitch>;

export let E4: Readonly<MidiPitch>;

export let F4: Readonly<MidiPitch>;

export let FF4: Readonly<MidiPitch>;

export let G4: Readonly<MidiPitch>;

export let GG4: Readonly<MidiPitch>;

export let A4: Readonly<MidiPitch>;

export let AA4: Readonly<MidiPitch>;

export let B4: Readonly<MidiPitch>;

export let C5: Readonly<MidiPitch>;

export let CC5: Readonly<MidiPitch>;

export let D5: Readonly<MidiPitch>;

export let DD5: Readonly<MidiPitch>;

export let E5: Readonly<MidiPitch>;

export let F5: Readonly<MidiPitch>;

export let FF5: Readonly<MidiPitch>;

export let G5: Readonly<MidiPitch>;

export let GG5: Readonly<MidiPitch>;

export let A5: Readonly<MidiPitch>;

export let AA5: Readonly<MidiPitch>;

export let B5: Readonly<MidiPitch>;

export let C6: Readonly<MidiPitch>;

export let CC6: Readonly<MidiPitch>;

export let D6: Readonly<MidiPitch>;

export let DD6: Readonly<MidiPitch>;

export let E6: Readonly<MidiPitch>;

export let F6: Readonly<MidiPitch>;

export let FF6: Readonly<MidiPitch>;

export let G6: Readonly<MidiPitch>;

export let GG6: Readonly<MidiPitch>;

export let A6: Readonly<MidiPitch>;

export let AA6: Readonly<MidiPitch>;

export let B6: Readonly<MidiPitch>;

export let C7: Readonly<MidiPitch>;

export let CC7: Readonly<MidiPitch>;

export let D7: Readonly<MidiPitch>;

export let DD7: Readonly<MidiPitch>;

export let E7: Readonly<MidiPitch>;

export let F7: Readonly<MidiPitch>;

export let FF7: Readonly<MidiPitch>;

export let G7: Readonly<MidiPitch>;

export let GG7: Readonly<MidiPitch>;

export let A7: Readonly<MidiPitch>;

export let AA7: Readonly<MidiPitch>;

export let B7: Readonly<MidiPitch>;

export let C8: Readonly<MidiPitch>;

export let CC8: Readonly<MidiPitch>;

export let D8: Readonly<MidiPitch>;

export let DD8: Readonly<MidiPitch>;

export let E8: Readonly<MidiPitch>;

export let F8: Readonly<MidiPitch>;

export let FF8: Readonly<MidiPitch>;

export let G8: Readonly<MidiPitch>;

export let GG8: Readonly<MidiPitch>;

export let A8: Readonly<MidiPitch>;

export let AA8: Readonly<MidiPitch>;

export let B8: Readonly<MidiPitch>;

export let C9: Readonly<MidiPitch>;

export let CC9: Readonly<MidiPitch>;

export let D9: Readonly<MidiPitch>;

export let DD9: Readonly<MidiPitch>;

export let E9: Readonly<MidiPitch>;

export let F9: Readonly<MidiPitch>;

export let FF9: Readonly<MidiPitch>;

export let G9: Readonly<MidiPitch>;

export let GG9: Readonly<MidiPitch>;

export let A9: Readonly<MidiPitch>;

export let AA9: Readonly<MidiPitch>;

export let B9: Readonly<MidiPitch>;

export let C10: Readonly<MidiPitch>;

export let CC10: Readonly<MidiPitch>;

export let D10: Readonly<MidiPitch>;

export let DD10: Readonly<MidiPitch>;

export let E10: Readonly<MidiPitch>;

export let F10: Readonly<MidiPitch>;

export let FF10: Readonly<MidiPitch>;

export let G10: Readonly<MidiPitch>;

export let MIN: Readonly<MidiPitch>;

export let MAX: Readonly<MidiPitch>;
