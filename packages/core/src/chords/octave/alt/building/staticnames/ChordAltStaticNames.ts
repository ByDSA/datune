import { DiatonicAlt } from "../../../../../pitches";
import { DiatonicAltPattern } from "../../../../../voicings";
import { ChordAlt } from "../../ChordAlt";
import { RootPatternAltBuilder } from "../builders/rootpattern/RootPatternAltBuilder";

export class ChordAltStaticNames {
    static get C(): ChordAlt {
        if (!_C)
            _C = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _C;
    }
    static get CC(): ChordAlt {
        if (!_CC)
            _CC = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _CC;
    }
    static get Db(): ChordAlt {
        if (!_Db)
            _Db = RootPatternAltBuilder
                .from(DiatonicAlt.Db, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _Db;
    }
    static get D(): ChordAlt {
        if (!_D)
            _D = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _D;
    }
    static get DD(): ChordAlt {
        if (!_DD)
            _DD = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _DD;
    }
    static get Eb(): ChordAlt {
        if (!_Eb)
            _Eb = RootPatternAltBuilder
                .from(DiatonicAlt.Eb, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _Eb;
    }
    static get E(): ChordAlt {
        if (!_E)
            _E = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _E;
    }
    static get F(): ChordAlt {
        if (!_F)
            _F = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _F;
    }
    static get FF(): ChordAlt {
        if (!_FF)
            _FF = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _FF;
    }
    static get G(): ChordAlt {
        if (!_G)
            _G = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _G;
    }
    static get GG(): ChordAlt {
        if (!_GG)
            _GG = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _GG;
    }
    static get Ab(): ChordAlt {
        if (!_Ab)
            _Ab = RootPatternAltBuilder
                .from(DiatonicAlt.Ab, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _Ab;
    }
    static get A(): ChordAlt {
        if (!_A)
            _A = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _A;
    }
    static get AA(): ChordAlt {
        if (!_AA)
            _AA = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _AA;
    }
    static get Bb(): ChordAlt {
        if (!_Bb)
            _Bb = RootPatternAltBuilder
                .from(DiatonicAlt.Bb, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _Bb;
    }
    static get B(): ChordAlt {
        if (!_B)
            _B = RootPatternAltBuilder
                .from(DiatonicAlt.B, DiatonicAltPattern.TRIAD_MAJOR)
                .build();
        return _B;
    }

    static get C5(): ChordAlt {
        if (!_C5)
            _C5 = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _C5;
    }
    static get CC5(): ChordAlt {
        if (!_CC5)
            _CC5 = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _CC5;
    }
    static get D5(): ChordAlt {
        if (!_D5)
            _D5 = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _D5;
    }
    static get DD5(): ChordAlt {
        if (!_DD5)
            _DD5 = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _DD5;
    }
    static get E5(): ChordAlt {
        if (!_E5)
            _E5 = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _E5;
    }
    static get F5(): ChordAlt {
        if (!_F5)
            _F5 = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _F5;
    }
    static get FF5(): ChordAlt {
        if (!_FF5)
            _FF5 = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _FF5;
    }
    static get G5(): ChordAlt {
        if (!_G5)
            _G5 = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _G5;
    }
    static get GG5(): ChordAlt {
        if (!_GG5)
            _GG5 = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _GG5;
    }
    static get A5(): ChordAlt {
        if (!_A5)
            _A5 = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _A5;
    }
    static get AA5(): ChordAlt {
        if (!_AA5)
            _AA5 = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _AA5;
    }
    static get B5(): ChordAlt {
        if (!_B5)
            _B5 = RootPatternAltBuilder
                .from(DiatonicAlt.B, DiatonicAltPattern.POWER_CHORD)
                .build();
        return _B5;
    }

    static get C0(): ChordAlt {
        if (!_C0)
            _C0 = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _C0;
    }
    static get CC0(): ChordAlt {
        if (!_CC0)
            _CC0 = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _CC0;
    }
    static get D0(): ChordAlt {
        if (!_D0)
            _D0 = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _D0;
    }
    static get DD0(): ChordAlt {
        if (!_DD0)
            _DD0 = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _DD0;
    }
    static get E0(): ChordAlt {
        if (!_E0)
            _E0 = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _E0;
    }
    static get F0(): ChordAlt {
        if (!_F0)
            _F0 = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _F0;
    }
    static get FF0(): ChordAlt {
        if (!_FF0)
            _FF0 = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _FF0;
    }
    static get G0(): ChordAlt {
        if (!_G0)
            _G0 = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _G0;
    }
    static get GG0(): ChordAlt {
        if (!_GG0)
            _GG0 = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _GG0;
    }
    static get A0(): ChordAlt {
        if (!_A0)
            _A0 = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _A0;
    }
    static get AA0(): ChordAlt {
        if (!_AA0)
            _AA0 = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _AA0;
    }
    static get B0(): ChordAlt {
        if (!_B0)
            _B0 = RootPatternAltBuilder
                .from(DiatonicAlt.B, DiatonicAltPattern.TRIAD_DIMINISHED)
                .build();
        return _B0;
    }

    static get Csus4(): ChordAlt {
        if (!_Csus4)
            _Csus4 = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _Csus4;
    }
    static get CCsus4(): ChordAlt {
        if (!_CCsus4)
            _CCsus4 = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _CCsus4;
    }
    static get Dsus4(): ChordAlt {
        if (!_Dsus4)
            _Dsus4 = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _Dsus4;
    }
    static get DDsus4(): ChordAlt {
        if (!_DDsus4)
            _DDsus4 = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _DDsus4;
    }
    static get Esus4(): ChordAlt {
        if (!_Esus4)
            _Esus4 = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _Esus4;
    }
    static get Fsus4(): ChordAlt {
        if (!_Fsus4)
            _Fsus4 = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _Fsus4;
    }
    static get FFsus4(): ChordAlt {
        if (!_FFsus4)
            _FFsus4 = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _FFsus4;
    }
    static get Gsus4(): ChordAlt {
        if (!_Gsus4)
            _Gsus4 = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _Gsus4;
    }
    static get GGsus4(): ChordAlt {
        if (!_GGsus4)
            _GGsus4 = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _GGsus4;
    }
    static get Asus4(): ChordAlt {
        if (!_Asus4)
            _Asus4 = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _Asus4;
    }
    static get AAsus4(): ChordAlt {
        if (!_AAsus4)
            _AAsus4 = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _AAsus4;
    }
    static get Bsus4(): ChordAlt {
        if (!_Bsus4)
            _Bsus4 = RootPatternAltBuilder
                .from(DiatonicAlt.B, DiatonicAltPattern.TRIAD_SUS4)
                .build();
        return _Bsus4;
    }

    static get Csus2(): ChordAlt {
        if (!_Csus2)
            _Csus2 = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _Csus2;
    }
    static get CCsus2(): ChordAlt {
        if (!_CCsus2)
            _CCsus2 = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _CCsus2;
    }
    static get Dsus2(): ChordAlt {
        if (!_Dsus2)
            _Dsus2 = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _Dsus2;
    }
    static get DDsus2(): ChordAlt {
        if (!_DDsus2)
            _DDsus2 = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _DDsus2;
    }
    static get Esus2(): ChordAlt {
        if (!_Esus2)
            _Esus2 = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _Esus2;
    }
    static get Fsus2(): ChordAlt {
        if (!_Fsus2)
            _Fsus2 = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _Fsus2;
    }
    static get FFsus2(): ChordAlt {
        if (!_FFsus2)
            _FFsus2 = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _FFsus2;
    }
    static get Gsus2(): ChordAlt {
        if (!_Gsus2)
            _Gsus2 = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _Gsus2;
    }
    static get GGsus2(): ChordAlt {
        if (!_GGsus2)
            _GGsus2 = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _GGsus2;
    }
    static get Asus2(): ChordAlt {
        if (!_Asus2)
            _Asus2 = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _Asus2;
    }
    static get AAsus2(): ChordAlt {
        if (!_AAsus2)
            _AAsus2 = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _AAsus2;
    }
    static get Bsus2(): ChordAlt {
        if (!_Bsus2)
            _Bsus2 = RootPatternAltBuilder
                .from(DiatonicAlt.B, DiatonicAltPattern.TRIAD_SUS2)
                .build();
        return _Bsus2;
    }

    static get CMaj7(): ChordAlt {
        if (!_CMaj7)
            _CMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _CMaj7;
    }
    static get CCMaj7(): ChordAlt {
        if (!_CCMaj7)
            _CCMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _CCMaj7;
    }
    static get DMaj7(): ChordAlt {
        if (!_DMaj7)
            _DMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _DMaj7;
    }
    static get DDMaj7(): ChordAlt {
        if (!_DDMaj7)
            _DDMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _DDMaj7;
    }
    static get EMaj7(): ChordAlt {
        if (!_EMaj7)
            _EMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _EMaj7;
    }
    static get FMaj7(): ChordAlt {
        if (!_FMaj7)
            _FMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _FMaj7;
    }
    static get FFMaj7(): ChordAlt {
        if (!_FFMaj7)
            _FFMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _FFMaj7;
    }
    static get GMaj7(): ChordAlt {
        if (!_GMaj7)
            _GMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _GMaj7;
    }
    static get GGMaj7(): ChordAlt {
        if (!_GGMaj7)
            _GGMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _GGMaj7;
    }
    static get AMaj7(): ChordAlt {
        if (!_AMaj7)
            _AMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _AMaj7;
    }
    static get AAMaj7(): ChordAlt {
        if (!_AAMaj7)
            _AAMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _AAMaj7;
    }
    static get BMaj7(): ChordAlt {
        if (!_BMaj7)
            _BMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.B, DiatonicAltPattern.SEVENTH_MAJ7)
                .build();
        return _BMaj7;
    }

    static get CmMaj7(): ChordAlt {
        if (!_CmMaj7)
            _CmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _CmMaj7;
    }
    static get CCmMaj7(): ChordAlt {
        if (!_CCmMaj7)
            _CCmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _CCmMaj7;
    }
    static get DmMaj7(): ChordAlt {
        if (!_DmMaj7)
            _DmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _DmMaj7;
    }
    static get DDmMaj7(): ChordAlt {
        if (!_DDmMaj7)
            _DDmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _DDmMaj7;
    }
    static get EmMaj7(): ChordAlt {
        if (!_EmMaj7)
            _EmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _EmMaj7;
    }
    static get FmMaj7(): ChordAlt {
        if (!_FmMaj7)
            _FmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _FmMaj7;
    }
    static get FFmMaj7(): ChordAlt {
        if (!_FFmMaj7)
            _FFmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _FFmMaj7;
    }
    static get GmMaj7(): ChordAlt {
        if (!_GmMaj7)
            _GmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _GmMaj7;
    }
    static get GGmMaj7(): ChordAlt {
        if (!_GGmMaj7)
            _GGmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _GGmMaj7;
    }
    static get AmMaj7(): ChordAlt {
        if (!_AmMaj7)
            _AmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _AmMaj7;
    }
    static get AAmMaj7(): ChordAlt {
        if (!_AAmMaj7)
            _AAmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _AAmMaj7;
    }
    static get BmMaj7(): ChordAlt {
        if (!_BmMaj7)
            _BmMaj7 = RootPatternAltBuilder
                .from(DiatonicAlt.B, DiatonicAltPattern.SEVENTH_MINOR_MAJ7)
                .build();
        return _BmMaj7;
    }

    static get Cm(): ChordAlt {
        if (!_Cm)
            _Cm = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Cm;
    }
    static get CCm(): ChordAlt {
        if (!_CCm)
            _CCm = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _CCm;
    }
    static get Dbm(): ChordAlt {
        if (!_Dbm)
            _Dbm = RootPatternAltBuilder
                .from(DiatonicAlt.Db, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Dbm;
    }
    static get Dm(): ChordAlt {
        if (!_Dm)
            _Dm = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Dm;
    }
    static get DDm(): ChordAlt {
        if (!_DDm)
            _DDm = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _DDm;
    }
    static get Ebm(): ChordAlt {
        if (!_Ebm)
            _Ebm = RootPatternAltBuilder
                .from(DiatonicAlt.Eb, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Ebm;
    }
    static get Em(): ChordAlt {
        if (!_Em)
            _Em = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Em;
    }
    static get Fm(): ChordAlt {
        if (!_Fm)
            _Fm = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Fm;
    }
    static get FFm(): ChordAlt {
        if (!_FFm)
            _FFm = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _FFm;
    }
    static get Gbm(): ChordAlt {
        if (!_Gbm)
            _Gbm = RootPatternAltBuilder
                .from(DiatonicAlt.Gb, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Gbm;
    }
    static get Gm(): ChordAlt {
        if (!_Gm)
            _Gm = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Gm;
    }
    static get GGm(): ChordAlt {
        if (!_GGm)
            _GGm = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _GGm;
    }
    static get Am(): ChordAlt {
        if (!_Am)
            _Am = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Am;
    }
    static get Abm(): ChordAlt {
        if (!_Abm)
            _Abm = RootPatternAltBuilder
                .from(DiatonicAlt.Ab, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Abm;
    }
    static get AAm(): ChordAlt {
        if (!_AAm)
            _AAm = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _AAm;
    }
    static get Bbm(): ChordAlt {
        if (!_Bbm)
            _Bbm = RootPatternAltBuilder
                .from(DiatonicAlt.Bb, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Bbm;
    }
    static get Bm(): ChordAlt {
        if (!_Bm)
            _Bm = RootPatternAltBuilder
                .from(DiatonicAlt.B, DiatonicAltPattern.TRIAD_MINOR)
                .build();
        return _Bm;
    }

    static get C7(): ChordAlt {
        if (!_C7)
            _C7 = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.SEVENTH)
                .build();
        return _C7;
    }
    static get CC7(): ChordAlt {
        if (!_CC7)
            _CC7 = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.SEVENTH)
                .build();
        return _CC7;
    }
    static get D7(): ChordAlt {
        if (!_D7)
            _D7 = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.SEVENTH)
                .build();
        return _D7;
    }
    static get DD7(): ChordAlt {
        if (!_DD7)
            _DD7 = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.SEVENTH)
                .build();
        return _DD7;
    }
    static get E7(): ChordAlt {
        if (!_E7)
            _E7 = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.SEVENTH)
                .build();
        return _E7;
    }
    static get F7(): ChordAlt {
        if (!_F7)
            _F7 = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.SEVENTH)
                .build();
        return _F7;
    }
    static get FF7(): ChordAlt {
        if (!_FF7)
            _FF7 = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.SEVENTH)
                .build();
        return _FF7;
    }
    static get G7(): ChordAlt {
        if (!_G7)
            _G7 = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.SEVENTH)
                .build();
        return _G7;
    }
    static get GG7(): ChordAlt {
        if (!_GG7)
            _GG7 = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.SEVENTH)
                .build();
        return _GG7;
    }
    static get A7(): ChordAlt {
        if (!_A7)
            _A7 = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.SEVENTH)
                .build();
        return _A7;
    }
    static get AA7(): ChordAlt {
        if (!_AA7)
            _AA7 = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.SEVENTH)
                .build();
        return _AA7;
    }
    static get B7(): ChordAlt {
        if (!_B7)
            _B7 = RootPatternAltBuilder
                .from(DiatonicAlt.B, DiatonicAltPattern.SEVENTH)
                .build();
        return _B7;
    }

    static get Cm7(): ChordAlt {
        if (!_Cm7)
            _Cm7 = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _Cm7;
    }
    static get CCm7(): ChordAlt {
        if (!_CCm7)
            _CCm7 = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _CCm7;
    }
    static get Dm7(): ChordAlt {
        if (!_Dm7)
            _Dm7 = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _Dm7;
    }
    static get DDm7(): ChordAlt {
        if (!_DDm7)
            _DDm7 = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _DDm7;
    }
    static get Em7(): ChordAlt {
        if (!_Em7)
            _Em7 = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _Em7;
    }
    static get Fm7(): ChordAlt {
        if (!_Fm7)
            _Fm7 = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _Fm7;
    }
    static get FFm7(): ChordAlt {
        if (!_FFm7)
            _FFm7 = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _FFm7;
    }
    static get Gm7(): ChordAlt {
        if (!_Gm7)
            _Gm7 = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _Gm7;
    }
    static get GGm7(): ChordAlt {
        if (!_GGm7)
            _GGm7 = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _GGm7;
    }
    static get Am7(): ChordAlt {
        if (!_Am7)
            _Am7 = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _Am7;
    }
    static get AAm7(): ChordAlt {
        if (!_AAm7)
            _AAm7 = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _AAm7;
    }
    static get Bm7(): ChordAlt {
        if (!_Bm7)
            _Bm7 = RootPatternAltBuilder
                .from(DiatonicAlt.B, DiatonicAltPattern.SEVENTH_MINOR)
                .build();
        return _Bm7;
    }

    static get C13b5a9(): ChordAlt {
        if (!_C13b5a9)
            _C13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _C13b5a9;
    }
    static get CC13b5a9(): ChordAlt {
        if (!_CC13b5a9)
            _CC13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _CC13b5a9;
    }
    static get D13b5a9(): ChordAlt {
        if (!_D13b5a9)
            _D13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _D13b5a9;
    }
    static get DD13b5a9(): ChordAlt {
        if (!_DD13b5a9)
            _DD13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _DD13b5a9;
    }
    static get E13b5a9(): ChordAlt {
        if (!_E13b5a9)
            _E13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _E13b5a9;
    }
    static get F13b5a9(): ChordAlt {
        if (!_F13b5a9)
            _F13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _F13b5a9;
    }
    static get FF13b5a9(): ChordAlt {
        if (!_FF13b5a9)
            _FF13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _FF13b5a9;
    }
    static get G13b5a9(): ChordAlt {
        if (!_G13b5a9)
            _G13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _G13b5a9;
    }
    static get GG13b5a9(): ChordAlt {
        if (!_GG13b5a9)
            _GG13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _GG13b5a9;
    }
    static get A13b5a9(): ChordAlt {
        if (!_A13b5a9)
            _A13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _A13b5a9;
    }
    static get AA13b5a9(): ChordAlt {
        if (!_AA13b5a9)
            _AA13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _AA13b5a9;
    }
    static get B13b5a9(): ChordAlt {
        if (!_B13b5a9)
            _B13b5a9 = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9)
                .build();
        return _B13b5a9;
    }

    static get CAlt(): ChordAlt {
        if (!_CAlt)
            _CAlt = RootPatternAltBuilder
                .from(DiatonicAlt.C, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _CAlt;
    }
    static get CCAlt(): ChordAlt {
        if (!_CCAlt)
            _CCAlt = RootPatternAltBuilder
                .from(DiatonicAlt.CC, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _CCAlt;
    }
    static get DAlt(): ChordAlt {
        if (!_DAlt)
            _DAlt = RootPatternAltBuilder
                .from(DiatonicAlt.D, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _DAlt;
    }
    static get DDAlt(): ChordAlt {
        if (!_DDAlt)
            _DDAlt = RootPatternAltBuilder
                .from(DiatonicAlt.DD, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _DDAlt;
    }
    static get EAlt(): ChordAlt {
        if (!_EAlt)
            _EAlt = RootPatternAltBuilder
                .from(DiatonicAlt.E, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _EAlt;
    }
    static get FAlt(): ChordAlt {
        if (!_FAlt)
            _FAlt = RootPatternAltBuilder
                .from(DiatonicAlt.F, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _FAlt;
    }
    static get FFAlt(): ChordAlt {
        if (!_FFAlt)
            _FFAlt = RootPatternAltBuilder
                .from(DiatonicAlt.FF, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _FFAlt;
    }
    static get GAlt(): ChordAlt {
        if (!_GAlt)
            _GAlt = RootPatternAltBuilder
                .from(DiatonicAlt.G, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _GAlt;
    }
    static get GGAlt(): ChordAlt {
        if (!_GGAlt)
            _GGAlt = RootPatternAltBuilder
                .from(DiatonicAlt.GG, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _GGAlt;
    }
    static get AAlt(): ChordAlt {
        if (!_AAlt)
            _AAlt = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _AAlt;
    }
    static get AAAlt(): ChordAlt {
        if (!_AAAlt)
            _AAAlt = RootPatternAltBuilder
                .from(DiatonicAlt.AA, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _AAAlt;
    }
    static get BAlt(): ChordAlt {
        if (!_BAlt)
            _BAlt = RootPatternAltBuilder
                .from(DiatonicAlt.A, DiatonicAltPattern.SEVENTH_b5)
                .build();
        return _BAlt;
    }
}

let _C:ChordAlt, _CC:ChordAlt, _Db:ChordAlt, _D:ChordAlt, _DD:ChordAlt, _Eb:ChordAlt, _E:ChordAlt, _F:ChordAlt, _FF:ChordAlt, _G:ChordAlt, _GG:ChordAlt, _Ab:ChordAlt, _A:ChordAlt, _AA:ChordAlt, _Bb:ChordAlt, _B:ChordAlt;
let _C5:ChordAlt, _CC5:ChordAlt, _D5:ChordAlt, _DD5:ChordAlt, _E5:ChordAlt, _F5:ChordAlt, _FF5:ChordAlt, _G5:ChordAlt, _GG5:ChordAlt, _A5:ChordAlt, _AA5:ChordAlt, _B5:ChordAlt;
let _C0:ChordAlt, _CC0:ChordAlt, _D0:ChordAlt, _DD0:ChordAlt, _E0:ChordAlt, _F0:ChordAlt, _FF0:ChordAlt, _G0:ChordAlt, _GG0:ChordAlt, _A0:ChordAlt, _AA0:ChordAlt, _B0:ChordAlt;
let _Csus4:ChordAlt, _CCsus4:ChordAlt, _Dsus4:ChordAlt, _DDsus4:ChordAlt, _Esus4:ChordAlt, _Fsus4:ChordAlt, _FFsus4:ChordAlt, _Gsus4:ChordAlt, _GGsus4:ChordAlt, _Asus4:ChordAlt, _AAsus4:ChordAlt, _Bsus4:ChordAlt;
let _Csus2:ChordAlt, _CCsus2:ChordAlt, _Dsus2:ChordAlt, _DDsus2:ChordAlt, _Esus2:ChordAlt, _Fsus2:ChordAlt, _FFsus2:ChordAlt, _Gsus2:ChordAlt, _GGsus2:ChordAlt, _Asus2:ChordAlt, _AAsus2:ChordAlt, _Bsus2:ChordAlt;
let _CMaj7:ChordAlt, _CCMaj7:ChordAlt, _DMaj7:ChordAlt, _DDMaj7:ChordAlt, _EMaj7:ChordAlt, _FMaj7:ChordAlt, _FFMaj7:ChordAlt, _GMaj7:ChordAlt, _GGMaj7:ChordAlt, _AMaj7:ChordAlt, _AAMaj7:ChordAlt, _BMaj7:ChordAlt;
let _CmMaj7:ChordAlt, _CCmMaj7:ChordAlt, _DmMaj7:ChordAlt, _DDmMaj7:ChordAlt, _EmMaj7:ChordAlt, _FmMaj7:ChordAlt, _FFmMaj7:ChordAlt, _GmMaj7:ChordAlt, _GGmMaj7:ChordAlt, _AmMaj7:ChordAlt, _AAmMaj7:ChordAlt, _BmMaj7:ChordAlt;
let _Cm:ChordAlt, _CCm:ChordAlt, _Dbm:ChordAlt, _Dm:ChordAlt, _DDm:ChordAlt, _Ebm:ChordAlt, _Em:ChordAlt, _Fm:ChordAlt, _FFm:ChordAlt, _Gbm:ChordAlt, _Gm:ChordAlt, _GGm:ChordAlt, _Abm:ChordAlt, _Am:ChordAlt, _AAm:ChordAlt, _Bbm:ChordAlt, _Bm:ChordAlt;
let _C7:ChordAlt, _CC7:ChordAlt, _D7:ChordAlt, _DD7:ChordAlt, _E7:ChordAlt, _F7:ChordAlt, _FF7:ChordAlt, _G7:ChordAlt, _GG7:ChordAlt, _A7:ChordAlt, _AA7:ChordAlt, _B7:ChordAlt;
let _Cm7:ChordAlt, _CCm7:ChordAlt, _Dm7:ChordAlt, _DDm7:ChordAlt, _Em7:ChordAlt, _Fm7:ChordAlt, _FFm7:ChordAlt, _Gm7:ChordAlt, _GGm7:ChordAlt, _Am7:ChordAlt, _AAm7:ChordAlt, _Bm7:ChordAlt;
let _C13b5a9:ChordAlt, _CC13b5a9:ChordAlt, _D13b5a9:ChordAlt, _DD13b5a9:ChordAlt, _E13b5a9:ChordAlt, _F13b5a9:ChordAlt, _FF13b5a9:ChordAlt, _G13b5a9:ChordAlt, _GG13b5a9:ChordAlt, _A13b5a9:ChordAlt, _AA13b5a9:ChordAlt, _B13b5a9:ChordAlt;
let _CAlt:ChordAlt, _CCAlt:ChordAlt, _DAlt:ChordAlt, _DDAlt:ChordAlt, _EAlt:ChordAlt, _FAlt:ChordAlt, _FFAlt:ChordAlt, _GAlt:ChordAlt, _GGAlt:ChordAlt, _AAlt:ChordAlt, _AAAlt:ChordAlt, _BAlt:ChordAlt;