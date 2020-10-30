import { ChromaticPattern } from '../../patterns/ChromaticPattern';
import { Settings } from '../../settings/Settings';

export const NamingChromaticChordPattern = {
    toString: function (chromaticChordPattern: ChromaticPattern): string {
        switch (chromaticChordPattern) {
            // intervals
            case ChromaticPattern.POWER_CHORD: return Settings.patterns.POWER_CHORD;

            // triads
            case ChromaticPattern.TRIAD_MAJOR: return Settings.patterns.TRIAD_MAJOR;
            case ChromaticPattern.TRIAD_MINOR: return Settings.patterns.TRIAD_MINOR;
            case ChromaticPattern.TRIAD_AUGMENTED: return Settings.patterns.TRIAD_AUGMENTED;
            case ChromaticPattern.TRIAD_DIMINISHED: return Settings.patterns.TRIAD_DIMINISHED;
            case ChromaticPattern.TRIAD_SUS4: return Settings.patterns.TRIAD_SUS4;
            case ChromaticPattern.TRIAD_SUS2: return Settings.patterns.TRIAD_SUS2;
            case ChromaticPattern.TRIAD_QUARTAL: return Settings.patterns.TRIAD_QUARTAL;

            // 7ª
            case ChromaticPattern.SEVENTH: return Settings.patterns.SEVENTH;
            case ChromaticPattern.SEVENTH_MAJ7: return Settings.patterns.SEVENTH_MAJ7;
            case ChromaticPattern.SEVENTH_MINOR: return Settings.patterns.SEVENTH_MINOR;
            case ChromaticPattern.SEVENTH_MINOR_MAJ7: return Settings.patterns.SEVENTH_MINOR_MAJ7;
            case ChromaticPattern.SEVENTH_MINOR_a5: return Settings.patterns.SEVENTH_MINOR_a5;
            case ChromaticPattern.SEVENTH_MINOR_b5: return Settings.patterns.SEVENTH_MINOR_b5;
            case ChromaticPattern.SEVENTH_MINOR_b9: return Settings.patterns.SEVENTH_MINOR_b9;
            case ChromaticPattern.SEVENTH_SUS4: return Settings.patterns.SEVENTH_SUS4;
            
            // 6ª
            case ChromaticPattern.SIXTH: return Settings.patterns.SIXTH;
            case ChromaticPattern.SIXTH_ADD9: return Settings.patterns.SIXTH_ADD9;
            case ChromaticPattern.SIXTH_MINOR: return Settings.patterns.SIXTH_MINOR;
            case ChromaticPattern.SIXTH_MINOR_ADD9: return Settings.patterns.SIXTH_MINOR_ADD9;
            case ChromaticPattern.SIXTH_SUS4: return Settings.patterns.SIXTH_SUS4;
            
            // 9ª
            case ChromaticPattern.NINTH: return Settings.patterns.NINTH;
            case ChromaticPattern.NINTH_ADD6: return Settings.patterns.NINTH_ADD6;
            case ChromaticPattern.NINTH_MAJ9: return Settings.patterns.NINTH_MAJ9;
            case ChromaticPattern.NINTH_MAJ9_a11: return Settings.patterns.NINTH_MAJ9_a11;
            case ChromaticPattern.NINTH_MINOR: return Settings.patterns.NINTH_MINOR;
            case ChromaticPattern.NINTH_MINOR_MAJ9: return Settings.patterns.NINTH_MINOR_MAJ9;
            case ChromaticPattern.NINTH_SUS4: return Settings.patterns.NINTH_SUS4;
            case ChromaticPattern.NINTH_a11: return Settings.patterns.NINTH_a11;
            case ChromaticPattern.NINTH_a5: return Settings.patterns.NINTH_a5;
            case ChromaticPattern.NINTH_b5: return Settings.patterns.NINTH_b5;
            case ChromaticPattern.SEVENTH_a5: return Settings.patterns.SEVENTH_a5;
            case ChromaticPattern.SEVENTH_a9: return Settings.patterns.SEVENTH_a9;
            case ChromaticPattern.SEVENTH_b5: return Settings.patterns.SEVENTH_b5;
            case ChromaticPattern.SEVENTH_b9: return Settings.patterns.SEVENTH_b9;
            case ChromaticPattern.SEVENTH_SUS4_b9: return Settings.patterns.SEVENTH_SUS4_b9;

            // 11ª
            case ChromaticPattern.ELEVENTH: return Settings.patterns.ELEVENTH;
            case ChromaticPattern.ELEVENTH_MAJ11: return Settings.patterns.ELEVENTH_MAJ11;
            case ChromaticPattern.ELEVENTH_MINOR_MAJ11: return Settings.patterns.ELEVENTH_MINOR_MAJ11;
            case ChromaticPattern.ELEVENTH_MINOR: return Settings.patterns.ELEVENTH_MINOR;
            case ChromaticPattern.ELEVENTH_a9: return Settings.patterns.ELEVENTH_a9;
            case ChromaticPattern.ELEVENTH_b9: return Settings.patterns.ELEVENTH_b9;

            case ChromaticPattern.SEVENTH_ADD11: return Settings.patterns.SEVENTH_ADD11;
            
            // 13ª
            case ChromaticPattern.SEVENTH_ADD13: return Settings.patterns.SEVENTH_ADD13;
            case ChromaticPattern.THIRTEENTH_MINOR: return Settings.patterns.THIRTEENTH_MINOR;
            case ChromaticPattern.THIRTEENTH_SUS4: return Settings.patterns.THIRTEENTH_SUS4;
            case ChromaticPattern.THIRTEENTH_b5: return Settings.patterns.THIRTEENTH_b5;
            case ChromaticPattern.THIRTEENTH_a5: return Settings.patterns.THIRTEENTH_a5;
            case ChromaticPattern.THIRTEENTH_b9: return Settings.patterns.THIRTEENTH_b9;
            case ChromaticPattern.THIRTEENTH_a9: return Settings.patterns.THIRTEENTH_a9;
            case ChromaticPattern.THIRTEENTH_b5b9: return Settings.patterns.THIRTEENTH_b5b9;
            case ChromaticPattern.THIRTEENTH_b5a9: return Settings.patterns.THIRTEENTH_b5a9;
            case ChromaticPattern.THIRTEENTH_a5b9: return Settings.patterns.THIRTEENTH_a5b9;
            case ChromaticPattern.THIRTEENTH_a5a9: return Settings.patterns.THIRTEENTH_a5a9;
            case ChromaticPattern.THIRTEENTH_MAJ13: return Settings.patterns.THIRTEENTH_MAJ13;
            case ChromaticPattern.THIRTEENTH_MINOR_MAJ13: return Settings.patterns.THIRTEENTH_MINOR_MAJ13;
            case ChromaticPattern.THIRTEENTH_MAJ13_a5: return Settings.patterns.THIRTEENTH_MAJ13_a5;
            case ChromaticPattern.THIRTEENTH_MAJ13_b5: return Settings.patterns.THIRTEENTH_MAJ13_b5;
            case ChromaticPattern.THIRTEENTH_MAJ13_b9: return Settings.patterns.THIRTEENTH_MAJ13_b9;
            case ChromaticPattern.THIRTEENTH_MAJ13_a9: return Settings.patterns.THIRTEENTH_MAJ13_a9;
            case ChromaticPattern.THIRTEENTH_MAJ13_b5b9: return Settings.patterns.THIRTEENTH_MAJ13_b5b9;
            case ChromaticPattern.THIRTEENTH_MAJ13_b5a9: return Settings.patterns.THIRTEENTH_MAJ13_b5a9;
            case ChromaticPattern.THIRTEENTH_MAJ13_a5b9: return Settings.patterns.THIRTEENTH_MAJ13_a5b9;
            case ChromaticPattern.THIRTEENTH_MAJ13_a5a9: return Settings.patterns.THIRTEENTH_MAJ13_a5a9;
        }
        return "(" + chromaticChordPattern.rootIntervals.toString().replace(/,/g, "-") + ")";
    },
    toStringShort: function patternShort(chromaticChordPattern: ChromaticPattern): string {
        switch (chromaticChordPattern) {
            // Interval
            case ChromaticPattern.POWER_CHORD: return Settings.shortPatterns.POWER_CHORD;

            // Triads
            case ChromaticPattern.TRIAD_MAJOR: return Settings.shortPatterns.TRIAD_MAJOR;
            case ChromaticPattern.TRIAD_MINOR: return Settings.shortPatterns.TRIAD_MINOR;
            case ChromaticPattern.TRIAD_AUGMENTED: return Settings.shortPatterns.TRIAD_AUGMENTED;
            case ChromaticPattern.TRIAD_DIMINISHED: return Settings.shortPatterns.TRIAD_DIMINISHED;
            case ChromaticPattern.TRIAD_SUS4: return Settings.shortPatterns.TRIAD_SUS4;
            case ChromaticPattern.TRIAD_SUS2: return Settings.shortPatterns.TRIAD_SUS2;
            case ChromaticPattern.TRIAD_QUARTAL: return Settings.shortPatterns.TRIAD_QUARTAL;

            // 7ª
            case ChromaticPattern.SEVENTH: return Settings.shortPatterns.SEVENTH;
            case ChromaticPattern.SEVENTH_b5: return Settings.shortPatterns.SEVENTH_b5;
            case ChromaticPattern.SEVENTH_a5: return Settings.shortPatterns.SEVENTH_a5;
            case ChromaticPattern.SEVENTH_MINOR: return Settings.shortPatterns.SEVENTH_MINOR;
            case ChromaticPattern.SEVENTH_MINOR_b5: return Settings.shortPatterns.SEVENTH_MINOR_b5;
            case ChromaticPattern.SEVENTH_MINOR_a5: return Settings.shortPatterns.SEVENTH_MINOR_a5;
            case ChromaticPattern.SEVENTH_MINOR_MAJ7: return Settings.shortPatterns.SEVENTH_MINOR_MAJ7;
            case ChromaticPattern.SEVENTH_MAJ7: return Settings.shortPatterns.SEVENTH_MAJ7;
            case ChromaticPattern.SEVENTH_MAJ7_b5: return Settings.shortPatterns.SEVENTH_MAJ7_b5;
            case ChromaticPattern.SEVENTH_SUS4: return Settings.shortPatterns.SEVENTH_SUS4;

            // 6ª
            case ChromaticPattern.SIXTH: return Settings.shortPatterns.SIXTH;
            case ChromaticPattern.SIXTH_ADD9: return Settings.shortPatterns.SIXTH_ADD9;
            case ChromaticPattern.SIXTH_MINOR: return Settings.shortPatterns.SIXTH_MINOR;
            case ChromaticPattern.SIXTH_MINOR_ADD9: return Settings.shortPatterns.SIXTH_MINOR_ADD9;
            case ChromaticPattern.SIXTH_SUS4: return Settings.shortPatterns.SIXTH_SUS4;

            // 9ª
            case ChromaticPattern.NINTH: return Settings.shortPatterns.NINTH;
            case ChromaticPattern.NINTH_MAJ9: return Settings.shortPatterns.NINTH_MAJ9;
            case ChromaticPattern.NINTH_MAJ9_a11: return Settings.shortPatterns.NINTH_MAJ9_a11;
            case ChromaticPattern.NINTH_MINOR: return Settings.shortPatterns.NINTH_MINOR;
            case ChromaticPattern.NINTH_MINOR_MAJ9: return Settings.shortPatterns.NINTH_MINOR_MAJ9;
            case ChromaticPattern.NINTH_SUS4: return Settings.shortPatterns.NINTH_SUS4;
            case ChromaticPattern.NINTH_a5: return Settings.shortPatterns.NINTH_a5;
            case ChromaticPattern.NINTH_b5: return Settings.shortPatterns.NINTH_b5;
            case ChromaticPattern.NINTH_ADD6: return Settings.shortPatterns.NINTH_ADD6;
            case ChromaticPattern.SEVENTH_SUS4_b9: return Settings.shortPatterns.SEVENTH_SUS4_b9;

            case ChromaticPattern.SEVENTH_ADD11: return Settings.shortPatterns.SEVENTH_ADD11;
            case ChromaticPattern.SEVENTH_MINOR_b9: return Settings.shortPatterns.SEVENTH_MINOR_b9;
            case ChromaticPattern.SEVENTH_SUS4: return Settings.shortPatterns.SEVENTH_SUS4;
            case ChromaticPattern.SEVENTH_a9: return Settings.shortPatterns.SEVENTH_a9;
            case ChromaticPattern.SEVENTH_b9: return Settings.shortPatterns.SEVENTH_b9;

            // 11ª
            case ChromaticPattern.ELEVENTH: return Settings.shortPatterns.ELEVENTH;
            case ChromaticPattern.ELEVENTH_MINOR: return Settings.shortPatterns.ELEVENTH_MINOR;
            case ChromaticPattern.ELEVENTH_b9: return Settings.shortPatterns.ELEVENTH_b9;
            case ChromaticPattern.ELEVENTH_a9: return Settings.shortPatterns.ELEVENTH_a9;
            case ChromaticPattern.ELEVENTH_MAJ11: return Settings.shortPatterns.ELEVENTH_MAJ11;
            case ChromaticPattern.ELEVENTH_MINOR_MAJ11: return Settings.shortPatterns.ELEVENTH_MINOR_MAJ11;
            case ChromaticPattern.NINTH_a11: return Settings.shortPatterns.NINTH_a11;

            // 13ª
            case ChromaticPattern.SEVENTH_ADD13: return Settings.shortPatterns.SEVENTH_ADD13;
            case ChromaticPattern.THIRTEENTH_MINOR: return Settings.shortPatterns.THIRTEENTH_MINOR;
            case ChromaticPattern.THIRTEENTH_SUS4: return Settings.shortPatterns.THIRTEENTH_SUS4;
            case ChromaticPattern.THIRTEENTH_b5: return Settings.shortPatterns.THIRTEENTH_b5;
            case ChromaticPattern.THIRTEENTH_a5: return Settings.shortPatterns.THIRTEENTH_a5;
            case ChromaticPattern.THIRTEENTH_b9: return Settings.shortPatterns.THIRTEENTH_b9;
            case ChromaticPattern.THIRTEENTH_a9: return Settings.shortPatterns.THIRTEENTH_a9;
            case ChromaticPattern.THIRTEENTH_b5b9: return Settings.shortPatterns.THIRTEENTH_b5b9;
            case ChromaticPattern.THIRTEENTH_b5a9: return Settings.shortPatterns.THIRTEENTH_b5a9;
            case ChromaticPattern.THIRTEENTH_a5b9: return Settings.shortPatterns.THIRTEENTH_a5b9;
            case ChromaticPattern.THIRTEENTH_a5a9: return Settings.shortPatterns.THIRTEENTH_a5a9;
            case ChromaticPattern.THIRTEENTH_MAJ13: return Settings.shortPatterns.THIRTEENTH_MAJ13;
            case ChromaticPattern.THIRTEENTH_MINOR_MAJ13: return Settings.shortPatterns.THIRTEENTH_MINOR_MAJ13;
            case ChromaticPattern.THIRTEENTH_MAJ13_b5: return Settings.shortPatterns.THIRTEENTH_MAJ13_b5;
            case ChromaticPattern.THIRTEENTH_MAJ13_a5: return Settings.shortPatterns.THIRTEENTH_MAJ13_a5;
            case ChromaticPattern.THIRTEENTH_MAJ13_b9: return Settings.shortPatterns.THIRTEENTH_MAJ13_b9;
            case ChromaticPattern.THIRTEENTH_MAJ13_a9: return Settings.shortPatterns.THIRTEENTH_MAJ13_a9;
            case ChromaticPattern.THIRTEENTH_MAJ13_b5b9: return Settings.shortPatterns.THIRTEENTH_MAJ13_b5b9;
            case ChromaticPattern.THIRTEENTH_MAJ13_b5a9: return Settings.shortPatterns.THIRTEENTH_MAJ13_b5a9;
            case ChromaticPattern.THIRTEENTH_MAJ13_a5b9: return Settings.shortPatterns.THIRTEENTH_MAJ13_a5b9;
            case ChromaticPattern.THIRTEENTH_MAJ13_a5a9: return Settings.shortPatterns.THIRTEENTH_MAJ13_a5a9;
        }

        return "(" + chromaticChordPattern.rootIntervals.toString() + ")";
    },
    get: function (str: string): ChromaticPattern {
        throw new Error("Can't convert '" + str + "' to ChromaticChordPattern.");
    }
};