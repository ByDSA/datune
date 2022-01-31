/* eslint-disable import/no-mutable-exports */
import { A0 as SPN_A0, A1 as SPN_A1, A2 as SPN_A2, A3 as SPN_A3, A4 as SPN_A4, A5 as SPN_A5, A6 as SPN_A6, A7 as SPN_A7, A8 as SPN_A8, AA0 as SPN_AA0, AA1 as SPN_AA1, AA2 as SPN_AA2, AA3 as SPN_AA3, AA4 as SPN_AA4, AA5 as SPN_AA5, AA6 as SPN_AA6, AA7 as SPN_AA7, AA8 as SPN_AA8, AA_S1 as SPN_AA_S1, A_S1 as SPN_A_S1, B0 as SPN_B0, B1 as SPN_B1, B2 as SPN_B2, B3 as SPN_B3, B4 as SPN_B4, B5 as SPN_B5, B6 as SPN_B6, B7 as SPN_B7, B8 as SPN_B8, B_S1 as SPN_B_S1, C0 as SPN_C0, C1 as SPN_C1, C2 as SPN_C2, C3 as SPN_C3, C4 as SPN_C4, C5 as SPN_C5, C6 as SPN_C6, C7 as SPN_C7, C8 as SPN_C8, C9 as SPN_C9, CC0 as SPN_CC0, CC1 as SPN_CC1, CC2 as SPN_CC2, CC3 as SPN_CC3, CC4 as SPN_CC4, CC5 as SPN_CC5, CC6 as SPN_CC6, CC7 as SPN_CC7, CC8 as SPN_CC8, CC9 as SPN_CC9, CC_S1 as SPN_CC_S1, C_S1 as SPN_C_S1, D0 as SPN_D0, D1 as SPN_D1, D2 as SPN_D2, D3 as SPN_D3, D4 as SPN_D4, D5 as SPN_D5, D6 as SPN_D6, D7 as SPN_D7, D8 as SPN_D8, D9 as SPN_D9, DD0 as SPN_DD0, DD1 as SPN_DD1, DD2 as SPN_DD2, DD3 as SPN_DD3, DD4 as SPN_DD4, DD5 as SPN_DD5, DD6 as SPN_DD6, DD7 as SPN_DD7, DD8 as SPN_DD8, DD9 as SPN_DD9, DD_S1 as SPN_DD_S1, D_S1 as SPN_D_S1, E0 as SPN_E0, E1 as SPN_E1, E2 as SPN_E2, E3 as SPN_E3, E4 as SPN_E4, E5 as SPN_E5, E6 as SPN_E6, E7 as SPN_E7, E8 as SPN_E8, E9 as SPN_E9, E_S1 as SPN_E_S1, F0 as SPN_F0, F1 as SPN_F1, F2 as SPN_F2, F3 as SPN_F3, F4 as SPN_F4, F5 as SPN_F5, F6 as SPN_F6, F7 as SPN_F7, F8 as SPN_F8, F9 as SPN_F9, FF0 as SPN_FF0, FF1 as SPN_FF1, FF2 as SPN_FF2, FF3 as SPN_FF3, FF4 as SPN_FF4, FF5 as SPN_FF5, FF6 as SPN_FF6, FF7 as SPN_FF7, FF8 as SPN_FF8, FF9 as SPN_FF9, FF_S1 as SPN_FF_S1, F_S1 as SPN_F_S1, G0 as SPN_G0, G1 as SPN_G1, G2 as SPN_G2, G3 as SPN_G3, G4 as SPN_G4, G5 as SPN_G5, G6 as SPN_G6, G7 as SPN_G7, G8 as SPN_G8, G9 as SPN_G9, GG0 as SPN_GG0, GG1 as SPN_GG1, GG2 as SPN_GG2, GG3 as SPN_GG3, GG4 as SPN_GG4, GG5 as SPN_GG5, GG6 as SPN_GG6, GG7 as SPN_GG7, GG8 as SPN_GG8, GG_S1 as SPN_GG_S1, G_S1 as SPN_G_S1 } from "@datune/core/spns/chromatic";
import { lock, lockr } from "@datune/utils";
import { from } from "./building";
import Pitch from "./MidiPitch";

export function initialize() {
  C0 = lockr(from(SPN_C_S1, 0));
  CC0 = lockr(from(SPN_CC_S1, 0));
  D0 = lockr(from(SPN_D_S1, 0));
  DD0 = lockr(from(SPN_DD_S1, 0));
  E0 = lockr(from(SPN_E_S1, 0));
  F0 = lockr(from(SPN_F_S1, 0));
  FF0 = lockr(from(SPN_FF_S1, 0));
  G0 = lockr(from(SPN_G_S1, 0));
  GG0 = lockr(from(SPN_GG_S1, 0));
  A0 = lockr(from(SPN_A_S1, 0));
  AA0 = lockr(from(SPN_AA_S1, 0));
  B0 = lockr(from(SPN_B_S1, 0));
  C1 = lockr(from(SPN_C0, 0));
  CC1 = lockr(from(SPN_CC0, 0));
  D1 = lockr(from(SPN_D0, 0));
  DD1 = lockr(from(SPN_DD0, 0));
  E1 = lockr(from(SPN_E0, 0));
  F1 = lockr(from(SPN_F0, 0));
  FF1 = lockr(from(SPN_FF0, 0));
  G1 = lockr(from(SPN_G0, 0));
  GG1 = lockr(from(SPN_GG0, 0));
  A1 = lockr(from(SPN_A0, 0));
  AA1 = lockr(from(SPN_AA0, 0));
  B1 = lockr(from(SPN_B0, 0));
  C2 = lockr(from(SPN_C1, 0));
  CC2 = lockr(from(SPN_CC1, 0));
  D2 = lockr(from(SPN_D1, 0));
  DD2 = lockr(from(SPN_DD1, 0));
  E2 = lockr(from(SPN_E1, 0));
  F2 = lockr(from(SPN_F1, 0));
  FF2 = lockr(from(SPN_FF1, 0));
  G2 = lockr(from(SPN_G1, 0));
  GG2 = lockr(from(SPN_GG1, 0));
  A2 = lockr(from(SPN_A1, 0));
  AA2 = lockr(from(SPN_AA1, 0));
  B2 = lockr(from(SPN_B1, 0));
  C3 = lockr(from(SPN_C2, 0));
  CC3 = lockr(from(SPN_CC2, 0));
  D3 = lockr(from(SPN_D2, 0));
  DD3 = lockr(from(SPN_DD2, 0));
  E3 = lockr(from(SPN_E2, 0));
  F3 = lockr(from(SPN_F2, 0));
  FF3 = lockr(from(SPN_FF2, 0));
  G3 = lockr(from(SPN_G2, 0));
  GG3 = lockr(from(SPN_GG2, 0));
  A3 = lockr(from(SPN_A2, 0));
  AA3 = lockr(from(SPN_AA2, 0));
  B3 = lockr(from(SPN_B2, 0));
  C4 = lockr(from(SPN_C3, 0));
  CC4 = lockr(from(SPN_CC3, 0));
  D4 = lockr(from(SPN_D3, 0));
  DD4 = lockr(from(SPN_DD3, 0));
  E4 = lockr(from(SPN_E3, 0));
  F4 = lockr(from(SPN_F3, 0));
  FF4 = lockr(from(SPN_FF3, 0));
  G4 = lockr(from(SPN_G3, 0));
  GG4 = lockr(from(SPN_GG3, 0));
  A4 = lockr(from(SPN_A3, 0));
  AA4 = lockr(from(SPN_AA3, 0));
  B4 = lockr(from(SPN_B3, 0));
  C5 = lockr(from(SPN_C4, 0));
  CC5 = lockr(from(SPN_CC4, 0));
  D5 = lockr(from(SPN_D4, 0));
  DD5 = lockr(from(SPN_DD4, 0));
  E5 = lockr(from(SPN_E4, 0));
  F5 = lockr(from(SPN_F4, 0));
  FF5 = lockr(from(SPN_FF4, 0));
  G5 = lockr(from(SPN_G4, 0));
  GG5 = lockr(from(SPN_GG4, 0));
  A5 = lockr(from(SPN_A4, 0));
  AA5 = lockr(from(SPN_AA4, 0));
  B5 = lockr(from(SPN_B4, 0));
  C6 = lockr(from(SPN_C5, 0));
  CC6 = lockr(from(SPN_CC5, 0));
  D6 = lockr(from(SPN_D5, 0));
  DD6 = lockr(from(SPN_DD5, 0));
  E6 = lockr(from(SPN_E5, 0));
  F6 = lockr(from(SPN_F5, 0));
  FF6 = lockr(from(SPN_FF5, 0));
  G6 = lockr(from(SPN_G5, 0));
  GG6 = lockr(from(SPN_GG5, 0));
  A6 = lockr(from(SPN_A5, 0));
  AA6 = lockr(from(SPN_AA5, 0));
  B6 = lockr(from(SPN_B5, 0));
  C7 = lockr(from(SPN_C6, 0));
  CC7 = lockr(from(SPN_CC6, 0));
  D7 = lockr(from(SPN_D6, 0));
  DD7 = lockr(from(SPN_DD6, 0));
  E7 = lockr(from(SPN_E6, 0));
  F7 = lockr(from(SPN_F6, 0));
  FF7 = lockr(from(SPN_FF6, 0));
  G7 = lockr(from(SPN_G6, 0));
  GG7 = lockr(from(SPN_GG6, 0));
  A7 = lockr(from(SPN_A6, 0));
  AA7 = lockr(from(SPN_AA6, 0));
  B7 = lockr(from(SPN_B6, 0));
  C8 = lockr(from(SPN_C7, 0));
  CC8 = lockr(from(SPN_CC7, 0));
  D8 = lockr(from(SPN_D7, 0));
  DD8 = lockr(from(SPN_DD7, 0));
  E8 = lockr(from(SPN_E7, 0));
  F8 = lockr(from(SPN_F7, 0));
  FF8 = lockr(from(SPN_FF7, 0));
  G8 = lockr(from(SPN_G7, 0));
  GG8 = lockr(from(SPN_GG7, 0));
  A8 = lockr(from(SPN_A7, 0));
  AA8 = lockr(from(SPN_AA7, 0));
  B8 = lockr(from(SPN_B7, 0));
  C9 = lockr(from(SPN_C8, 0));
  CC9 = lockr(from(SPN_CC8, 0));
  D9 = lockr(from(SPN_D8, 0));
  DD9 = lockr(from(SPN_DD8, 0));
  E9 = lockr(from(SPN_E8, 0));
  F9 = lockr(from(SPN_F8, 0));
  FF9 = lockr(from(SPN_FF8, 0));
  G9 = lockr(from(SPN_G8, 0));
  GG9 = lockr(from(SPN_GG8, 0));
  A9 = lockr(from(SPN_A8, 0));
  AA9 = lockr(from(SPN_AA8, 0));
  B9 = lockr(from(SPN_B8, 0));
  C10 = lockr(from(SPN_C9, 0));
  CC10 = lockr(from(SPN_CC9, 0));
  D10 = lockr(from(SPN_D9, 0));
  DD10 = lockr(from(SPN_DD9, 0));
  E10 = lockr(from(SPN_E9, 0));
  F10 = lockr(from(SPN_F9, 0));
  FF10 = lockr(from(SPN_FF9, 0));
  G10 = lockr(from(SPN_G9, 0));

  MIN = lock(C0);
  MAX = lock(G10);
}

export let C0: Readonly<Pitch>;

export let CC0: Readonly<Pitch>;

export let D0: Readonly<Pitch>;

export let DD0: Readonly<Pitch>;

export let E0: Readonly<Pitch>;

export let F0: Readonly<Pitch>;

export let FF0: Readonly<Pitch>;

export let G0: Readonly<Pitch>;

export let GG0: Readonly<Pitch>;

export let A0: Readonly<Pitch>;

export let AA0: Readonly<Pitch>;

export let B0: Readonly<Pitch>;

export let C1: Readonly<Pitch>;

export let CC1: Readonly<Pitch>;

export let D1: Readonly<Pitch>;

export let DD1: Readonly<Pitch>;

export let E1: Readonly<Pitch>;

export let F1: Readonly<Pitch>;

export let FF1: Readonly<Pitch>;

export let G1: Readonly<Pitch>;

export let GG1: Readonly<Pitch>;

export let A1: Readonly<Pitch>;

export let AA1: Readonly<Pitch>;

export let B1: Readonly<Pitch>;

export let C2: Readonly<Pitch>;

export let CC2: Readonly<Pitch>;

export let D2: Readonly<Pitch>;

export let DD2: Readonly<Pitch>;

export let E2: Readonly<Pitch>;

export let F2: Readonly<Pitch>;

export let FF2: Readonly<Pitch>;

export let G2: Readonly<Pitch>;

export let GG2: Readonly<Pitch>;

export let A2: Readonly<Pitch>;

export let AA2: Readonly<Pitch>;

export let B2: Readonly<Pitch>;

export let C3: Readonly<Pitch>;

export let CC3: Readonly<Pitch>;

export let D3: Readonly<Pitch>;

export let DD3: Readonly<Pitch>;

export let E3: Readonly<Pitch>;

export let F3: Readonly<Pitch>;

export let FF3: Readonly<Pitch>;

export let G3: Readonly<Pitch>;

export let GG3: Readonly<Pitch>;

export let A3: Readonly<Pitch>;

export let AA3: Readonly<Pitch>;

export let B3: Readonly<Pitch>;

export let C4: Readonly<Pitch>;

export let CC4: Readonly<Pitch>;

export let D4: Readonly<Pitch>;

export let DD4: Readonly<Pitch>;

export let E4: Readonly<Pitch>;

export let F4: Readonly<Pitch>;

export let FF4: Readonly<Pitch>;

export let G4: Readonly<Pitch>;

export let GG4: Readonly<Pitch>;

export let A4: Readonly<Pitch>;

export let AA4: Readonly<Pitch>;

export let B4: Readonly<Pitch>;

export let C5: Readonly<Pitch>;

export let CC5: Readonly<Pitch>;

export let D5: Readonly<Pitch>;

export let DD5: Readonly<Pitch>;

export let E5: Readonly<Pitch>;

export let F5: Readonly<Pitch>;

export let FF5: Readonly<Pitch>;

export let G5: Readonly<Pitch>;

export let GG5: Readonly<Pitch>;

export let A5: Readonly<Pitch>;

export let AA5: Readonly<Pitch>;

export let B5: Readonly<Pitch>;

export let C6: Readonly<Pitch>;

export let CC6: Readonly<Pitch>;

export let D6: Readonly<Pitch>;

export let DD6: Readonly<Pitch>;

export let E6: Readonly<Pitch>;

export let F6: Readonly<Pitch>;

export let FF6: Readonly<Pitch>;

export let G6: Readonly<Pitch>;

export let GG6: Readonly<Pitch>;

export let A6: Readonly<Pitch>;

export let AA6: Readonly<Pitch>;

export let B6: Readonly<Pitch>;

export let C7: Readonly<Pitch>;

export let CC7: Readonly<Pitch>;

export let D7: Readonly<Pitch>;

export let DD7: Readonly<Pitch>;

export let E7: Readonly<Pitch>;

export let F7: Readonly<Pitch>;

export let FF7: Readonly<Pitch>;

export let G7: Readonly<Pitch>;

export let GG7: Readonly<Pitch>;

export let A7: Readonly<Pitch>;

export let AA7: Readonly<Pitch>;

export let B7: Readonly<Pitch>;

export let C8: Readonly<Pitch>;

export let CC8: Readonly<Pitch>;

export let D8: Readonly<Pitch>;

export let DD8: Readonly<Pitch>;

export let E8: Readonly<Pitch>;

export let F8: Readonly<Pitch>;

export let FF8: Readonly<Pitch>;

export let G8: Readonly<Pitch>;

export let GG8: Readonly<Pitch>;

export let A8: Readonly<Pitch>;

export let AA8: Readonly<Pitch>;

export let B8: Readonly<Pitch>;

export let C9: Readonly<Pitch>;

export let CC9: Readonly<Pitch>;

export let D9: Readonly<Pitch>;

export let DD9: Readonly<Pitch>;

export let E9: Readonly<Pitch>;

export let F9: Readonly<Pitch>;

export let FF9: Readonly<Pitch>;

export let G9: Readonly<Pitch>;

export let GG9: Readonly<Pitch>;

export let A9: Readonly<Pitch>;

export let AA9: Readonly<Pitch>;

export let B9: Readonly<Pitch>;

export let C10: Readonly<Pitch>;

export let CC10: Readonly<Pitch>;

export let D10: Readonly<Pitch>;

export let DD10: Readonly<Pitch>;

export let E10: Readonly<Pitch>;

export let F10: Readonly<Pitch>;

export let FF10: Readonly<Pitch>;

export let G10: Readonly<Pitch>;

export let MIN: Readonly<Pitch>;

export let MAX: Readonly<Pitch>;
