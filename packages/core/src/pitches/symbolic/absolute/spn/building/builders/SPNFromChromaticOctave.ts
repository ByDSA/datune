import { Chromatic } from "../../../../octave/chromatic/Chromatic";
import { SPN } from "../../SPN";

export function fromChromaticOctave(chromatic: Chromatic, octave: number): SPN | null {
    switch (octave) {
        case -1:
            switch (chromatic) {
                case Chromatic.C: return SPN.C_S1;
                case Chromatic.CC: return SPN.CC_S1;
                case Chromatic.D: return SPN.D_S1;
                case Chromatic.DD: return SPN.DD_S1;
                case Chromatic.E: return SPN.E_S1;
                case Chromatic.F: return SPN.F_S1;
                case Chromatic.FF: return SPN.FF_S1;
                case Chromatic.G: return SPN.G_S1;
                case Chromatic.GG: return SPN.GG_S1;
                case Chromatic.A: return SPN.A_S1;
                case Chromatic.AA: return SPN.AA_S1;
                case Chromatic.B: return SPN.B_S1;
            }
            break;
        case 0:
            switch (chromatic) {
                case Chromatic.C: return SPN.C0;
                case Chromatic.CC: return SPN.CC0;
                case Chromatic.D: return SPN.D0;
                case Chromatic.DD: return SPN.DD0;
                case Chromatic.E: return SPN.E0;
                case Chromatic.F: return SPN.F0;
                case Chromatic.FF: return SPN.FF0;
                case Chromatic.G: return SPN.G0;
                case Chromatic.GG: return SPN.GG0;
                case Chromatic.A: return SPN.A0;
                case Chromatic.AA: return SPN.AA0;
                case Chromatic.B: return SPN.B0;
            }
            break;
        case 1:
            switch (chromatic) {
                case Chromatic.C: return SPN.C1;
                case Chromatic.CC: return SPN.CC1;
                case Chromatic.D: return SPN.D1;
                case Chromatic.DD: return SPN.DD1;
                case Chromatic.E: return SPN.E1;
                case Chromatic.F: return SPN.F1;
                case Chromatic.FF: return SPN.FF1;
                case Chromatic.G: return SPN.G1;
                case Chromatic.GG: return SPN.GG1;
                case Chromatic.A: return SPN.A1;
                case Chromatic.AA: return SPN.AA1;
                case Chromatic.B: return SPN.B1;
            }
            break;
        case 2:
            switch (chromatic) {
                case Chromatic.C: return SPN.C2;
                case Chromatic.CC: return SPN.CC2;
                case Chromatic.D: return SPN.D2;
                case Chromatic.DD: return SPN.DD2;
                case Chromatic.E: return SPN.E2;
                case Chromatic.F: return SPN.F2;
                case Chromatic.FF: return SPN.FF2;
                case Chromatic.G: return SPN.G2;
                case Chromatic.GG: return SPN.GG2;
                case Chromatic.A: return SPN.A2;
                case Chromatic.AA: return SPN.AA2;
                case Chromatic.B: return SPN.B2;
            }
            break;
        case 3:
            switch (chromatic) {
                case Chromatic.C: return SPN.C3;
                case Chromatic.CC: return SPN.CC3;
                case Chromatic.D: return SPN.D3;
                case Chromatic.DD: return SPN.DD3;
                case Chromatic.E: return SPN.E3;
                case Chromatic.F: return SPN.F3;
                case Chromatic.FF: return SPN.FF3;
                case Chromatic.G: return SPN.G3;
                case Chromatic.GG: return SPN.GG3;
                case Chromatic.A: return SPN.A3;
                case Chromatic.AA: return SPN.AA3;
                case Chromatic.B: return SPN.B3;
            }
            break;
        case 4:
            switch (chromatic) {
                case Chromatic.C: return SPN.C4;
                case Chromatic.CC: return SPN.CC4;
                case Chromatic.D: return SPN.D4;
                case Chromatic.DD: return SPN.DD4;
                case Chromatic.E: return SPN.E4;
                case Chromatic.F: return SPN.F4;
                case Chromatic.FF: return SPN.FF4;
                case Chromatic.G: return SPN.G4;
                case Chromatic.GG: return SPN.GG4;
                case Chromatic.A: return SPN.A4;
                case Chromatic.AA: return SPN.AA4;
                case Chromatic.B: return SPN.B4;
            }
            break;
        case 5:
            switch (chromatic) {
                case Chromatic.C: return SPN.C5;
                case Chromatic.CC: return SPN.CC5;
                case Chromatic.D: return SPN.D5;
                case Chromatic.DD: return SPN.DD5;
                case Chromatic.E: return SPN.E5;
                case Chromatic.F: return SPN.F5;
                case Chromatic.FF: return SPN.FF5;
                case Chromatic.G: return SPN.G5;
                case Chromatic.GG: return SPN.GG5;
                case Chromatic.A: return SPN.A5;
                case Chromatic.AA: return SPN.AA5;
                case Chromatic.B: return SPN.B5;
            }
            break;
        case 6:
            switch (chromatic) {
                case Chromatic.C: return SPN.C6;
                case Chromatic.CC: return SPN.CC6;
                case Chromatic.D: return SPN.D6;
                case Chromatic.DD: return SPN.DD6;
                case Chromatic.E: return SPN.E6;
                case Chromatic.F: return SPN.F6;
                case Chromatic.FF: return SPN.FF6;
                case Chromatic.G: return SPN.G6;
                case Chromatic.GG: return SPN.GG6;
                case Chromatic.A: return SPN.A6;
                case Chromatic.AA: return SPN.AA6;
                case Chromatic.B: return SPN.B6;
            }
            break;
        case 7:
            switch (chromatic) {
                case Chromatic.C: return SPN.C7;
                case Chromatic.CC: return SPN.CC7;
                case Chromatic.D: return SPN.D7;
                case Chromatic.DD: return SPN.DD7;
                case Chromatic.E: return SPN.E7;
                case Chromatic.F: return SPN.F7;
                case Chromatic.FF: return SPN.FF7;
                case Chromatic.G: return SPN.G7;
                case Chromatic.GG: return SPN.GG7;
                case Chromatic.A: return SPN.A7;
                case Chromatic.AA: return SPN.AA7;
                case Chromatic.B: return SPN.B7;
            }
            break;
        case 8:
            switch (chromatic) {
                case Chromatic.C: return SPN.C8;
                case Chromatic.CC: return SPN.CC8;
                case Chromatic.D: return SPN.D8;
                case Chromatic.DD: return SPN.DD8;
                case Chromatic.E: return SPN.E8;
                case Chromatic.F: return SPN.F8;
                case Chromatic.FF: return SPN.FF8;
                case Chromatic.G: return SPN.G8;
                case Chromatic.GG: return SPN.GG8;
                case Chromatic.A: return SPN.A8;
                case Chromatic.AA: return SPN.AA8;
                case Chromatic.B: return SPN.B8;
            }
            break;
        case 9:
            switch (chromatic) {
                case Chromatic.C: return SPN.C9;
                case Chromatic.CC: return SPN.CC9;
                case Chromatic.D: return SPN.D9;
                case Chromatic.DD: return SPN.DD9;
                case Chromatic.E: return SPN.E9;
                case Chromatic.F: return SPN.F9;
                case Chromatic.FF: return SPN.FF9;
                case Chromatic.G: return SPN.G9;
                case Chromatic.GG: return SPN.GG9;
                case Chromatic.A: return SPN.A9;
                case Chromatic.AA: return SPN.AA9;
                case Chromatic.B: return SPN.B9;
            }
    }

    return null;
}