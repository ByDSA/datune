import { ChromaticChord } from "./ChromaticChord";
import { Immutables } from '@datune/utils/Immutables';
import { PrecalcCache } from '@datune/utils/PrecalcCache';
import { Chromatic } from '../degrees/Chromatic';
import { chromatics, diatonics, settings, diatonicAltPatterns, chromaticPatterns } from '../initializer';
import { ChromaticPattern } from '../patterns/ChromaticPattern';
import { RootPatternChord } from './parametric/RootPatternChord';

function chromatic2Str(chromatic: Chromatic): string {
    switch (chromatic) {
        case Chromatic.C: return "C";
        case Chromatic.CC: return "CC";
        case Chromatic.D: return "D";
        case Chromatic.DD: return "DD";
        case Chromatic.E: return "E";
        case Chromatic.F: return "F";
        case Chromatic.FF: return "FF";
        case Chromatic.G: return "G";
        case Chromatic.GG: return "GG";
        case Chromatic.A: return "A";
        case Chromatic.AA: return "AA";
        case Chromatic.B: return "B";
    }

    throw new Error();
}

function chromaticPattern2Str(pattern: ChromaticPattern): string {
    switch (pattern) {
        case ChromaticPattern.TRIAD_MAJOR: return "";
        case ChromaticPattern.TRIAD_MINOR: return "m";
        case ChromaticPattern.TRIAD_AUGMENTED: return "AUG";
        case ChromaticPattern.TRIAD_DIMINISHED: return "0";
        case ChromaticPattern.TRIAD_SUS4: return "sus4";
        case ChromaticPattern.TRIAD_SUS2: return "sus2";
        case ChromaticPattern.SEVENTH_MAJ7: return "Maj7";
        case ChromaticPattern.SEVENTH: return "7";
        case ChromaticPattern.SEVENTH_MINOR: return "m7";
        case ChromaticPattern.SEVENTH_MINOR_MAJ7: return "mMaj7";
        case ChromaticPattern.THIRTEENTH_b5a9: return "13b5a9";
    }

    return null;
}

export default () => {
    if (ChromaticChord.C)
        return;

    chromatics.default();

    // toString
    chromaticPatterns.default();
    diatonicAltPatterns.default();
    settings.default();
    diatonics.default();

    let patterns = ChromaticPattern.all();

    for (const chromatic of Chromatic.all()) {
        const diatonicAltStr = chromatic2Str(chromatic);
        if (diatonicAltStr == null)
            continue;

        for (const diatonicAltChordPattern of patterns) {
            const diatonicAltChordPatternStr = chromaticPattern2Str(diatonicAltChordPattern);
            if (diatonicAltChordPatternStr == null)
                continue;

            const name = diatonicAltStr + diatonicAltChordPatternStr;

            ChromaticChord[name] = RootPatternChord.from(chromatic, diatonicAltChordPattern).chord;
        }
    }

    Immutables.lockrIf(ChromaticChord, (obj) => !(obj instanceof PrecalcCache));
}