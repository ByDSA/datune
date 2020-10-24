import { chromaticPatterns, diatonicPatterns, intervalDiatonicAlts, intervalDiatonics, qualities } from '../initializer';
import { ChromaticPattern } from '../patterns/ChromaticPattern';
import { DiatonicAltPattern } from '../patterns/DiatonicAltPattern';
import { DiatonicPattern } from '../patterns/DiatonicPattern';

export default () => {
    if (DiatonicAltPattern.TRIAD_MAJOR)
        return;

    intervalDiatonicAlts.default();

    diatonicPatterns.default();

    chromaticPatterns.default();

    intervalDiatonics.default();

    DiatonicAltPattern.POWER_CHORD = DiatonicAltPattern.fromPatterns(ChromaticPattern.POWER_CHORD, DiatonicPattern.FIFTH);
    DiatonicAltPattern.TRIAD_MAJOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_MAJOR, DiatonicPattern.TRIAD);
    DiatonicAltPattern.TRIAD_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_MINOR, DiatonicPattern.TRIAD);
    DiatonicAltPattern.TRIAD_DIMINISHED = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_DIMINISHED, DiatonicPattern.TRIAD);
    DiatonicAltPattern.TRIAD_AUGMENTED = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_AUGMENTED, DiatonicPattern.TRIAD);
    DiatonicAltPattern.TRIAD_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_SUS4, DiatonicPattern.SUS4);
    DiatonicAltPattern.TRIAD_SUS2 = DiatonicAltPattern.TRIAD_SUS4.withInv();
    DiatonicAltPattern.TRIAD_QUARTAL = DiatonicAltPattern.TRIAD_SUS2.withInv();
    DiatonicAltPattern.SEVENTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH, DiatonicPattern.SEVENTH);
    DiatonicAltPattern.SEVENTH_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_b5, DiatonicPattern.SEVENTH);
    DiatonicAltPattern.SEVENTH_MAJ7_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MAJ7_b5, DiatonicPattern.SEVENTH);
    DiatonicAltPattern.SEVENTH_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_a5, DiatonicPattern.SEVENTH);
    DiatonicAltPattern.SEVENTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_SUS4, DiatonicPattern.SEVENTH_SUS4);
    DiatonicAltPattern.SEVENTH_SUS4_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_SUS4_b9, DiatonicPattern.NINTH_SUS4);
    DiatonicAltPattern.SEVENTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR, DiatonicPattern.SEVENTH);
    DiatonicAltPattern.SEVENTH_MINOR_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_b5, DiatonicPattern.SEVENTH);
    DiatonicAltPattern.SEVENTH_MINOR_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_a5, DiatonicPattern.SEVENTH);
    DiatonicAltPattern.SIXTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH, DiatonicPattern.SIXTH);
    DiatonicAltPattern.SIXTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_MINOR, DiatonicPattern.SIXTH);
    DiatonicAltPattern.SIXTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_SUS4, DiatonicPattern.SIXTH);
    DiatonicAltPattern.SEVENTH_MAJ7 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MAJ7, DiatonicPattern.SEVENTH);
    DiatonicAltPattern.SEVENTH_MINOR_MAJ7 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_MAJ7, DiatonicPattern.SEVENTH);
    DiatonicAltPattern.SIXTH_ADD9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_MINOR_ADD9, DiatonicPattern.SIXTH_ADD9);
    DiatonicAltPattern.SIXTH_MINOR_ADD9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_MINOR_ADD9, DiatonicPattern.SIXTH_ADD9);
    DiatonicAltPattern.SEVENTH_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_b9, DiatonicPattern.NINTH);
    DiatonicAltPattern.SEVENTH_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_a9, DiatonicPattern.NINTH);
    DiatonicAltPattern.SEVENTH_MINOR_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_b9, DiatonicPattern.NINTH);
    DiatonicAltPattern.SEVENTH_ADD11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_ADD11, DiatonicPattern.SEVENTH_ADD11);
    DiatonicAltPattern.SEVENTH_ADD13 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_ADD13, DiatonicPattern.SEVENTH_ADD13);
    DiatonicAltPattern.NINTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH, DiatonicPattern.NINTH);
    DiatonicAltPattern.NINTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MINOR, DiatonicPattern.NINTH);
    DiatonicAltPattern.NINTH_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_b5, DiatonicPattern.NINTH);
    DiatonicAltPattern.NINTH_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_a5, DiatonicPattern.NINTH);
    DiatonicAltPattern.NINTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_SUS4, DiatonicPattern.NINTH_SUS4);
    DiatonicAltPattern.NINTH_MAJ9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MAJ9, DiatonicPattern.NINTH);
    DiatonicAltPattern.NINTH_MINOR_MAJ9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MINOR, DiatonicPattern.NINTH);
    DiatonicAltPattern.NINTH_ADD6 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_ADD6, DiatonicPattern.NINTH_ADD6);
    DiatonicAltPattern.NINTH_a11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_a11, DiatonicPattern.ELEVENTH);
    DiatonicAltPattern.NINTH_MAJ9_a11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MAJ9_a11, DiatonicPattern.ELEVENTH);
    DiatonicAltPattern.ELEVENTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH, DiatonicPattern.ELEVENTH);
    DiatonicAltPattern.ELEVENTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_MINOR, DiatonicPattern.ELEVENTH);
    DiatonicAltPattern.ELEVENTH_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_b9, DiatonicPattern.ELEVENTH);
    DiatonicAltPattern.ELEVENTH_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_a9, DiatonicPattern.ELEVENTH);
    DiatonicAltPattern.ELEVENTH_MAJ11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_MAJ11, DiatonicPattern.ELEVENTH);
    DiatonicAltPattern.ELEVENTH_MINOR_MAJ11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_MINOR_MAJ11, DiatonicPattern.ELEVENTH);
    DiatonicAltPattern.THIRTEENTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MINOR, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_SUS4, DiatonicPattern.THIRTEENTH_SUS4);
    DiatonicAltPattern.THIRTEENTH_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b5, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a5, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b9, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a9, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_b5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b5b9, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_b5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b5a9, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_a5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a5b9, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_a5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a5a9, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_MAJ13 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_MINOR_MAJ13 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MINOR_MAJ13, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_MAJ13_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b5, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_MAJ13_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a5, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_MAJ13_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b9, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_MAJ13_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a9, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_MAJ13_b5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b5b9, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b5a9, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_MAJ13_a5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a5b9, DiatonicPattern.THIRTEENTH);
    DiatonicAltPattern.THIRTEENTH_MAJ13_a5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a5a9, DiatonicPattern.THIRTEENTH);

    DiatonicAltPattern.all = function () {
        return Array.from([
            DiatonicAltPattern.POWER_CHORD,
            DiatonicAltPattern.TRIAD_MAJOR,
            DiatonicAltPattern.TRIAD_MINOR,
            DiatonicAltPattern.TRIAD_DIMINISHED,
            DiatonicAltPattern.TRIAD_AUGMENTED,
            DiatonicAltPattern.TRIAD_SUS4,
            DiatonicAltPattern.TRIAD_SUS2,
            DiatonicAltPattern.TRIAD_QUARTAL,
            DiatonicAltPattern.SEVENTH,
            DiatonicAltPattern.SEVENTH_b5,
            DiatonicAltPattern.SEVENTH_MAJ7_b5,
            DiatonicAltPattern.SEVENTH_a5,
            DiatonicAltPattern.SEVENTH_SUS4,
            DiatonicAltPattern.SEVENTH_SUS4_b9,
            DiatonicAltPattern.SEVENTH_MINOR,
            DiatonicAltPattern.SEVENTH_MINOR_b5,
            DiatonicAltPattern.SEVENTH_MINOR_a5,
            DiatonicAltPattern.SIXTH,
            DiatonicAltPattern.SIXTH_MINOR,
            DiatonicAltPattern.SIXTH_SUS4,
            DiatonicAltPattern.SEVENTH_MAJ7,
            DiatonicAltPattern.SEVENTH_MINOR_MAJ7,
            DiatonicAltPattern.SIXTH_ADD9,
            DiatonicAltPattern.SIXTH_MINOR_ADD9,
            DiatonicAltPattern.SEVENTH_b9,
            DiatonicAltPattern.SEVENTH_a9,
            DiatonicAltPattern.SEVENTH_MINOR_b9,
            DiatonicAltPattern.SEVENTH_ADD11,
            DiatonicAltPattern.SEVENTH_ADD13,
            DiatonicAltPattern.NINTH,
            DiatonicAltPattern.NINTH_MINOR,
            DiatonicAltPattern.NINTH_b5,
            DiatonicAltPattern.NINTH_a5,
            DiatonicAltPattern.NINTH_SUS4,
            DiatonicAltPattern.NINTH_MAJ9,
            DiatonicAltPattern.NINTH_MINOR_MAJ9,
            DiatonicAltPattern.NINTH_ADD6,
            DiatonicAltPattern.NINTH_a11,
            DiatonicAltPattern.NINTH_MAJ9_a11,
            DiatonicAltPattern.ELEVENTH,
            DiatonicAltPattern.ELEVENTH_MINOR,
            DiatonicAltPattern.ELEVENTH_b9,
            DiatonicAltPattern.ELEVENTH_a9,
            DiatonicAltPattern.ELEVENTH_MAJ11,
            DiatonicAltPattern.ELEVENTH_MINOR_MAJ11,
            DiatonicAltPattern.THIRTEENTH_MINOR,
            DiatonicAltPattern.THIRTEENTH_SUS4,
            DiatonicAltPattern.THIRTEENTH_b5,
            DiatonicAltPattern.THIRTEENTH_a5,
            DiatonicAltPattern.THIRTEENTH_b9,
            DiatonicAltPattern.THIRTEENTH_a9,
            DiatonicAltPattern.THIRTEENTH_b5b9,
            DiatonicAltPattern.THIRTEENTH_b5a9,
            DiatonicAltPattern.THIRTEENTH_a5b9,
            DiatonicAltPattern.THIRTEENTH_a5a9,
            DiatonicAltPattern.THIRTEENTH_MAJ13,
            DiatonicAltPattern.THIRTEENTH_MINOR_MAJ13,
            DiatonicAltPattern.THIRTEENTH_MAJ13_b5,
            DiatonicAltPattern.THIRTEENTH_MAJ13_a5,
            DiatonicAltPattern.THIRTEENTH_MAJ13_b9,
            DiatonicAltPattern.THIRTEENTH_MAJ13_a9,
            DiatonicAltPattern.THIRTEENTH_MAJ13_b5b9,
            DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9,
            DiatonicAltPattern.THIRTEENTH_MAJ13_a5b9,
            DiatonicAltPattern.THIRTEENTH_MAJ13_a5a9
        ]);
    }

    for (let pattern of DiatonicAltPattern.all()) {
        for (let i = 1; i < pattern.length; i++) {
            let patternInv = pattern.withInv(i);
            if (!DiatonicAltPattern.all().includes(patternInv)) {
                (<any>patternInv)._rootIndex = pattern.length - i;
            }
        }
    }

    for (let pattern of DiatonicAltPattern.all()) {
        for (let i = 0; i < pattern.length; i++) {
            let patternInv = pattern.withInv(i);
            Object.freeze(patternInv);
        }
    }

    //Immutables.lockrIf(DiatonicAltChordPattern, (obj) => !(obj instanceof ImmutablesCache));
}