import { A0, A1, A2, A3, A4, A5, A6, A7, A8, A9, AA0, AA1, AA2, AA3, AA4, AA5, AA6, AA7, AA8, AA9, AA_S1, A_S1, B0, B1, B2, B3, B4, B5, B6, B7, B8, B9, B_S1, C0, C1, C2, C3, C4, C5, C6, C7, C8, C9, CC0, CC1, CC2, CC3, CC4, CC5, CC6, CC7, CC8, CC9, CC_S1, C_S1, D0, D1, D2, D3, D4, D5, D6, D7, D8, D9, DD0, DD1, DD2, DD3, DD4, DD5, DD6, DD7, DD8, DD9, DD_S1, D_S1, E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E_S1, F0, F1, F2, F3, F4, F5, F6, F7, F8, F9, FF0, FF1, FF2, FF3, FF4, FF5, FF6, FF7, FF8, FF9, FF_S1, F_S1, G0, G1, G2, G3, G4, G5, G6, G7, G8, G9, GG0, GG1, GG2, GG3, GG4, GG5, GG6, GG7, GG8, GG9, GG_S1, G_S1 } from "../../constants";
import type { SPN } from "../../SPN";
import { Pitches, Pitch } from "pitches/chromatic";

export function fromPitchOctave(pitch: Pitch, octave: number): SPN | null {
  switch (octave) {
    case -1:
      switch (pitch) {
        case Pitches.C: return C_S1;
        case Pitches.CC: return CC_S1;
        case Pitches.D: return D_S1;
        case Pitches.DD: return DD_S1;
        case Pitches.E: return E_S1;
        case Pitches.F: return F_S1;
        case Pitches.FF: return FF_S1;
        case Pitches.G: return G_S1;
        case Pitches.GG: return GG_S1;
        case Pitches.A: return A_S1;
        case Pitches.AA: return AA_S1;
        case Pitches.B: return B_S1;
        default: return null;
      }
    case 0:
      switch (pitch) {
        case Pitches.C: return C0;
        case Pitches.CC: return CC0;
        case Pitches.D: return D0;
        case Pitches.DD: return DD0;
        case Pitches.E: return E0;
        case Pitches.F: return F0;
        case Pitches.FF: return FF0;
        case Pitches.G: return G0;
        case Pitches.GG: return GG0;
        case Pitches.A: return A0;
        case Pitches.AA: return AA0;
        case Pitches.B: return B0;
        default: return null;
      }
    case 1:
      switch (pitch) {
        case Pitches.C: return C1;
        case Pitches.CC: return CC1;
        case Pitches.D: return D1;
        case Pitches.DD: return DD1;
        case Pitches.E: return E1;
        case Pitches.F: return F1;
        case Pitches.FF: return FF1;
        case Pitches.G: return G1;
        case Pitches.GG: return GG1;
        case Pitches.A: return A1;
        case Pitches.AA: return AA1;
        case Pitches.B: return B1;
        default: return null;
      }
    case 2:
      switch (pitch) {
        case Pitches.C: return C2;
        case Pitches.CC: return CC2;
        case Pitches.D: return D2;
        case Pitches.DD: return DD2;
        case Pitches.E: return E2;
        case Pitches.F: return F2;
        case Pitches.FF: return FF2;
        case Pitches.G: return G2;
        case Pitches.GG: return GG2;
        case Pitches.A: return A2;
        case Pitches.AA: return AA2;
        case Pitches.B: return B2;
        default: return null;
      }
    case 3:
      switch (pitch) {
        case Pitches.C: return C3;
        case Pitches.CC: return CC3;
        case Pitches.D: return D3;
        case Pitches.DD: return DD3;
        case Pitches.E: return E3;
        case Pitches.F: return F3;
        case Pitches.FF: return FF3;
        case Pitches.G: return G3;
        case Pitches.GG: return GG3;
        case Pitches.A: return A3;
        case Pitches.AA: return AA3;
        case Pitches.B: return B3;
        default: return null;
      }
    case 4:
      switch (pitch) {
        case Pitches.C: return C4;
        case Pitches.CC: return CC4;
        case Pitches.D: return D4;
        case Pitches.DD: return DD4;
        case Pitches.E: return E4;
        case Pitches.F: return F4;
        case Pitches.FF: return FF4;
        case Pitches.G: return G4;
        case Pitches.GG: return GG4;
        case Pitches.A: return A4;
        case Pitches.AA: return AA4;
        case Pitches.B: return B4;
        default: return null;
      }
    case 5:
      switch (pitch) {
        case Pitches.C: return C5;
        case Pitches.CC: return CC5;
        case Pitches.D: return D5;
        case Pitches.DD: return DD5;
        case Pitches.E: return E5;
        case Pitches.F: return F5;
        case Pitches.FF: return FF5;
        case Pitches.G: return G5;
        case Pitches.GG: return GG5;
        case Pitches.A: return A5;
        case Pitches.AA: return AA5;
        case Pitches.B: return B5;
        default: return null;
      }
    case 6:
      switch (pitch) {
        case Pitches.C: return C6;
        case Pitches.CC: return CC6;
        case Pitches.D: return D6;
        case Pitches.DD: return DD6;
        case Pitches.E: return E6;
        case Pitches.F: return F6;
        case Pitches.FF: return FF6;
        case Pitches.G: return G6;
        case Pitches.GG: return GG6;
        case Pitches.A: return A6;
        case Pitches.AA: return AA6;
        case Pitches.B: return B6;
        default: return null;
      }
    case 7:
      switch (pitch) {
        case Pitches.C: return C7;
        case Pitches.CC: return CC7;
        case Pitches.D: return D7;
        case Pitches.DD: return DD7;
        case Pitches.E: return E7;
        case Pitches.F: return F7;
        case Pitches.FF: return FF7;
        case Pitches.G: return G7;
        case Pitches.GG: return GG7;
        case Pitches.A: return A7;
        case Pitches.AA: return AA7;
        case Pitches.B: return B7;
        default: return null;
      }
    case 8:
      switch (pitch) {
        case Pitches.C: return C8;
        case Pitches.CC: return CC8;
        case Pitches.D: return D8;
        case Pitches.DD: return DD8;
        case Pitches.E: return E8;
        case Pitches.F: return F8;
        case Pitches.FF: return FF8;
        case Pitches.G: return G8;
        case Pitches.GG: return GG8;
        case Pitches.A: return A8;
        case Pitches.AA: return AA8;
        case Pitches.B: return B8;
        default: return null;
      }
    case 9:
      switch (pitch) {
        case Pitches.C: return C9;
        case Pitches.CC: return CC9;
        case Pitches.D: return D9;
        case Pitches.DD: return DD9;
        case Pitches.E: return E9;
        case Pitches.F: return F9;
        case Pitches.FF: return FF9;
        case Pitches.G: return G9;
        case Pitches.GG: return GG9;
        case Pitches.A: return A9;
        case Pitches.AA: return AA9;
        case Pitches.B: return B9;
        default: return null;
      }
    default: return null;
  }
}
