import { Chromatic } from '../../../../octave/chromatic/Chromatic';
import { SPN } from '../../SPN';

export class SPNStaticNames {
    // El negativo es por compatibilidad con MidiPitch
    static get C_S1(): SPN {
        if (!_C_S1)
            _C_S1 = (<any>SPN)._create(Chromatic.C, -1);
        return _C_S1;
    }
    static get CC_S1(): SPN {
        if (!_CC_S1)
            _CC_S1 = (<any>SPN)._create(Chromatic.CC, -1);
        return _CC_S1;
    }
    static get D_S1(): SPN {
        if (!_D_S1)
            _D_S1 = (<any>SPN)._create(Chromatic.D, -1);
        return _D_S1;
    }
    static get DD_S1(): SPN {
        if (!_DD_S1)
            _DD_S1 = (<any>SPN)._create(Chromatic.DD, -1);
        return _DD_S1;
    }
    static get E_S1(): SPN {
        if (!_E_S1)
            _E_S1 = (<any>SPN)._create(Chromatic.E, -1);
        return _E_S1;
    }
    static get F_S1(): SPN {
        if (!_F_S1)
            _F_S1 = (<any>SPN)._create(Chromatic.F, -1);
        return _F_S1;
    }
    static get FF_S1(): SPN {
        if (!_FF_S1)
            _FF_S1 = (<any>SPN)._create(Chromatic.FF, -1);
        return _FF_S1;
    }
    static get G_S1(): SPN {
        if (!_G_S1)
            _G_S1 = (<any>SPN)._create(Chromatic.G, -1);
        return _G_S1;
    }
    static get GG_S1(): SPN {
        if (!_GG_S1)
            _GG_S1 = (<any>SPN)._create(Chromatic.GG, -1);
        return _GG_S1;
    }
    static get A_S1(): SPN {
        if (!_A_S1)
            _A_S1 = (<any>SPN)._create(Chromatic.A, -1);
        return _A_S1;
    }
    static get AA_S1(): SPN {
        if (!_AA_S1)
            _AA_S1 = (<any>SPN)._create(Chromatic.AA, -1);
        return _AA_S1;
    }
    static get B_S1(): SPN {
        if (!_B_S1)
            _B_S1 = (<any>SPN)._create(Chromatic.B, -1);
        return _B_S1;
    }
    static get C0(): SPN {
        if (!_C0)
            _C0 = (<any>SPN)._create(Chromatic.C, 0);
        return _C0;
    }
    static get CC0(): SPN {
        if (!_CC0)
            _CC0 = (<any>SPN)._create(Chromatic.CC, 0);
        return _CC0;
    }
    static get D0(): SPN {
        if (!_D0)
            _D0 = (<any>SPN)._create(Chromatic.D, 0);
        return _D0;
    }
    static get DD0(): SPN {
        if (!_DD0)
            _DD0 = (<any>SPN)._create(Chromatic.DD, 0);
        return _DD0;
    }
    static get E0(): SPN {
        if (!_E0)
            _E0 = (<any>SPN)._create(Chromatic.E, 0);
        return _E0;
    }
    static get F0(): SPN {
        if (!_F0)
            _F0 = (<any>SPN)._create(Chromatic.F, 0);
        return _F0;
    }
    static get FF0(): SPN {
        if (!_FF0)
            _FF0 = (<any>SPN)._create(Chromatic.FF, 0);
        return _FF0;
    }
    static get G0(): SPN {
        if (!_G0)
            _G0 = (<any>SPN)._create(Chromatic.G, 0);
        return _G0;
    }
    static get GG0(): SPN {
        if (!_GG0)
            _GG0 = (<any>SPN)._create(Chromatic.GG, 0);
        return _GG0;
    }
    static get A0(): SPN {
        if (!_A0)
            _A0 = (<any>SPN)._create(Chromatic.A, 0);
        return _A0;
    }
    static get AA0(): SPN {
        if (!_AA0)
            _AA0 = (<any>SPN)._create(Chromatic.AA, 0);
        return _AA0;
    }
    static get B0(): SPN {
        if (!_B0)
            _B0 = (<any>SPN)._create(Chromatic.B, 0);
        return _B0;
    }
    static get C1(): SPN {
        if (!_C1)
            _C1 = (<any>SPN)._create(Chromatic.C, 1);
        return _C1;
    }
    static get CC1(): SPN {
        if (!_CC1)
            _CC1 = (<any>SPN)._create(Chromatic.CC, 1);
        return _CC1;
    }
    static get D1(): SPN {
        if (!_D1)
            _D1 = (<any>SPN)._create(Chromatic.D, 1);
        return _D1;
    }
    static get DD1(): SPN {
        if (!_DD1)
            _DD1 = (<any>SPN)._create(Chromatic.DD, 1);
        return _DD1;
    }
    static get E1(): SPN {
        if (!_E1)
            _E1 = (<any>SPN)._create(Chromatic.E, 1);
        return _E1;
    }
    static get F1(): SPN {
        if (!_F1)
            _F1 = (<any>SPN)._create(Chromatic.F, 1);
        return _F1;
    }
    static get FF1(): SPN {
        if (!_FF1)
            _FF1 = (<any>SPN)._create(Chromatic.FF, 1);
        return _FF1;
    }
    static get G1(): SPN {
        if (!_G1)
            _G1 = (<any>SPN)._create(Chromatic.G, 1);
        return _G1;
    }
    static get GG1(): SPN {
        if (!_GG1)
            _GG1 = (<any>SPN)._create(Chromatic.GG, 1);
        return _GG1;
    }
    static get A1(): SPN {
        if (!_A1)
            _A1 = (<any>SPN)._create(Chromatic.A, 1);
        return _A1;
    }
    static get AA1(): SPN {
        if (!_AA1)
            _AA1 = (<any>SPN)._create(Chromatic.AA, 1);
        return _AA1;
    }
    static get B1(): SPN {
        if (!_B1)
            _B1 = (<any>SPN)._create(Chromatic.B, 1);
        return _B1;
    }
    static get C2(): SPN {
        if (!_C2)
            _C2 = (<any>SPN)._create(Chromatic.C, 2);
        return _C2;
    }
    static get CC2(): SPN {
        if (!_CC2)
            _CC2 = (<any>SPN)._create(Chromatic.CC, 2);
        return _CC2;
    }
    static get D2(): SPN {
        if (!_D2)
            _D2 = (<any>SPN)._create(Chromatic.D, 2);
        return _D2;
    }
    static get DD2(): SPN {
        if (!_DD2)
            _DD2 = (<any>SPN)._create(Chromatic.DD, 2);
        return _DD2;
    }
    static get E2(): SPN {
        if (!_E2)
            _E2 = (<any>SPN)._create(Chromatic.E, 2);
        return _E2;
    }
    static get F2(): SPN {
        if (!_F2)
            _F2 = (<any>SPN)._create(Chromatic.F, 2);
        return _F2;
    }
    static get FF2(): SPN {
        if (!_FF2)
            _FF2 = (<any>SPN)._create(Chromatic.FF, 2);
        return _FF2;
    }
    static get G2(): SPN {
        if (!_G2)
            _G2 = (<any>SPN)._create(Chromatic.G, 2);
        return _G2;
    }
    static get GG2(): SPN {
        if (!_GG2)
            _GG2 = (<any>SPN)._create(Chromatic.GG, 2);
        return _GG2;
    }
    static get A2(): SPN {
        if (!_A2)
            _A2 = (<any>SPN)._create(Chromatic.A, 2);
        return _A2;
    }
    static get AA2(): SPN {
        if (!_AA2)
            _AA2 = (<any>SPN)._create(Chromatic.AA, 2);
        return _AA2;
    }
    static get B2(): SPN {
        if (!_B2)
            _B2 = (<any>SPN)._create(Chromatic.B, 2);
        return _B2;
    }
    static get C3(): SPN {
        if (!_C3)
            _C3 = (<any>SPN)._create(Chromatic.C, 3);
        return _C3;
    }
    static get CC3(): SPN {
        if (!_CC3)
            _CC3 = (<any>SPN)._create(Chromatic.CC, 3);
        return _CC3;
    }
    static get D3(): SPN {
        if (!_D3)
            _D3 = (<any>SPN)._create(Chromatic.D, 3);
        return _D3;
    }
    static get DD3(): SPN {
        if (!_DD3)
            _DD3 = (<any>SPN)._create(Chromatic.DD, 3);
        return _DD3;
    }
    static get E3(): SPN {
        if (!_E3)
            _E3 = (<any>SPN)._create(Chromatic.E, 3);
        return _E3;
    }
    static get F3(): SPN {
        if (!_F3)
            _F3 = (<any>SPN)._create(Chromatic.F, 3);
        return _F3;
    }
    static get FF3(): SPN {
        if (!_FF3)
            _FF3 = (<any>SPN)._create(Chromatic.FF, 3);
        return _FF3;
    }
    static get G3(): SPN {
        if (!_G3)
            _G3 = (<any>SPN)._create(Chromatic.G, 3);
        return _G3;
    }
    static get GG3(): SPN {
        if (!_GG3)
            _GG3 = (<any>SPN)._create(Chromatic.GG, 3);
        return _GG3;
    }
    static get A3(): SPN {
        if (!_A3)
            _A3 = (<any>SPN)._create(Chromatic.A, 3);
        return _A3;
    }
    static get AA3(): SPN {
        if (!_AA3)
            _AA3 = (<any>SPN)._create(Chromatic.AA, 3);
        return _AA3;
    }
    static get B3(): SPN {
        if (!_B3)
            _B3 = (<any>SPN)._create(Chromatic.B, 3);
        return _B3;
    }
    static get C4(): SPN {
        if (!_C4)
            _C4 = (<any>SPN)._create(Chromatic.C, 4);
        return _C4;
    }
    static get CC4(): SPN {
        if (!_CC4)
            _CC4 = (<any>SPN)._create(Chromatic.CC, 4);
        return _CC4;
    }
    static get D4(): SPN {
        if (!_D4)
            _D4 = (<any>SPN)._create(Chromatic.D, 4);
        return _D4;
    }
    static get DD4(): SPN {
        if (!_DD4)
            _DD4 = (<any>SPN)._create(Chromatic.DD, 4);
        return _DD4;
    }
    static get E4(): SPN {
        if (!_E4)
            _E4 = (<any>SPN)._create(Chromatic.E, 4);
        return _E4;
    }
    static get F4(): SPN {
        if (!_F4)
            _F4 = (<any>SPN)._create(Chromatic.F, 4);
        return _F4;
    }
    static get FF4(): SPN {
        if (!_FF4)
            _FF4 = (<any>SPN)._create(Chromatic.FF, 4);
        return _FF4;
    }
    static get G4(): SPN {
        if (!_G4)
            _G4 = (<any>SPN)._create(Chromatic.G, 4);
        return _G4;
    }
    static get GG4(): SPN {
        if (!_GG4)
            _GG4 = (<any>SPN)._create(Chromatic.GG, 4);
        return _GG4;
    }
    static get A4(): SPN {
        if (!_A4)
            _A4 = (<any>SPN)._create(Chromatic.A, 4);
        return _A4;
    }
    static get AA4(): SPN {
        if (!_AA4)
            _AA4 = (<any>SPN)._create(Chromatic.AA, 4);
        return _AA4;
    }
    static get B4(): SPN {
        if (!_B4)
            _B4 = (<any>SPN)._create(Chromatic.B, 4);
        return _B4;
    }
    static get C5(): SPN {
        if (!_C5)
            _C5 = (<any>SPN)._create(Chromatic.C, 5);
        return _C5;
    }
    static get CC5(): SPN {
        if (!_CC5)
            _CC5 = (<any>SPN)._create(Chromatic.CC, 5);
        return _CC5;
    }
    static get D5(): SPN {
        if (!_D5)
            _D5 = (<any>SPN)._create(Chromatic.D, 5);
        return _D5;
    }
    static get DD5(): SPN {
        if (!_DD5)
            _DD5 = (<any>SPN)._create(Chromatic.DD, 5);
        return _DD5;
    }
    static get E5(): SPN {
        if (!_E5)
            _E5 = (<any>SPN)._create(Chromatic.E, 5);
        return _E5;
    }
    static get F5(): SPN {
        if (!_F5)
            _F5 = (<any>SPN)._create(Chromatic.F, 5);
        return _F5;
    }
    static get FF5(): SPN {
        if (!_FF5)
            _FF5 = (<any>SPN)._create(Chromatic.FF, 5);
        return _FF5;
    }
    static get G5(): SPN {
        if (!_G5)
            _G5 = (<any>SPN)._create(Chromatic.G, 5);
        return _G5;
    }
    static get GG5(): SPN {
        if (!_GG5)
            _GG5 = (<any>SPN)._create(Chromatic.GG, 5);
        return _GG5;
    }
    static get A5(): SPN {
        if (!_A5)
            _A5 = (<any>SPN)._create(Chromatic.A, 5);
        return _A5;
    }
    static get AA5(): SPN {
        if (!_AA5)
            _AA5 = (<any>SPN)._create(Chromatic.AA, 5);
        return _AA5;
    }
    static get B5(): SPN {
        if (!_B5)
            _B5 = (<any>SPN)._create(Chromatic.B, 5);
        return _B5;
    }
    static get C6(): SPN {
        if (!_C6)
            _C6 = (<any>SPN)._create(Chromatic.C, 6);
        return _C6;
    }
    static get CC6(): SPN {
        if (!_CC6)
            _CC6 = (<any>SPN)._create(Chromatic.CC, 6);
        return _CC6;
    }
    static get D6(): SPN {
        if (!_D6)
            _D6 = (<any>SPN)._create(Chromatic.D, 6);
        return _D6;
    }
    static get DD6(): SPN {
        if (!_DD6)
            _DD6 = (<any>SPN)._create(Chromatic.DD, 6);
        return _DD6;
    }
    static get E6(): SPN {
        if (!_E6)
            _E6 = (<any>SPN)._create(Chromatic.E, 6);
        return _E6;
    }
    static get F6(): SPN {
        if (!_F6)
            _F6 = (<any>SPN)._create(Chromatic.F, 6);
        return _F6;
    }
    static get FF6(): SPN {
        if (!_FF6)
            _FF6 = (<any>SPN)._create(Chromatic.FF, 6);
        return _FF6;
    }
    static get G6(): SPN {
        if (!_G6)
            _G6 = (<any>SPN)._create(Chromatic.G, 6);
        return _G6;
    }
    static get GG6(): SPN {
        if (!_GG6)
            _GG6 = (<any>SPN)._create(Chromatic.GG, 6);
        return _GG6;
    }
    static get A6(): SPN {
        if (!_A6)
            _A6 = (<any>SPN)._create(Chromatic.A, 6);
        return _A6;
    }
    static get AA6(): SPN {
        if (!_AA6)
            _AA6 = (<any>SPN)._create(Chromatic.AA, 6);
        return _AA6;
    }
    static get B6(): SPN {
        if (!_B6)
            _B6 = (<any>SPN)._create(Chromatic.B, 6);
        return _B6;
    }
    static get C7(): SPN {
        if (!_C7)
            _C7 = (<any>SPN)._create(Chromatic.C, 7);
        return _C7;
    }
    static get CC7(): SPN {
        if (!_CC7)
            _CC7 = (<any>SPN)._create(Chromatic.CC, 7);
        return _CC7;
    }
    static get D7(): SPN {
        if (!_D7)
            _D7 = (<any>SPN)._create(Chromatic.D, 7);
        return _D7;
    }
    static get DD7(): SPN {
        if (!_DD7)
            _DD7 = (<any>SPN)._create(Chromatic.DD, 7);
        return _DD7;
    }
    static get E7(): SPN {
        if (!_E7)
            _E7 = (<any>SPN)._create(Chromatic.E, 7);
        return _E7;
    }
    static get F7(): SPN {
        if (!_F7)
            _F7 = (<any>SPN)._create(Chromatic.F, 7);
        return _F7;
    }
    static get FF7(): SPN {
        if (!_FF7)
            _FF7 = (<any>SPN)._create(Chromatic.FF, 7);
        return _FF7;
    }
    static get G7(): SPN {
        if (!_G7)
            _G7 = (<any>SPN)._create(Chromatic.G, 7);
        return _G7;
    }
    static get GG7(): SPN {
        if (!_GG7)
            _GG7 = (<any>SPN)._create(Chromatic.GG, 7);
        return _GG7;
    }
    static get A7(): SPN {
        if (!_A7)
            _A7 = (<any>SPN)._create(Chromatic.A, 7);
        return _A7;
    }
    static get AA7(): SPN {
        if (!_AA7)
            _AA7 = (<any>SPN)._create(Chromatic.AA, 7);
        return _AA7;
    }
    static get B7(): SPN {
        if (!_B7)
            _B7 = (<any>SPN)._create(Chromatic.B, 7);
        return _B7;
    }
    static get C8(): SPN {
        if (!_C8)
            _C8 = (<any>SPN)._create(Chromatic.C, 8);
        return _C8;
    }
    static get CC8(): SPN {
        if (!_CC8)
            _CC8 = (<any>SPN)._create(Chromatic.CC, 8);
        return _CC8;
    }
    static get D8(): SPN {
        if (!_D8)
            _D8 = (<any>SPN)._create(Chromatic.D, 8);
        return _D8;
    }
    static get DD8(): SPN {
        if (!_DD8)
            _DD8 = (<any>SPN)._create(Chromatic.DD, 8);
        return _DD8;
    }
    static get E8(): SPN {
        if (!_E8)
            _E8 = (<any>SPN)._create(Chromatic.E, 8);
        return _E8;
    }
    static get F8(): SPN {
        if (!_F8)
            _F8 = (<any>SPN)._create(Chromatic.F, 8);
        return _F8;
    }
    static get FF8(): SPN {
        if (!_FF8)
            _FF8 = (<any>SPN)._create(Chromatic.FF, 8);
        return _FF8;
    }
    static get G8(): SPN {
        if (!_G8)
            _G8 = (<any>SPN)._create(Chromatic.G, 8);
        return _G8;
    }
    static get GG8(): SPN {
        if (!_GG8)
            _GG8 = (<any>SPN)._create(Chromatic.GG, 8);
        return _GG8;
    }
    static get A8(): SPN {
        if (!_A8)
            _A8 = (<any>SPN)._create(Chromatic.A, 8);
        return _A8;
    }
    static get AA8(): SPN {
        if (!_AA8)
            _AA8 = (<any>SPN)._create(Chromatic.AA, 8);
        return _AA8;
    }
    static get B8(): SPN {
        if (!_B8)
            _B8 = (<any>SPN)._create(Chromatic.B, 8);
        return _B8;
    }
    static get C9(): SPN {
        if (!_C9)
            _C9 = (<any>SPN)._create(Chromatic.C, 9);
        return _C9;
    }
    static get CC9(): SPN {
        if (!_CC9)
            _CC9 = (<any>SPN)._create(Chromatic.CC, 9);
        return _CC9;
    }
    static get D9(): SPN {
        if (!_D9)
            _D9 = (<any>SPN)._create(Chromatic.D, 9);
        return _D9;
    }
    static get DD9(): SPN {
        if (!_DD9)
            _DD9 = (<any>SPN)._create(Chromatic.DD, 9);
        return _DD9;
    }
    static get E9(): SPN {
        if (!_E9)
            _E9 = (<any>SPN)._create(Chromatic.E, 9);
        return _E9;
    }
    static get F9(): SPN {
        if (!_F9)
            _F9 = (<any>SPN)._create(Chromatic.F, 9);
        return _F9;
    }
    static get FF9(): SPN {
        if (!_FF9)
            _FF9 = (<any>SPN)._create(Chromatic.FF, 9);
        return _FF9;
    }
    static get G9(): SPN {
        if (!_G9)
            _G9 = (<any>SPN)._create(Chromatic.G, 9);
        return _G9;
    }
    static get GG9(): SPN {
        if (!_GG9)
            _GG9 = (<any>SPN)._create(Chromatic.GG, 9);
        return _GG9;
    }
    static get A9(): SPN {
        if (!_A9)
            _A9 = (<any>SPN)._create(Chromatic.A, 9);
        return _A9;
    }
    static get AA9(): SPN {
        if (!_AA9)
            _AA9 = (<any>SPN)._create(Chromatic.AA, 9);
        return _AA9;
    }
    static get B9(): SPN {
        if (!_B9)
            _B9 = (<any>SPN)._create(Chromatic.B, 9);
        return _B9;
    }
}

let _C_S1: SPN, _CC_S1: SPN, _D_S1: SPN, _DD_S1: SPN, _E_S1: SPN, _F_S1: SPN, _FF_S1: SPN, _G_S1: SPN, _GG_S1: SPN, _A_S1: SPN, _AA_S1: SPN, _B_S1: SPN;
let _C0: SPN, _CC0: SPN, _D0: SPN, _DD0: SPN, _E0: SPN, _F0: SPN, _FF0: SPN, _G0: SPN, _GG0: SPN, _A0: SPN, _AA0: SPN, _B0: SPN;
let _C1: SPN, _CC1: SPN, _D1: SPN, _DD1: SPN, _E1: SPN, _F1: SPN, _FF1: SPN, _G1: SPN, _GG1: SPN, _A1: SPN, _AA1: SPN, _B1: SPN;
let _C2: SPN, _CC2: SPN, _D2: SPN, _DD2: SPN, _E2: SPN, _F2: SPN, _FF2: SPN, _G2: SPN, _GG2: SPN, _A2: SPN, _AA2: SPN, _B2: SPN;
let _C3: SPN, _CC3: SPN, _D3: SPN, _DD3: SPN, _E3: SPN, _F3: SPN, _FF3: SPN, _G3: SPN, _GG3: SPN, _A3: SPN, _AA3: SPN, _B3: SPN;
let _C4: SPN, _CC4: SPN, _D4: SPN, _DD4: SPN, _E4: SPN, _F4: SPN, _FF4: SPN, _G4: SPN, _GG4: SPN, _A4: SPN, _AA4: SPN, _B4: SPN;
let _C5: SPN, _CC5: SPN, _D5: SPN, _DD5: SPN, _E5: SPN, _F5: SPN, _FF5: SPN, _G5: SPN, _GG5: SPN, _A5: SPN, _AA5: SPN, _B5: SPN;
let _C6: SPN, _CC6: SPN, _D6: SPN, _DD6: SPN, _E6: SPN, _F6: SPN, _FF6: SPN, _G6: SPN, _GG6: SPN, _A6: SPN, _AA6: SPN, _B6: SPN;
let _C7: SPN, _CC7: SPN, _D7: SPN, _DD7: SPN, _E7: SPN, _F7: SPN, _FF7: SPN, _G7: SPN, _GG7: SPN, _A7: SPN, _AA7: SPN, _B7: SPN;
let _C8: SPN, _CC8: SPN, _D8: SPN, _DD8: SPN, _E8: SPN, _F8: SPN, _FF8: SPN, _G8: SPN, _GG8: SPN, _A8: SPN, _AA8: SPN, _B8: SPN;
let _C9: SPN, _CC9: SPN, _D9: SPN, _DD9: SPN, _E9: SPN, _F9: SPN, _FF9: SPN, _G9: SPN, _GG9: SPN, _A9: SPN, _AA9: SPN, _B9: SPN;