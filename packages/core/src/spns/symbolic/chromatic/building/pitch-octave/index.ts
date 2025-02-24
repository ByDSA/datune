import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG, Pitch } from "pitches/chromatic";
import { A0, A1, A2, A3, A4, A5, A6, A7, A8, A9, AA0, AA1, AA2, AA3, AA4, AA5, AA6, AA7, AA8, AA9, AA_S1, A_S1, B0, B1, B2, B3, B4, B5, B6, B7, B8, B9, B_S1, C0, C1, C2, C3, C4, C5, C6, C7, C8, C9, CC0, CC1, CC2, CC3, CC4, CC5, CC6, CC7, CC8, CC9, CC_S1, C_S1, D0, D1, D2, D3, D4, D5, D6, D7, D8, D9, DD0, DD1, DD2, DD3, DD4, DD5, DD6, DD7, DD8, DD9, DD_S1, D_S1, E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E_S1, F0, F1, F2, F3, F4, F5, F6, F7, F8, F9, FF0, FF1, FF2, FF3, FF4, FF5, FF6, FF7, FF8, FF9, FF_S1, F_S1, G0, G1, G2, G3, G4, G5, G6, G7, G8, G9, GG0, GG1, GG2, GG3, GG4, GG5, GG6, GG7, GG8, GG9, GG_S1, G_S1 } from "../../constants";
import SPN from "../../SPN";

export default function fromChromaticOctave(pitch: Pitch, octave: number): SPN | null {
  switch (octave) {
    case -1:
      switch (pitch) {
        case C: return C_S1;
        case CC: return CC_S1;
        case D: return D_S1;
        case DD: return DD_S1;
        case E: return E_S1;
        case F: return F_S1;
        case FF: return FF_S1;
        case G: return G_S1;
        case GG: return GG_S1;
        case A: return A_S1;
        case AA: return AA_S1;
        case B: return B_S1;
        default: return null;
      }
    case 0:
      switch (pitch) {
        case C: return C0;
        case CC: return CC0;
        case D: return D0;
        case DD: return DD0;
        case E: return E0;
        case F: return F0;
        case FF: return FF0;
        case G: return G0;
        case GG: return GG0;
        case A: return A0;
        case AA: return AA0;
        case B: return B0;
        default: return null;
      }
    case 1:
      switch (pitch) {
        case C: return C1;
        case CC: return CC1;
        case D: return D1;
        case DD: return DD1;
        case E: return E1;
        case F: return F1;
        case FF: return FF1;
        case G: return G1;
        case GG: return GG1;
        case A: return A1;
        case AA: return AA1;
        case B: return B1;
        default: return null;
      }
    case 2:
      switch (pitch) {
        case C: return C2;
        case CC: return CC2;
        case D: return D2;
        case DD: return DD2;
        case E: return E2;
        case F: return F2;
        case FF: return FF2;
        case G: return G2;
        case GG: return GG2;
        case A: return A2;
        case AA: return AA2;
        case B: return B2;
        default: return null;
      }
    case 3:
      switch (pitch) {
        case C: return C3;
        case CC: return CC3;
        case D: return D3;
        case DD: return DD3;
        case E: return E3;
        case F: return F3;
        case FF: return FF3;
        case G: return G3;
        case GG: return GG3;
        case A: return A3;
        case AA: return AA3;
        case B: return B3;
        default: return null;
      }
    case 4:
      switch (pitch) {
        case C: return C4;
        case CC: return CC4;
        case D: return D4;
        case DD: return DD4;
        case E: return E4;
        case F: return F4;
        case FF: return FF4;
        case G: return G4;
        case GG: return GG4;
        case A: return A4;
        case AA: return AA4;
        case B: return B4;
        default: return null;
      }
    case 5:
      switch (pitch) {
        case C: return C5;
        case CC: return CC5;
        case D: return D5;
        case DD: return DD5;
        case E: return E5;
        case F: return F5;
        case FF: return FF5;
        case G: return G5;
        case GG: return GG5;
        case A: return A5;
        case AA: return AA5;
        case B: return B5;
        default: return null;
      }
    case 6:
      switch (pitch) {
        case C: return C6;
        case CC: return CC6;
        case D: return D6;
        case DD: return DD6;
        case E: return E6;
        case F: return F6;
        case FF: return FF6;
        case G: return G6;
        case GG: return GG6;
        case A: return A6;
        case AA: return AA6;
        case B: return B6;
        default: return null;
      }
    case 7:
      switch (pitch) {
        case C: return C7;
        case CC: return CC7;
        case D: return D7;
        case DD: return DD7;
        case E: return E7;
        case F: return F7;
        case FF: return FF7;
        case G: return G7;
        case GG: return GG7;
        case A: return A7;
        case AA: return AA7;
        case B: return B7;
        default: return null;
      }
    case 8:
      switch (pitch) {
        case C: return C8;
        case CC: return CC8;
        case D: return D8;
        case DD: return DD8;
        case E: return E8;
        case F: return F8;
        case FF: return FF8;
        case G: return G8;
        case GG: return GG8;
        case A: return A8;
        case AA: return AA8;
        case B: return B8;
        default: return null;
      }
    case 9:
      switch (pitch) {
        case C: return C9;
        case CC: return CC9;
        case D: return D9;
        case DD: return DD9;
        case E: return E9;
        case F: return F9;
        case FF: return FF9;
        case G: return G9;
        case GG: return GG9;
        case A: return A9;
        case AA: return AA9;
        case B: return B9;
        default: return null;
      }
    default: return null;
  }
}
