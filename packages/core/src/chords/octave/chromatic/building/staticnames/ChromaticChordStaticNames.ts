import { Chromatic } from "../../../../../pitches";
import { ChromaticPattern } from "../../../../../voicings";
import { ChromaticChord } from "../../ChromaticChord";

export class ChordStaticNames {
    static get C(): ChromaticChord {
        if (!_C)
            _C = ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.TRIAD_MAJOR);

        return _C;
    }
    static get CC(): ChromaticChord {
        if (!_CC)
            _CC = ChromaticChord.fromRootPattern(Chromatic.CC, ChromaticPattern.TRIAD_MAJOR);

        return _CC;
    }
    static get D(): ChromaticChord {
        if (!_D)
            _D = ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.TRIAD_MAJOR);

        return _D;
    }
    static get DD(): ChromaticChord {
        if (!_DD)
            _DD = ChromaticChord.fromRootPattern(Chromatic.DD, ChromaticPattern.TRIAD_MAJOR);

        return _DD;
    }
    static get E(): ChromaticChord {
        if (!_E)
            _E = ChromaticChord.fromRootPattern(Chromatic.E, ChromaticPattern.TRIAD_MAJOR);

        return _E;
    }
    static get F(): ChromaticChord {
        if (!_F)
            _F = ChromaticChord.fromRootPattern(Chromatic.F, ChromaticPattern.TRIAD_MAJOR);

        return _F;
    }
    static get FF(): ChromaticChord {
        if (!_FF)
            _FF = ChromaticChord.fromRootPattern(Chromatic.FF, ChromaticPattern.TRIAD_MAJOR);

        return _FF;
    }
    static get G(): ChromaticChord {
        if (!_G)
            _G = ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.TRIAD_MAJOR);

        return _G;
    }
    static get GG(): ChromaticChord {
        if (!_GG)
            _GG = ChromaticChord.fromRootPattern(Chromatic.GG, ChromaticPattern.TRIAD_MAJOR);

        return _GG;
    }
    static get A(): ChromaticChord {
        if (!_A)
            _A = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.TRIAD_MAJOR);

        return _A;
    }
    static get AA(): ChromaticChord {
        if (!_AA)
            _AA = ChromaticChord.fromRootPattern(Chromatic.AA, ChromaticPattern.TRIAD_MAJOR);

        return _AA;
    }
    static get B(): ChromaticChord {
        if (!_B)
            _B = ChromaticChord.fromRootPattern(Chromatic.B, ChromaticPattern.TRIAD_MAJOR);

        return _B;
    }

    static get C5(): ChromaticChord {
        if (!_C5)
            _C5 = ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.POWER_CHORD);

        return _C5;
    }
    static get CC5(): ChromaticChord {
        if (!_CC5)
            _CC5 = ChromaticChord.fromRootPattern(Chromatic.CC, ChromaticPattern.POWER_CHORD);

        return _CC5;
    }
    static get D5(): ChromaticChord {
        if (!_D5)
            _D5 = ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.POWER_CHORD);

        return _D5;
    }
    static get DD5(): ChromaticChord {
        if (!_DD5)
            _DD5 = ChromaticChord.fromRootPattern(Chromatic.DD, ChromaticPattern.POWER_CHORD);

        return _DD5;
    }
    static get E5(): ChromaticChord {
        if (!_E5)
            _E5 = ChromaticChord.fromRootPattern(Chromatic.E, ChromaticPattern.POWER_CHORD);

        return _E5;
    }
    static get F5(): ChromaticChord {
        if (!_F5)
            _F5 = ChromaticChord.fromRootPattern(Chromatic.F, ChromaticPattern.POWER_CHORD);

        return _F5;
    }
    static get FF5(): ChromaticChord {
        if (!_FF5)
            _FF5 = ChromaticChord.fromRootPattern(Chromatic.FF, ChromaticPattern.POWER_CHORD);

        return _FF5;
    }
    static get G5(): ChromaticChord {
        if (!_G5)
            _G5 = ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.POWER_CHORD);

        return _G5;
    }
    static get GG5(): ChromaticChord {
        if (!_GG5)
            _GG5 = ChromaticChord.fromRootPattern(Chromatic.GG, ChromaticPattern.POWER_CHORD);

        return _GG5;
    }
    static get A5(): ChromaticChord {
        if (!_A5)
            _A5 = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.POWER_CHORD);

        return _A5;
    }
    static get AA5(): ChromaticChord {
        if (!_AA5)
            _AA5 = ChromaticChord.fromRootPattern(Chromatic.AA, ChromaticPattern.POWER_CHORD);

        return _AA5;
    }
    static get B5(): ChromaticChord {
        if (!_B5)
            _B5 = ChromaticChord.fromRootPattern(Chromatic.B, ChromaticPattern.POWER_CHORD);

        return _B5;
    }

    static get C0(): ChromaticChord {
        if (!_C0)
            _C0 = ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.TRIAD_DIMINISHED);

        return _C0;
    }
    static get CC0(): ChromaticChord {
        if (!_CC0)
            _CC0 = ChromaticChord.fromRootPattern(Chromatic.CC, ChromaticPattern.TRIAD_DIMINISHED);

        return _CC0;
    }
    static get D0(): ChromaticChord {
        if (!_D0)
            _D0 = ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.TRIAD_DIMINISHED);

        return _D0;
    }
    static get DD0(): ChromaticChord {
        if (!_DD0)
            _DD0 = ChromaticChord.fromRootPattern(Chromatic.DD, ChromaticPattern.TRIAD_DIMINISHED);

        return _DD0;
    }
    static get E0(): ChromaticChord {
        if (!_E0)
            _E0 = ChromaticChord.fromRootPattern(Chromatic.E, ChromaticPattern.TRIAD_DIMINISHED);

        return _E0;
    }
    static get F0(): ChromaticChord {
        if (!_F0)
            _F0 = ChromaticChord.fromRootPattern(Chromatic.F, ChromaticPattern.TRIAD_DIMINISHED);

        return _F0;
    }
    static get FF0(): ChromaticChord {
        if (!_FF0)
            _FF0 = ChromaticChord.fromRootPattern(Chromatic.FF, ChromaticPattern.TRIAD_DIMINISHED);

        return _FF0;
    }
    static get G0(): ChromaticChord {
        if (!_G0)
            _G0 = ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.TRIAD_DIMINISHED);

        return _G0;
    }
    static get GG0(): ChromaticChord {
        if (!_GG0)
            _GG0 = ChromaticChord.fromRootPattern(Chromatic.GG, ChromaticPattern.TRIAD_DIMINISHED);

        return _GG0;
    }
    static get A0(): ChromaticChord {
        if (!_A0)
            _A0 = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.TRIAD_DIMINISHED);

        return _A0;
    }
    static get AA0(): ChromaticChord {
        if (!_AA0)
            _AA0 = ChromaticChord.fromRootPattern(Chromatic.AA, ChromaticPattern.TRIAD_DIMINISHED);

        return _AA0;
    }
    static get B0(): ChromaticChord {
        if (!_B0)
            _B0 = ChromaticChord.fromRootPattern(Chromatic.B, ChromaticPattern.TRIAD_DIMINISHED);

        return _B0;
    }

    static get Csus4(): ChromaticChord {
        if (!_Csus4)
            _Csus4 = ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.TRIAD_SUS4);

        return _Csus4;
    }
    static get CCsus4(): ChromaticChord {
        if (!_CCsus4)
            _CCsus4 = ChromaticChord.fromRootPattern(Chromatic.CC, ChromaticPattern.TRIAD_SUS4);

        return _CCsus4;
    }
    static get Dsus4(): ChromaticChord {
        if (!_Dsus4)
            _Dsus4 = ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.TRIAD_SUS4);

        return _Dsus4;
    }
    static get DDsus4(): ChromaticChord {
        if (!_DDsus4)
            _DDsus4 = ChromaticChord.fromRootPattern(Chromatic.DD, ChromaticPattern.TRIAD_SUS4);

        return _DDsus4;
    }
    static get Esus4(): ChromaticChord {
        if (!_Esus4)
            _Esus4 = ChromaticChord.fromRootPattern(Chromatic.E, ChromaticPattern.TRIAD_SUS4);

        return _Esus4;
    }
    static get Fsus4(): ChromaticChord {
        if (!_Fsus4)
            _Fsus4 = ChromaticChord.fromRootPattern(Chromatic.F, ChromaticPattern.TRIAD_SUS4);

        return _Fsus4;
    }
    static get FFsus4(): ChromaticChord {
        if (!_FFsus4)
            _FFsus4 = ChromaticChord.fromRootPattern(Chromatic.FF, ChromaticPattern.TRIAD_SUS4);

        return _FFsus4;
    }
    static get Gsus4(): ChromaticChord {
        if (!_Gsus4)
            _Gsus4 = ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.TRIAD_SUS4);

        return _Gsus4;
    }
    static get GGsus4(): ChromaticChord {
        if (!_GGsus4)
            _GGsus4 = ChromaticChord.fromRootPattern(Chromatic.GG, ChromaticPattern.TRIAD_SUS4);

        return _GGsus4;
    }
    static get Asus4(): ChromaticChord {
        if (!_Asus4)
            _Asus4 = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.TRIAD_SUS4);

        return _Asus4;
    }
    static get AAsus4(): ChromaticChord {
        if (!_AAsus4)
            _AAsus4 = ChromaticChord.fromRootPattern(Chromatic.AA, ChromaticPattern.TRIAD_SUS4);

        return _AAsus4;
    }
    static get Bsus4(): ChromaticChord {
        if (!_Bsus4)
            _Bsus4 = ChromaticChord.fromRootPattern(Chromatic.B, ChromaticPattern.TRIAD_SUS4);

        return _Bsus4;
    }

    static get Csus2(): ChromaticChord {
        if (!_Csus2)
            _Csus2 = ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.TRIAD_SUS2);

        return _Csus2;
    }
    static get CCsus2(): ChromaticChord {
        if (!_CCsus2)
            _CCsus2 = ChromaticChord.fromRootPattern(Chromatic.CC, ChromaticPattern.TRIAD_SUS2);

        return _CCsus2;
    }
    static get Dsus2(): ChromaticChord {
        if (!_Dsus2)
            _Dsus2 = ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.TRIAD_SUS2);

        return _Dsus2;
    }
    static get DDsus2(): ChromaticChord {
        if (!_DDsus2)
            _DDsus2 = ChromaticChord.fromRootPattern(Chromatic.DD, ChromaticPattern.TRIAD_SUS2);

        return _DDsus2;
    }
    static get Esus2(): ChromaticChord {
        if (!_Esus2)
            _Esus2 = ChromaticChord.fromRootPattern(Chromatic.E, ChromaticPattern.TRIAD_SUS2);

        return _Esus2;
    }
    static get Fsus2(): ChromaticChord {
        if (!_Fsus2)
            _Fsus2 = ChromaticChord.fromRootPattern(Chromatic.F, ChromaticPattern.TRIAD_SUS2);

        return _Fsus2;
    }
    static get FFsus2(): ChromaticChord {
        if (!_FFsus2)
            _FFsus2 = ChromaticChord.fromRootPattern(Chromatic.FF, ChromaticPattern.TRIAD_SUS2);

        return _FFsus2;
    }
    static get Gsus2(): ChromaticChord {
        if (!_Gsus2)
            _Gsus2 = ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.TRIAD_SUS2);

        return _Gsus2;
    }
    static get GGsus2(): ChromaticChord {
        if (!_GGsus2)
            _GGsus2 = ChromaticChord.fromRootPattern(Chromatic.GG, ChromaticPattern.TRIAD_SUS2);

        return _GGsus2;
    }
    static get Asus2(): ChromaticChord {
        if (!_Asus2)
            _Asus2 = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.TRIAD_SUS2);

        return _Asus2;
    }
    static get AAsus2(): ChromaticChord {
        if (!_AAsus2)
            _AAsus2 = ChromaticChord.fromRootPattern(Chromatic.AA, ChromaticPattern.TRIAD_SUS2);

        return _AAsus2;
    }
    static get Bsus2(): ChromaticChord {
        if (!_Bsus2)
            _Bsus2 = ChromaticChord.fromRootPattern(Chromatic.B, ChromaticPattern.TRIAD_SUS2);

        return _Bsus2;
    }

    static get CMaj7(): ChromaticChord {
        if (!_CMaj7)
            _CMaj7 = ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.SEVENTH_MAJ7);

        return _CMaj7;
    }
    static get CCMaj7(): ChromaticChord {
        if (!_CCMaj7)
            _CCMaj7 = ChromaticChord.fromRootPattern(Chromatic.CC, ChromaticPattern.SEVENTH_MAJ7);

        return _CCMaj7;
    }
    static get DMaj7(): ChromaticChord {
        if (!_DMaj7)
            _DMaj7 = ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.SEVENTH_MAJ7);

        return _DMaj7;
    }
    static get DDMaj7(): ChromaticChord {
        if (!_DDMaj7)
            _DDMaj7 = ChromaticChord.fromRootPattern(Chromatic.DD, ChromaticPattern.SEVENTH_MAJ7);

        return _DDMaj7;
    }
    static get EMaj7(): ChromaticChord {
        if (!_EMaj7)
            _EMaj7 = ChromaticChord.fromRootPattern(Chromatic.E, ChromaticPattern.SEVENTH_MAJ7);

        return _EMaj7;
    }
    static get FMaj7(): ChromaticChord {
        if (!_FMaj7)
            _FMaj7 = ChromaticChord.fromRootPattern(Chromatic.F, ChromaticPattern.SEVENTH_MAJ7);

        return _FMaj7;
    }
    static get FFMaj7(): ChromaticChord {
        if (!_FFMaj7)
            _FFMaj7 = ChromaticChord.fromRootPattern(Chromatic.FF, ChromaticPattern.SEVENTH_MAJ7);

        return _FFMaj7;
    }
    static get GMaj7(): ChromaticChord {
        if (!_GMaj7)
            _GMaj7 = ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.SEVENTH_MAJ7);

        return _GMaj7;
    }
    static get GGMaj7(): ChromaticChord {
        if (!_GGMaj7)
            _GGMaj7 = ChromaticChord.fromRootPattern(Chromatic.GG, ChromaticPattern.SEVENTH_MAJ7);

        return _GGMaj7;
    }
    static get AMaj7(): ChromaticChord {
        if (!_AMaj7)
            _AMaj7 = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.SEVENTH_MAJ7);

        return _AMaj7;
    }
    static get AAMaj7(): ChromaticChord {
        if (!_AAMaj7)
            _AAMaj7 = ChromaticChord.fromRootPattern(Chromatic.AA, ChromaticPattern.SEVENTH_MAJ7);

        return _AAMaj7;
    }
    static get BMaj7(): ChromaticChord {
        if (!_BMaj7)
            _BMaj7 = ChromaticChord.fromRootPattern(Chromatic.B, ChromaticPattern.SEVENTH_MAJ7);

        return _BMaj7;
    }

    static get CmMaj7(): ChromaticChord {
        if (!_CmMaj7)
            _CmMaj7 = ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _CmMaj7;
    }
    static get CCmMaj7(): ChromaticChord {
        if (!_CCmMaj7)
            _CCmMaj7 = ChromaticChord.fromRootPattern(Chromatic.CC, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _CCmMaj7;
    }
    static get DmMaj7(): ChromaticChord {
        if (!_DmMaj7)
            _DmMaj7 = ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _DmMaj7;
    }
    static get DDmMaj7(): ChromaticChord {
        if (!_DDmMaj7)
            _DDmMaj7 = ChromaticChord.fromRootPattern(Chromatic.DD, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _DDmMaj7;
    }
    static get EmMaj7(): ChromaticChord {
        if (!_EmMaj7)
            _EmMaj7 = ChromaticChord.fromRootPattern(Chromatic.E, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _EmMaj7;
    }
    static get FmMaj7(): ChromaticChord {
        if (!_FmMaj7)
            _FmMaj7 = ChromaticChord.fromRootPattern(Chromatic.F, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _FmMaj7;
    }
    static get FFmMaj7(): ChromaticChord {
        if (!_FFmMaj7)
            _FFmMaj7 = ChromaticChord.fromRootPattern(Chromatic.FF, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _FFmMaj7;
    }
    static get GmMaj7(): ChromaticChord {
        if (!_GmMaj7)
            _GmMaj7 = ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _GmMaj7;
    }
    static get GGmMaj7(): ChromaticChord {
        if (!_GGmMaj7)
            _GGmMaj7 = ChromaticChord.fromRootPattern(Chromatic.GG, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _GGmMaj7;
    }
    static get AmMaj7(): ChromaticChord {
        if (!_AmMaj7)
            _AmMaj7 = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _AmMaj7;
    }
    static get AAmMaj7(): ChromaticChord {
        if (!_AAmMaj7)
            _AAmMaj7 = ChromaticChord.fromRootPattern(Chromatic.AA, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _AAmMaj7;
    }
    static get BmMaj7(): ChromaticChord {
        if (!_BmMaj7)
            _BmMaj7 = ChromaticChord.fromRootPattern(Chromatic.B, ChromaticPattern.SEVENTH_MINOR_MAJ7);

        return _BmMaj7;
    }

    static get Cm(): ChromaticChord {
        if (!_Cm)
            _Cm = ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.TRIAD_MINOR);

        return _Cm;
    }
    static get CCm(): ChromaticChord {
        if (!_CCm)
            _CCm = ChromaticChord.fromRootPattern(Chromatic.CC, ChromaticPattern.TRIAD_MINOR);

        return _CCm;
    }
    static get Dm(): ChromaticChord {
        if (!_Dm)
            _Dm = ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.TRIAD_MINOR);

        return _Dm;
    }
    static get DDm(): ChromaticChord {
        if (!_DDm)
            _DDm = ChromaticChord.fromRootPattern(Chromatic.DD, ChromaticPattern.TRIAD_MINOR);

        return _DDm;
    }
    static get Em(): ChromaticChord {
        if (!_Em)
            _Em = ChromaticChord.fromRootPattern(Chromatic.E, ChromaticPattern.TRIAD_MINOR);

        return _Em;
    }
    static get Fm(): ChromaticChord {
        if (!_Fm)
            _Fm = ChromaticChord.fromRootPattern(Chromatic.F, ChromaticPattern.TRIAD_MINOR);

        return _Fm;
    }
    static get FFm(): ChromaticChord {
        if (!_FFm)
            _FFm = ChromaticChord.fromRootPattern(Chromatic.FF, ChromaticPattern.TRIAD_MINOR);

        return _FFm;
    }
    static get Gm(): ChromaticChord {
        if (!_Gm)
            _Gm = ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.TRIAD_MINOR);

        return _Gm;
    }
    static get GGm(): ChromaticChord {
        if (!_GGm)
            _GGm = ChromaticChord.fromRootPattern(Chromatic.GG, ChromaticPattern.TRIAD_MINOR);

        return _GGm;
    }
    static get Am(): ChromaticChord {
        if (!_Am)
            _Am = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.TRIAD_MINOR);

        return _Am;
    }
    static get AAm(): ChromaticChord {
        if (!_AAm)
            _AAm = ChromaticChord.fromRootPattern(Chromatic.AA, ChromaticPattern.TRIAD_MINOR);

        return _AAm;
    }
    static get Bm(): ChromaticChord {
        if (!_Bm)
            _Bm = ChromaticChord.fromRootPattern(Chromatic.B, ChromaticPattern.TRIAD_MINOR);

        return _Bm;
    }

    static get C7(): ChromaticChord {
        if (!_C7)
            _C7 = ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.SEVENTH);

        return _C7;
    }
    static get CC7(): ChromaticChord {
        if (!_CC7)
            _CC7 = ChromaticChord.fromRootPattern(Chromatic.CC, ChromaticPattern.SEVENTH);

        return _CC7;
    }
    static get D7(): ChromaticChord {
        if (!_D7)
            _D7 = ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.SEVENTH);

        return _D7;
    }
    static get DD7(): ChromaticChord {
        if (!_DD7)
            _DD7 = ChromaticChord.fromRootPattern(Chromatic.DD, ChromaticPattern.SEVENTH);

        return _DD7;
    }
    static get E7(): ChromaticChord {
        if (!_E7)
            _E7 = ChromaticChord.fromRootPattern(Chromatic.E, ChromaticPattern.SEVENTH);

        return _E7;
    }
    static get F7(): ChromaticChord {
        if (!_F7)
            _F7 = ChromaticChord.fromRootPattern(Chromatic.F, ChromaticPattern.SEVENTH);

        return _F7;
    }
    static get FF7(): ChromaticChord {
        if (!_FF7)
            _FF7 = ChromaticChord.fromRootPattern(Chromatic.FF, ChromaticPattern.SEVENTH);

        return _FF7;
    }
    static get G7(): ChromaticChord {
        if (!_G7)
            _G7 = ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.SEVENTH);

        return _G7;
    }
    static get GG7(): ChromaticChord {
        if (!_GG7)
            _GG7 = ChromaticChord.fromRootPattern(Chromatic.GG, ChromaticPattern.SEVENTH);

        return _GG7;
    }
    static get A7(): ChromaticChord {
        if (!_A7)
            _A7 = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.SEVENTH);

        return _A7;
    }
    static get AA7(): ChromaticChord {
        if (!_AA7)
            _AA7 = ChromaticChord.fromRootPattern(Chromatic.AA, ChromaticPattern.SEVENTH);

        return _AA7;
    }
    static get B7(): ChromaticChord {
        if (!_B7)
            _B7 = ChromaticChord.fromRootPattern(Chromatic.B, ChromaticPattern.SEVENTH);

        return _B7;
    }

    static get Cm7(): ChromaticChord {
        if (!_Cm7)
            _Cm7 = ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.SEVENTH_MINOR);

        return _Cm7;
    }
    static get CCm7(): ChromaticChord {
        if (!_CCm7)
            _CCm7 = ChromaticChord.fromRootPattern(Chromatic.CC, ChromaticPattern.SEVENTH_MINOR);

        return _CCm7;
    }
    static get Dm7(): ChromaticChord {
        if (!_Dm7)
            _Dm7 = ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.SEVENTH_MINOR);

        return _Dm7;
    }
    static get DDm7(): ChromaticChord {
        if (!_DDm7)
            _DDm7 = ChromaticChord.fromRootPattern(Chromatic.DD, ChromaticPattern.SEVENTH_MINOR);

        return _DDm7;
    }
    static get Em7(): ChromaticChord {
        if (!_Em7)
            _Em7 = ChromaticChord.fromRootPattern(Chromatic.E, ChromaticPattern.SEVENTH_MINOR);

        return _Em7;
    }
    static get Fm7(): ChromaticChord {
        if (!_Fm7)
            _Fm7 = ChromaticChord.fromRootPattern(Chromatic.F, ChromaticPattern.SEVENTH_MINOR);

        return _Fm7;
    }
    static get FFm7(): ChromaticChord {
        if (!_FFm7)
            _FFm7 = ChromaticChord.fromRootPattern(Chromatic.FF, ChromaticPattern.SEVENTH_MINOR);

        return _FFm7;
    }
    static get Gm7(): ChromaticChord {
        if (!_Gm7)
            _Gm7 = ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.SEVENTH_MINOR);

        return _Gm7;
    }
    static get GGm7(): ChromaticChord {
        if (!_GGm7)
            _GGm7 = ChromaticChord.fromRootPattern(Chromatic.GG, ChromaticPattern.SEVENTH_MINOR);

        return _GGm7;
    }
    static get Am7(): ChromaticChord {
        if (!_Am7)
            _Am7 = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.SEVENTH_MINOR);

        return _Am7;
    }
    static get AAm7(): ChromaticChord {
        if (!_AAm7)
            _AAm7 = ChromaticChord.fromRootPattern(Chromatic.AA, ChromaticPattern.SEVENTH_MINOR);

        return _AAm7;
    }
    static get Bm7(): ChromaticChord {
        if (!_Bm7)
            _Bm7 = ChromaticChord.fromRootPattern(Chromatic.B, ChromaticPattern.SEVENTH_MINOR);

        return _Bm7;
    }

    static get C13b5a9(): ChromaticChord {
        if (!_C13b5a9)
            _C13b5a9 = ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _C13b5a9;
    }
    static get CC13b5a9(): ChromaticChord {
        if (!_CC13b5a9)
            _CC13b5a9 = ChromaticChord.fromRootPattern(Chromatic.CC, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _CC13b5a9;
    }
    static get D13b5a9(): ChromaticChord {
        if (!_D13b5a9)
            _D13b5a9 = ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _D13b5a9;
    }
    static get DD13b5a9(): ChromaticChord {
        if (!_DD13b5a9)
            _DD13b5a9 = ChromaticChord.fromRootPattern(Chromatic.DD, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _DD13b5a9;
    }
    static get E13b5a9(): ChromaticChord {
        if (!_E13b5a9)
            _E13b5a9 = ChromaticChord.fromRootPattern(Chromatic.E, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _E13b5a9;
    }
    static get F13b5a9(): ChromaticChord {
        if (!_F13b5a9)
            _F13b5a9 = ChromaticChord.fromRootPattern(Chromatic.F, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _F13b5a9;
    }
    static get FF13b5a9(): ChromaticChord {
        if (!_FF13b5a9)
            _FF13b5a9 = ChromaticChord.fromRootPattern(Chromatic.FF, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _FF13b5a9;
    }
    static get G13b5a9(): ChromaticChord {
        if (!_G13b5a9)
            _G13b5a9 = ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _G13b5a9;
    }
    static get GG13b5a9(): ChromaticChord {
        if (!_GG13b5a9)
            _GG13b5a9 = ChromaticChord.fromRootPattern(Chromatic.GG, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _GG13b5a9;
    }
    static get A13b5a9(): ChromaticChord {
        if (!_A13b5a9)
            _A13b5a9 = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _A13b5a9;
    }
    static get AA13b5a9(): ChromaticChord {
        if (!_AA13b5a9)
            _AA13b5a9 = ChromaticChord.fromRootPattern(Chromatic.AA, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _AA13b5a9;
    }
    static get B13b5a9(): ChromaticChord {
        if (!_B13b5a9)
            _B13b5a9 = ChromaticChord.fromRootPattern(Chromatic.A, ChromaticPattern.THIRTEENTH_MAJ13_b5a9);

        return _B13b5a9;
    }

    static all(): ChromaticChord[] {
        if (!_all)
            _all = _calcAll();
        return _all;
    }

    static allNonInversions(): ChromaticChord[] {
        if (!_allNonInversions)
            _allNonInversions = calculateAllNonInversions();
        return _allNonInversions;
    }
}

function calculateAllNonInversions(): ChromaticChord[] {
    let ret = [];
    for (const pattern of ChromaticPattern.allNonInversions())
        for (const note of Chromatic.all) {
            const chord = ChromaticChord.fromRootPattern(note, pattern);
            ret.push(chord);
        }

    return ret;
}

function _calcAll(): ChromaticChord[] {
    let set = new Set<ChromaticChord>();
    for (const pattern of ChromaticPattern.allNonInversions())
        for (const note of Chromatic.all) {
            const chord = ChromaticChord.fromRootPattern(note, pattern);
            set.add(chord);
            let chordInv = chord;
            for (let i = 1; i < chord.length; i++) {
                chordInv = chordInv.withInv();
                set.add(chordInv);
            }
        }

    return [...set];
}

let _C: ChromaticChord, _CC: ChromaticChord, _D: ChromaticChord, _DD: ChromaticChord, _E: ChromaticChord, _F: ChromaticChord, _FF: ChromaticChord, _G: ChromaticChord, _GG: ChromaticChord, _A: ChromaticChord, _AA: ChromaticChord, _B: ChromaticChord;
let _C5: ChromaticChord, _CC5: ChromaticChord, _D5: ChromaticChord, _DD5: ChromaticChord, _E5: ChromaticChord, _F5: ChromaticChord, _FF5: ChromaticChord, _G5: ChromaticChord, _GG5: ChromaticChord, _A5: ChromaticChord, _AA5: ChromaticChord, _B5: ChromaticChord;
let _C0: ChromaticChord, _CC0: ChromaticChord, _D0: ChromaticChord, _DD0: ChromaticChord, _E0: ChromaticChord, _F0: ChromaticChord, _FF0: ChromaticChord, _G0: ChromaticChord, _GG0: ChromaticChord, _A0: ChromaticChord, _AA0: ChromaticChord, _B0: ChromaticChord;
let _Csus4: ChromaticChord, _CCsus4: ChromaticChord, _Dsus4: ChromaticChord, _DDsus4: ChromaticChord, _Esus4: ChromaticChord, _Fsus4: ChromaticChord, _FFsus4: ChromaticChord, _Gsus4: ChromaticChord, _GGsus4: ChromaticChord, _Asus4: ChromaticChord, _AAsus4: ChromaticChord, _Bsus4: ChromaticChord;
let _Csus2: ChromaticChord, _CCsus2: ChromaticChord, _Dsus2: ChromaticChord, _DDsus2: ChromaticChord, _Esus2: ChromaticChord, _Fsus2: ChromaticChord, _FFsus2: ChromaticChord, _Gsus2: ChromaticChord, _GGsus2: ChromaticChord, _Asus2: ChromaticChord, _AAsus2: ChromaticChord, _Bsus2: ChromaticChord;
let _CMaj7: ChromaticChord, _CCMaj7: ChromaticChord, _DMaj7: ChromaticChord, _DDMaj7: ChromaticChord, _EMaj7: ChromaticChord, _FMaj7: ChromaticChord, _FFMaj7: ChromaticChord, _GMaj7: ChromaticChord, _GGMaj7: ChromaticChord, _AMaj7: ChromaticChord, _AAMaj7: ChromaticChord, _BMaj7: ChromaticChord;
let _CmMaj7: ChromaticChord, _CCmMaj7: ChromaticChord, _DmMaj7: ChromaticChord, _DDmMaj7: ChromaticChord, _EmMaj7: ChromaticChord, _FmMaj7: ChromaticChord, _FFmMaj7: ChromaticChord, _GmMaj7: ChromaticChord, _GGmMaj7: ChromaticChord, _AmMaj7: ChromaticChord, _AAmMaj7: ChromaticChord, _BmMaj7: ChromaticChord;
let _Cm: ChromaticChord, _CCm: ChromaticChord, _Dm: ChromaticChord, _DDm: ChromaticChord, _Em: ChromaticChord, _Fm: ChromaticChord, _FFm: ChromaticChord, _Gm: ChromaticChord, _GGm: ChromaticChord, _Am: ChromaticChord, _AAm: ChromaticChord, _Bm: ChromaticChord;
let _C7: ChromaticChord, _CC7: ChromaticChord, _D7: ChromaticChord, _DD7: ChromaticChord, _E7: ChromaticChord, _F7: ChromaticChord, _FF7: ChromaticChord, _G7: ChromaticChord, _GG7: ChromaticChord, _A7: ChromaticChord, _AA7: ChromaticChord, _B7: ChromaticChord;
let _Cm7: ChromaticChord, _CCm7: ChromaticChord, _Dm7: ChromaticChord, _DDm7: ChromaticChord, _Em7: ChromaticChord, _Fm7: ChromaticChord, _FFm7: ChromaticChord, _Gm7: ChromaticChord, _GGm7: ChromaticChord, _Am7: ChromaticChord, _AAm7: ChromaticChord, _Bm7: ChromaticChord;
let _C13b5a9: ChromaticChord, _CC13b5a9: ChromaticChord, _D13b5a9: ChromaticChord, _DD13b5a9: ChromaticChord, _E13b5a9: ChromaticChord, _F13b5a9: ChromaticChord, _FF13b5a9: ChromaticChord, _G13b5a9: ChromaticChord, _GG13b5a9: ChromaticChord, _A13b5a9: ChromaticChord, _AA13b5a9: ChromaticChord, _B13b5a9: ChromaticChord;
let _all: ChromaticChord[], _allNonInversions: ChromaticChord[];