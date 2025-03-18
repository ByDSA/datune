import type { Spn } from "../../Spn";
import type { Pitch } from "pitches/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { A0, A1, A2, A3, A4, A5, A6, A7, A8, A9, AA0, AA1, AA2, AA3, AA4, AA5, AA6, AA7, AA8, AA9, AA_S1, A_S1, B0, B1, B2, B3, B4, B5, B6, B7, B8, B9, B_S1, C0, C1, C2, C3, C4, C5, C6, C7, C8, C9, CC0, CC1, CC2, CC3, CC4, CC5, CC6, CC7, CC8, CC9, CC_S1, C_S1, D0, D1, D2, D3, D4, D5, D6, D7, D8, D9, DD0, DD1, DD2, DD3, DD4, DD5, DD6, DD7, DD8, DD9, DD_S1, D_S1, E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E_S1, F0, F1, F2, F3, F4, F5, F6, F7, F8, F9, FF0, FF1, FF2, FF3, FF4, FF5, FF6, FF7, FF8, FF9, FF_S1, F_S1, G0, G1, G2, G3, G4, G5, G6, G7, G8, G9, GG0, GG1, GG2, GG3, GG4, GG5, GG6, GG7, GG8, GG9, GG_S1, G_S1 } from "../../constants";

export function fromPitchOctave(pitch: Pitch, octave: number): Spn | null {
  switch (octave) {
    case -1:
      switch (pitch) {
        case P.C: return C_S1;
        case P.CC: return CC_S1;
        case P.D: return D_S1;
        case P.DD: return DD_S1;
        case P.E: return E_S1;
        case P.F: return F_S1;
        case P.FF: return FF_S1;
        case P.G: return G_S1;
        case P.GG: return GG_S1;
        case P.A: return A_S1;
        case P.AA: return AA_S1;
        case P.B: return B_S1;
        default: return null;
      }
    case 0:
      switch (pitch) {
        case P.C: return C0;
        case P.CC: return CC0;
        case P.D: return D0;
        case P.DD: return DD0;
        case P.E: return E0;
        case P.F: return F0;
        case P.FF: return FF0;
        case P.G: return G0;
        case P.GG: return GG0;
        case P.A: return A0;
        case P.AA: return AA0;
        case P.B: return B0;
        default: return null;
      }
    case 1:
      switch (pitch) {
        case P.C: return C1;
        case P.CC: return CC1;
        case P.D: return D1;
        case P.DD: return DD1;
        case P.E: return E1;
        case P.F: return F1;
        case P.FF: return FF1;
        case P.G: return G1;
        case P.GG: return GG1;
        case P.A: return A1;
        case P.AA: return AA1;
        case P.B: return B1;
        default: return null;
      }
    case 2:
      switch (pitch) {
        case P.C: return C2;
        case P.CC: return CC2;
        case P.D: return D2;
        case P.DD: return DD2;
        case P.E: return E2;
        case P.F: return F2;
        case P.FF: return FF2;
        case P.G: return G2;
        case P.GG: return GG2;
        case P.A: return A2;
        case P.AA: return AA2;
        case P.B: return B2;
        default: return null;
      }
    case 3:
      switch (pitch) {
        case P.C: return C3;
        case P.CC: return CC3;
        case P.D: return D3;
        case P.DD: return DD3;
        case P.E: return E3;
        case P.F: return F3;
        case P.FF: return FF3;
        case P.G: return G3;
        case P.GG: return GG3;
        case P.A: return A3;
        case P.AA: return AA3;
        case P.B: return B3;
        default: return null;
      }
    case 4:
      switch (pitch) {
        case P.C: return C4;
        case P.CC: return CC4;
        case P.D: return D4;
        case P.DD: return DD4;
        case P.E: return E4;
        case P.F: return F4;
        case P.FF: return FF4;
        case P.G: return G4;
        case P.GG: return GG4;
        case P.A: return A4;
        case P.AA: return AA4;
        case P.B: return B4;
        default: return null;
      }
    case 5:
      switch (pitch) {
        case P.C: return C5;
        case P.CC: return CC5;
        case P.D: return D5;
        case P.DD: return DD5;
        case P.E: return E5;
        case P.F: return F5;
        case P.FF: return FF5;
        case P.G: return G5;
        case P.GG: return GG5;
        case P.A: return A5;
        case P.AA: return AA5;
        case P.B: return B5;
        default: return null;
      }
    case 6:
      switch (pitch) {
        case P.C: return C6;
        case P.CC: return CC6;
        case P.D: return D6;
        case P.DD: return DD6;
        case P.E: return E6;
        case P.F: return F6;
        case P.FF: return FF6;
        case P.G: return G6;
        case P.GG: return GG6;
        case P.A: return A6;
        case P.AA: return AA6;
        case P.B: return B6;
        default: return null;
      }
    case 7:
      switch (pitch) {
        case P.C: return C7;
        case P.CC: return CC7;
        case P.D: return D7;
        case P.DD: return DD7;
        case P.E: return E7;
        case P.F: return F7;
        case P.FF: return FF7;
        case P.G: return G7;
        case P.GG: return GG7;
        case P.A: return A7;
        case P.AA: return AA7;
        case P.B: return B7;
        default: return null;
      }
    case 8:
      switch (pitch) {
        case P.C: return C8;
        case P.CC: return CC8;
        case P.D: return D8;
        case P.DD: return DD8;
        case P.E: return E8;
        case P.F: return F8;
        case P.FF: return FF8;
        case P.G: return G8;
        case P.GG: return GG8;
        case P.A: return A8;
        case P.AA: return AA8;
        case P.B: return B8;
        default: return null;
      }
    case 9:
      switch (pitch) {
        case P.C: return C9;
        case P.CC: return CC9;
        case P.D: return D9;
        case P.DD: return DD9;
        case P.E: return E9;
        case P.F: return F9;
        case P.FF: return FF9;
        case P.G: return G9;
        case P.GG: return GG9;
        case P.A: return A9;
        case P.AA: return AA9;
        case P.B: return B9;
        default: return null;
      }
    default: return null;
  }
}
