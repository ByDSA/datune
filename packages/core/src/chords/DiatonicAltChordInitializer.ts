import { Immutables } from '@datune/utils/Immutables';
import { PrecalcCache } from '@datune/utils/PrecalcCache';
import { RootPatternBuilder } from '../chords/builders/RootPatternBuilder';
import { DiatonicAltChord } from '../chords/DiatonicAltChord';
import { DiatonicAlt } from "../degrees/DiatonicAlt";
import { chromatics, diatonicAltPatterns, diatonicAlts } from '../initializer';
import { DiatonicAltPattern } from '../patterns/DiatonicAltPattern';

function diatonicAlt2Str(diatonicAlt: DiatonicAlt): string {
    switch (diatonicAlt) {
        case DiatonicAlt.C: return "C";
        case DiatonicAlt.CC: return "CC";
        case DiatonicAlt.Db: return "Db";
        case DiatonicAlt.D: return "D";
        case DiatonicAlt.DD: return "DD";
        case DiatonicAlt.Eb: return "Eb";
        case DiatonicAlt.E: return "E";
        case DiatonicAlt.Fb: return "Fb";
        case DiatonicAlt.F: return "F";
        case DiatonicAlt.FF: return "FF";
        case DiatonicAlt.Gb: return "Gb";
        case DiatonicAlt.G: return "G";
        case DiatonicAlt.GG: return "GG";
        case DiatonicAlt.Ab: return "Ab";
        case DiatonicAlt.A: return "A";
        case DiatonicAlt.AA: return "AA";
        case DiatonicAlt.Bb: return "Bb";
        case DiatonicAlt.B: return "B";
    }

    return null;
}

function diatonicAltChordPattern2Str(diatonicAltChordPattern: DiatonicAltPattern): string {
    switch (diatonicAltChordPattern) {
        case DiatonicAltPattern.TRIAD_MAJOR: return "";
        case DiatonicAltPattern.TRIAD_MINOR: return "m";
        case DiatonicAltPattern.TRIAD_AUGMENTED: return "AUG";
        case DiatonicAltPattern.TRIAD_DIMINISHED: return "0";
        case DiatonicAltPattern.TRIAD_SUS4: return "sus4";
        case DiatonicAltPattern.TRIAD_SUS2: return "sus2";
        case DiatonicAltPattern.SEVENTH_MAJ7: return "Maj7";
        case DiatonicAltPattern.SEVENTH: return "7";
        case DiatonicAltPattern.SEVENTH_MINOR: return "m7";
        case DiatonicAltPattern.SEVENTH_MINOR_MAJ7: return "mMaj7";
        case DiatonicAltPattern.THIRTEENTH_b5a9: return "13b5a9";
    }

    return null;
}

export default () => {
    if (DiatonicAltChord.C)
        return;

    diatonicAlts.default();

    chromatics.default();

    diatonicAltPatterns.default();

    const defaultDiatonicAlts = [
        DiatonicAlt.C,
        DiatonicAlt.CC,
        DiatonicAlt.Db,
        DiatonicAlt.D,
        DiatonicAlt.DD,
        DiatonicAlt.Eb,
        DiatonicAlt.E,
        DiatonicAlt.Fb,
        DiatonicAlt.F,
        DiatonicAlt.FF,
        DiatonicAlt.Gb,
        DiatonicAlt.G,
        DiatonicAlt.GG,
        DiatonicAlt.Ab,
        DiatonicAlt.A,
        DiatonicAlt.AA,
        DiatonicAlt.Bb,
        DiatonicAlt.B,
    ];

    let diatonicAltChordPatterns = DiatonicAltPattern.all();

    for (const diatonicAlt of defaultDiatonicAlts) {
        const diatonicAltStr = diatonicAlt2Str(diatonicAlt);
        if (diatonicAltStr == null)
            continue;

        for (const diatonicAltChordPattern of diatonicAltChordPatterns) {
            const diatonicAltChordPatternStr = diatonicAltChordPattern2Str(diatonicAltChordPattern);
            if (diatonicAltChordPatternStr == null)
                continue;

            const name = diatonicAltStr + diatonicAltChordPatternStr;

            DiatonicAltChord[name] = RootPatternBuilder.create()
                .setRoot(diatonicAlt)
                .setPattern(diatonicAltChordPattern)
                .build();
        }
    }

    Immutables.lockrIf(DiatonicAltChord, (obj) => !(obj instanceof PrecalcCache));
}