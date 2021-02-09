import { DiatonicAlt } from '../../../../octave/alt/DiatonicAlt';
import { SPNAlt } from '../../SPNAlt';


export class SPNStaticNames {
    // El negativo es por compatibilidad con MidiPitch
    static get C_S1(): SPNAlt {
        if (!_C_S1)
            _C_S1 = SPNAlt.from(DiatonicAlt.C, -1);
        return _C_S1;
    }
    static get CC_S1(): SPNAlt {
        if (!_CC_S1)
            _CC_S1 = SPNAlt.from(DiatonicAlt.CC, -1);
        return _CC_S1;
    }
    static get D_S1(): SPNAlt {
        if (!_D_S1)
            _D_S1 = SPNAlt.from(DiatonicAlt.D, -1);
        return _D_S1;
    }
    static get DD_S1(): SPNAlt {
        if (!_DD_S1)
            _DD_S1 = SPNAlt.from(DiatonicAlt.DD, -1);
        return _DD_S1;
    }
    static get E_S1(): SPNAlt {
        if (!_E_S1)
            _E_S1 = SPNAlt.from(DiatonicAlt.E, -1);
        return _E_S1;
    }
    static get F_S1(): SPNAlt {
        if (!_F_S1)
            _F_S1 = SPNAlt.from(DiatonicAlt.F, -1);
        return _F_S1;
    }
    static get FF_S1(): SPNAlt {
        if (!_FF_S1)
            _FF_S1 = SPNAlt.from(DiatonicAlt.FF, -1);
        return _FF_S1;
    }
    static get G_S1(): SPNAlt {
        if (!_G_S1)
            _G_S1 = SPNAlt.from(DiatonicAlt.G, -1);
        return _G_S1;
    }
    static get GG_S1(): SPNAlt {
        if (!_GG_S1)
            _GG_S1 = SPNAlt.from(DiatonicAlt.GG, -1);
        return _GG_S1;
    }
    static get A_S1(): SPNAlt {
        if (!_A_S1)
            _A_S1 = SPNAlt.from(DiatonicAlt.A, -1);
        return _A_S1;
    }
    static get AA_S1(): SPNAlt {
        if (!_AA_S1)
            _AA_S1 = SPNAlt.from(DiatonicAlt.AA, -1);
        return _AA_S1;
    }
    static get B_S1(): SPNAlt {
        if (!_B_S1)
            _B_S1 = SPNAlt.from(DiatonicAlt.B, -1);
        return _B_S1;
    }
    static get C0(): SPNAlt {
        if (!_C0)
            _C0 = SPNAlt.from(DiatonicAlt.C, 0);
        return _C0;
    }
    static get CC0(): SPNAlt {
        if (!_CC0)
            _CC0 = SPNAlt.from(DiatonicAlt.CC, 0);
        return _CC0;
    }
    static get D0(): SPNAlt {
        if (!_D0)
            _D0 = SPNAlt.from(DiatonicAlt.D, 0);
        return _D0;
    }
    static get DD0(): SPNAlt {
        if (!_DD0)
            _DD0 = SPNAlt.from(DiatonicAlt.DD, 0);
        return _DD0;
    }
    static get E0(): SPNAlt {
        if (!_E0)
            _E0 = SPNAlt.from(DiatonicAlt.E, 0);
        return _E0;
    }
    static get F0(): SPNAlt {
        if (!_F0)
            _F0 = SPNAlt.from(DiatonicAlt.F, 0);
        return _F0;
    }
    static get FF0(): SPNAlt {
        if (!_FF0)
            _FF0 = SPNAlt.from(DiatonicAlt.FF, 0);
        return _FF0;
    }
    static get G0(): SPNAlt {
        if (!_G0)
            _G0 = SPNAlt.from(DiatonicAlt.G, 0);
        return _G0;
    }
    static get GG0(): SPNAlt {
        if (!_GG0)
            _GG0 = SPNAlt.from(DiatonicAlt.GG, 0);
        return _GG0;
    }
    static get A0(): SPNAlt {
        if (!_A0)
            _A0 = SPNAlt.from(DiatonicAlt.A, 0);
        return _A0;
    }
    static get AA0(): SPNAlt {
        if (!_AA0)
            _AA0 = SPNAlt.from(DiatonicAlt.AA, 0);
        return _AA0;
    }
    static get B0(): SPNAlt {
        if (!_B0)
            _B0 = SPNAlt.from(DiatonicAlt.B, 0);
        return _B0;
    }
    static get C1(): SPNAlt {
        if (!_C1)
            _C1 = SPNAlt.from(DiatonicAlt.C, 1);
        return _C1;
    }
    static get CC1(): SPNAlt {
        if (!_CC1)
            _CC1 = SPNAlt.from(DiatonicAlt.CC, 1);
        return _CC1;
    }
    static get D1(): SPNAlt {
        if (!_D1)
            _D1 = SPNAlt.from(DiatonicAlt.D, 1);
        return _D1;
    }
    static get DD1(): SPNAlt {
        if (!_DD1)
            _DD1 = SPNAlt.from(DiatonicAlt.DD, 1);
        return _DD1;
    }
    static get E1(): SPNAlt {
        if (!_E1)
            _E1 = SPNAlt.from(DiatonicAlt.E, 1);
        return _E1;
    }
    static get F1(): SPNAlt {
        if (!_F1)
            _F1 = SPNAlt.from(DiatonicAlt.F, 1);
        return _F1;
    }
    static get FF1(): SPNAlt {
        if (!_FF1)
            _FF1 = SPNAlt.from(DiatonicAlt.FF, 1);
        return _FF1;
    }
    static get G1(): SPNAlt {
        if (!_G1)
            _G1 = SPNAlt.from(DiatonicAlt.G, 1);
        return _G1;
    }
    static get GG1(): SPNAlt {
        if (!_GG1)
            _GG1 = SPNAlt.from(DiatonicAlt.GG, 1);
        return _GG1;
    }
    static get A1(): SPNAlt {
        if (!_A1)
            _A1 = SPNAlt.from(DiatonicAlt.A, 1);
        return _A1;
    }
    static get AA1(): SPNAlt {
        if (!_AA1)
            _AA1 = SPNAlt.from(DiatonicAlt.AA, 1);
        return _AA1;
    }
    static get B1(): SPNAlt {
        if (!_B1)
            _B1 = SPNAlt.from(DiatonicAlt.B, 1);
        return _B1;
    }
    static get C2(): SPNAlt {
        if (!_C2)
            _C2 = SPNAlt.from(DiatonicAlt.C, 2);
        return _C2;
    }
    static get CC2(): SPNAlt {
        if (!_CC2)
            _CC2 = SPNAlt.from(DiatonicAlt.CC, 2);
        return _CC2;
    }
    static get D2(): SPNAlt {
        if (!_D2)
            _D2 = SPNAlt.from(DiatonicAlt.D, 2);
        return _D2;
    }
    static get DD2(): SPNAlt {
        if (!_DD2)
            _DD2 = SPNAlt.from(DiatonicAlt.DD, 2);
        return _DD2;
    }
    static get E2(): SPNAlt {
        if (!_E2)
            _E2 = SPNAlt.from(DiatonicAlt.E, 2);
        return _E2;
    }
    static get F2(): SPNAlt {
        if (!_F2)
            _F2 = SPNAlt.from(DiatonicAlt.F, 2);
        return _F2;
    }
    static get FF2(): SPNAlt {
        if (!_FF2)
            _FF2 = SPNAlt.from(DiatonicAlt.FF, 2);
        return _FF2;
    }
    static get G2(): SPNAlt {
        if (!_G2)
            _G2 = SPNAlt.from(DiatonicAlt.G, 2);
        return _G2;
    }
    static get GG2(): SPNAlt {
        if (!_GG2)
            _GG2 = SPNAlt.from(DiatonicAlt.GG, 2);
        return _GG2;
    }
    static get A2(): SPNAlt {
        if (!_A2)
            _A2 = SPNAlt.from(DiatonicAlt.A, 2);
        return _A2;
    }
    static get AA2(): SPNAlt {
        if (!_AA2)
            _AA2 = SPNAlt.from(DiatonicAlt.AA, 2);
        return _AA2;
    }
    static get B2(): SPNAlt {
        if (!_B2)
            _B2 = SPNAlt.from(DiatonicAlt.B, 2);
        return _B2;
    }
    static get C3(): SPNAlt {
        if (!_C3)
            _C3 = SPNAlt.from(DiatonicAlt.C, 3);
        return _C3;
    }
    static get CC3(): SPNAlt {
        if (!_CC3)
            _CC3 = SPNAlt.from(DiatonicAlt.CC, 3);
        return _CC3;
    }
    static get D3(): SPNAlt {
        if (!_D3)
            _D3 = SPNAlt.from(DiatonicAlt.D, 3);
        return _D3;
    }
    static get DD3(): SPNAlt {
        if (!_DD3)
            _DD3 = SPNAlt.from(DiatonicAlt.DD, 3);
        return _DD3;
    }
    static get E3(): SPNAlt {
        if (!_E3)
            _E3 = SPNAlt.from(DiatonicAlt.E, 3);
        return _E3;
    }
    static get F3(): SPNAlt {
        if (!_F3)
            _F3 = SPNAlt.from(DiatonicAlt.F, 3);
        return _F3;
    }
    static get FF3(): SPNAlt {
        if (!_FF3)
            _FF3 = SPNAlt.from(DiatonicAlt.FF, 3);
        return _FF3;
    }
    static get G3(): SPNAlt {
        if (!_G3)
            _G3 = SPNAlt.from(DiatonicAlt.G, 3);
        return _G3;
    }
    static get GG3(): SPNAlt {
        if (!_GG3)
            _GG3 = SPNAlt.from(DiatonicAlt.GG, 3);
        return _GG3;
    }
    static get A3(): SPNAlt {
        if (!_A3)
            _A3 = SPNAlt.from(DiatonicAlt.A, 3);
        return _A3;
    }
    static get AA3(): SPNAlt {
        if (!_AA3)
            _AA3 = SPNAlt.from(DiatonicAlt.AA, 3);
        return _AA3;
    }
    static get B3(): SPNAlt {
        if (!_B3)
            _B3 = SPNAlt.from(DiatonicAlt.B, 3);
        return _B3;
    }
    static get C4(): SPNAlt {
        if (!_C4)
            _C4 = SPNAlt.from(DiatonicAlt.C, 4);
        return _C4;
    }
    static get CC4(): SPNAlt {
        if (!_CC4)
            _CC4 = SPNAlt.from(DiatonicAlt.CC, 4);
        return _CC4;
    }
    static get D4(): SPNAlt {
        if (!_D4)
            _D4 = SPNAlt.from(DiatonicAlt.D, 4);
        return _D4;
    }
    static get DD4(): SPNAlt {
        if (!_DD4)
            _DD4 = SPNAlt.from(DiatonicAlt.DD, 4);
        return _DD4;
    }
    static get E4(): SPNAlt {
        if (!_E4)
            _E4 = SPNAlt.from(DiatonicAlt.E, 4);
        return _E4;
    }
    static get F4(): SPNAlt {
        if (!_F4)
            _F4 = SPNAlt.from(DiatonicAlt.F, 4);
        return _F4;
    }
    static get FF4(): SPNAlt {
        if (!_FF4)
            _FF4 = SPNAlt.from(DiatonicAlt.FF, 4);
        return _FF4;
    }
    static get G4(): SPNAlt {
        if (!_G4)
            _G4 = SPNAlt.from(DiatonicAlt.G, 4);
        return _G4;
    }
    static get GG4(): SPNAlt {
        if (!_GG4)
            _GG4 = SPNAlt.from(DiatonicAlt.GG, 4);
        return _GG4;
    }
    static get A4(): SPNAlt {
        if (!_A4)
            _A4 = SPNAlt.from(DiatonicAlt.A, 4);
        return _A4;
    }
    static get AA4(): SPNAlt {
        if (!_AA4)
            _AA4 = SPNAlt.from(DiatonicAlt.AA, 4);
        return _AA4;
    }
    static get B4(): SPNAlt {
        if (!_B4)
            _B4 = SPNAlt.from(DiatonicAlt.B, 4);
        return _B4;
    }
    static get C5(): SPNAlt {
        if (!_C5)
            _C5 = SPNAlt.from(DiatonicAlt.C, 5);
        return _C5;
    }
    static get CC5(): SPNAlt {
        if (!_CC5)
            _CC5 = SPNAlt.from(DiatonicAlt.CC, 5);
        return _CC5;
    }
    static get D5(): SPNAlt {
        if (!_D5)
            _D5 = SPNAlt.from(DiatonicAlt.D, 5);
        return _D5;
    }
    static get DD5(): SPNAlt {
        if (!_DD5)
            _DD5 = SPNAlt.from(DiatonicAlt.DD, 5);
        return _DD5;
    }
    static get E5(): SPNAlt {
        if (!_E5)
            _E5 = SPNAlt.from(DiatonicAlt.E, 5);
        return _E5;
    }
    static get F5(): SPNAlt {
        if (!_F5)
            _F5 = SPNAlt.from(DiatonicAlt.F, 5);
        return _F5;
    }
    static get FF5(): SPNAlt {
        if (!_FF5)
            _FF5 = SPNAlt.from(DiatonicAlt.FF, 5);
        return _FF5;
    }
    static get G5(): SPNAlt {
        if (!_G5)
            _G5 = SPNAlt.from(DiatonicAlt.G, 5);
        return _G5;
    }
    static get GG5(): SPNAlt {
        if (!_GG5)
            _GG5 = SPNAlt.from(DiatonicAlt.GG, 5);
        return _GG5;
    }
    static get A5(): SPNAlt {
        if (!_A5)
            _A5 = SPNAlt.from(DiatonicAlt.A, 5);
        return _A5;
    }
    static get AA5(): SPNAlt {
        if (!_AA5)
            _AA5 = SPNAlt.from(DiatonicAlt.AA, 5);
        return _AA5;
    }
    static get B5(): SPNAlt {
        if (!_B5)
            _B5 = SPNAlt.from(DiatonicAlt.B, 5);
        return _B5;
    }
    static get C6(): SPNAlt {
        if (!_C6)
            _C6 = SPNAlt.from(DiatonicAlt.C, 6);
        return _C6;
    }
    static get CC6(): SPNAlt {
        if (!_CC6)
            _CC6 = SPNAlt.from(DiatonicAlt.CC, 6);
        return _CC6;
    }
    static get D6(): SPNAlt {
        if (!_D6)
            _D6 = SPNAlt.from(DiatonicAlt.D, 6);
        return _D6;
    }
    static get DD6(): SPNAlt {
        if (!_DD6)
            _DD6 = SPNAlt.from(DiatonicAlt.DD, 6);
        return _DD6;
    }
    static get E6(): SPNAlt {
        if (!_E6)
            _E6 = SPNAlt.from(DiatonicAlt.E, 6);
        return _E6;
    }
    static get F6(): SPNAlt {
        if (!_F6)
            _F6 = SPNAlt.from(DiatonicAlt.F, 6);
        return _F6;
    }
    static get FF6(): SPNAlt {
        if (!_FF6)
            _FF6 = SPNAlt.from(DiatonicAlt.FF, 6);
        return _FF6;
    }
    static get G6(): SPNAlt {
        if (!_G6)
            _G6 = SPNAlt.from(DiatonicAlt.G, 6);
        return _G6;
    }
    static get GG6(): SPNAlt {
        if (!_GG6)
            _GG6 = SPNAlt.from(DiatonicAlt.GG, 6);
        return _GG6;
    }
    static get A6(): SPNAlt {
        if (!_A6)
            _A6 = SPNAlt.from(DiatonicAlt.A, 6);
        return _A6;
    }
    static get AA6(): SPNAlt {
        if (!_AA6)
            _AA6 = SPNAlt.from(DiatonicAlt.AA, 6);
        return _AA6;
    }
    static get B6(): SPNAlt {
        if (!_B6)
            _B6 = SPNAlt.from(DiatonicAlt.B, 6);
        return _B6;
    }
    static get C7(): SPNAlt {
        if (!_C7)
            _C7 = SPNAlt.from(DiatonicAlt.C, 7);
        return _C7;
    }
    static get CC7(): SPNAlt {
        if (!_CC7)
            _CC7 = SPNAlt.from(DiatonicAlt.CC, 7);
        return _CC7;
    }
    static get D7(): SPNAlt {
        if (!_D7)
            _D7 = SPNAlt.from(DiatonicAlt.D, 7);
        return _D7;
    }
    static get DD7(): SPNAlt {
        if (!_DD7)
            _DD7 = SPNAlt.from(DiatonicAlt.DD, 7);
        return _DD7;
    }
    static get E7(): SPNAlt {
        if (!_E7)
            _E7 = SPNAlt.from(DiatonicAlt.E, 7);
        return _E7;
    }
    static get F7(): SPNAlt {
        if (!_F7)
            _F7 = SPNAlt.from(DiatonicAlt.F, 7);
        return _F7;
    }
    static get FF7(): SPNAlt {
        if (!_FF7)
            _FF7 = SPNAlt.from(DiatonicAlt.FF, 7);
        return _FF7;
    }
    static get G7(): SPNAlt {
        if (!_G7)
            _G7 = SPNAlt.from(DiatonicAlt.G, 7);
        return _G7;
    }
    static get GG7(): SPNAlt {
        if (!_GG7)
            _GG7 = SPNAlt.from(DiatonicAlt.GG, 7);
        return _GG7;
    }
    static get A7(): SPNAlt {
        if (!_A7)
            _A7 = SPNAlt.from(DiatonicAlt.A, 7);
        return _A7;
    }
    static get AA7(): SPNAlt {
        if (!_AA7)
            _AA7 = SPNAlt.from(DiatonicAlt.AA, 7);
        return _AA7;
    }
    static get B7(): SPNAlt {
        if (!_B7)
            _B7 = SPNAlt.from(DiatonicAlt.B, 7);
        return _B7;
    }
    static get C8(): SPNAlt {
        if (!_C8)
            _C8 = SPNAlt.from(DiatonicAlt.C, 8);
        return _C8;
    }
    static get CC8(): SPNAlt {
        if (!_CC8)
            _CC8 = SPNAlt.from(DiatonicAlt.CC, 8);
        return _CC8;
    }
    static get D8(): SPNAlt {
        if (!_D8)
            _D8 = SPNAlt.from(DiatonicAlt.D, 8);
        return _D8;
    }
    static get DD8(): SPNAlt {
        if (!_DD8)
            _DD8 = SPNAlt.from(DiatonicAlt.DD, 8);
        return _DD8;
    }
    static get E8(): SPNAlt {
        if (!_E8)
            _E8 = SPNAlt.from(DiatonicAlt.E, 8);
        return _E8;
    }
    static get F8(): SPNAlt {
        if (!_F8)
            _F8 = SPNAlt.from(DiatonicAlt.F, 8);
        return _F8;
    }
    static get FF8(): SPNAlt {
        if (!_FF8)
            _FF8 = SPNAlt.from(DiatonicAlt.FF, 8);
        return _FF8;
    }
    static get G8(): SPNAlt {
        if (!_G8)
            _G8 = SPNAlt.from(DiatonicAlt.G, 8);
        return _G8;
    }
    static get GG8(): SPNAlt {
        if (!_GG8)
            _GG8 = SPNAlt.from(DiatonicAlt.GG, 8);
        return _GG8;
    }
    static get A8(): SPNAlt {
        if (!_A8)
            _A8 = SPNAlt.from(DiatonicAlt.A, 8);
        return _A8;
    }
    static get AA8(): SPNAlt {
        if (!_AA8)
            _AA8 = SPNAlt.from(DiatonicAlt.AA, 8);
        return _AA8;
    }
    static get B8(): SPNAlt {
        if (!_B8)
            _B8 = SPNAlt.from(DiatonicAlt.B, 8);
        return _B8;
    }
    static get C9(): SPNAlt {
        if (!_C9)
            _C9 = SPNAlt.from(DiatonicAlt.C, 9);
        return _C9;
    }
    static get CC9(): SPNAlt {
        if (!_CC9)
            _CC9 = SPNAlt.from(DiatonicAlt.CC, 9);
        return _CC9;
    }
    static get D9(): SPNAlt {
        if (!_D9)
            _D9 = SPNAlt.from(DiatonicAlt.D, 9);
        return _D9;
    }
    static get DD9(): SPNAlt {
        if (!_DD9)
            _DD9 = SPNAlt.from(DiatonicAlt.DD, 9);
        return _DD9;
    }
    static get E9(): SPNAlt {
        if (!_E9)
            _E9 = SPNAlt.from(DiatonicAlt.E, 9);
        return _E9;
    }
    static get F9(): SPNAlt {
        if (!_F9)
            _F9 = SPNAlt.from(DiatonicAlt.F, 9);
        return _F9;
    }
    static get FF9(): SPNAlt {
        if (!_FF9)
            _FF9 = SPNAlt.from(DiatonicAlt.FF, 9);
        return _FF9;
    }
    static get G9(): SPNAlt {
        if (!_G9)
            _G9 = SPNAlt.from(DiatonicAlt.G, 9);
        return _G9;
    }
    static get GG9(): SPNAlt {
        if (!_GG9)
            _GG9 = SPNAlt.from(DiatonicAlt.GG, 9);
        return _GG9;
    }
    static get A9(): SPNAlt {
        if (!_A9)
            _A9 = SPNAlt.from(DiatonicAlt.A, 9);
        return _A9;
    }
    static get AA9(): SPNAlt {
        if (!_AA9)
            _AA9 = SPNAlt.from(DiatonicAlt.AA, 9);
        return _AA9;
    }
    static get B9(): SPNAlt {
        if (!_B9)
            _B9 = SPNAlt.from(DiatonicAlt.B, 9);
        return _B9;
    }
}

let _C_S1: SPNAlt, _CC_S1: SPNAlt, _D_S1: SPNAlt, _DD_S1: SPNAlt, _E_S1: SPNAlt, _F_S1: SPNAlt, _FF_S1: SPNAlt, _G_S1: SPNAlt, _GG_S1: SPNAlt, _A_S1: SPNAlt, _AA_S1: SPNAlt, _B_S1: SPNAlt;
let _C0: SPNAlt, _CC0: SPNAlt, _D0: SPNAlt, _DD0: SPNAlt, _E0: SPNAlt, _F0: SPNAlt, _FF0: SPNAlt, _G0: SPNAlt, _GG0: SPNAlt, _A0: SPNAlt, _AA0: SPNAlt, _B0: SPNAlt;
let _C1: SPNAlt, _CC1: SPNAlt, _D1: SPNAlt, _DD1: SPNAlt, _E1: SPNAlt, _F1: SPNAlt, _FF1: SPNAlt, _G1: SPNAlt, _GG1: SPNAlt, _A1: SPNAlt, _AA1: SPNAlt, _B1: SPNAlt;
let _C2: SPNAlt, _CC2: SPNAlt, _D2: SPNAlt, _DD2: SPNAlt, _E2: SPNAlt, _F2: SPNAlt, _FF2: SPNAlt, _G2: SPNAlt, _GG2: SPNAlt, _A2: SPNAlt, _AA2: SPNAlt, _B2: SPNAlt;
let _C3: SPNAlt, _CC3: SPNAlt, _D3: SPNAlt, _DD3: SPNAlt, _E3: SPNAlt, _F3: SPNAlt, _FF3: SPNAlt, _G3: SPNAlt, _GG3: SPNAlt, _A3: SPNAlt, _AA3: SPNAlt, _B3: SPNAlt;
let _C4: SPNAlt, _CC4: SPNAlt, _D4: SPNAlt, _DD4: SPNAlt, _E4: SPNAlt, _F4: SPNAlt, _FF4: SPNAlt, _G4: SPNAlt, _GG4: SPNAlt, _A4: SPNAlt, _AA4: SPNAlt, _B4: SPNAlt;
let _C5: SPNAlt, _CC5: SPNAlt, _D5: SPNAlt, _DD5: SPNAlt, _E5: SPNAlt, _F5: SPNAlt, _FF5: SPNAlt, _G5: SPNAlt, _GG5: SPNAlt, _A5: SPNAlt, _AA5: SPNAlt, _B5: SPNAlt;
let _C6: SPNAlt, _CC6: SPNAlt, _D6: SPNAlt, _DD6: SPNAlt, _E6: SPNAlt, _F6: SPNAlt, _FF6: SPNAlt, _G6: SPNAlt, _GG6: SPNAlt, _A6: SPNAlt, _AA6: SPNAlt, _B6: SPNAlt;
let _C7: SPNAlt, _CC7: SPNAlt, _D7: SPNAlt, _DD7: SPNAlt, _E7: SPNAlt, _F7: SPNAlt, _FF7: SPNAlt, _G7: SPNAlt, _GG7: SPNAlt, _A7: SPNAlt, _AA7: SPNAlt, _B7: SPNAlt;
let _C8: SPNAlt, _CC8: SPNAlt, _D8: SPNAlt, _DD8: SPNAlt, _E8: SPNAlt, _F8: SPNAlt, _FF8: SPNAlt, _G8: SPNAlt, _GG8: SPNAlt, _A8: SPNAlt, _AA8: SPNAlt, _B8: SPNAlt;
let _C9: SPNAlt, _CC9: SPNAlt, _D9: SPNAlt, _DD9: SPNAlt, _E9: SPNAlt, _F9: SPNAlt, _FF9: SPNAlt, _G9: SPNAlt, _GG9: SPNAlt, _A9: SPNAlt, _AA9: SPNAlt, _B9: SPNAlt;