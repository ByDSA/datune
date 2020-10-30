import { Immutables } from '@datune/utils/Immutables';
import { PrecalcCache } from '@datune/utils/PrecalcCache';
import { ChromaticPattern } from './ChromaticPattern';

export default () => {
    if (ChromaticPattern.TRIAD_MAJOR)
        return;

    ChromaticPattern.POWER_CHORD = ChromaticPattern.fromRootIntervals(0, 7);
    initializeTriads();
    initializeSevenths();
    initializeExtensions();
    ChromaticPattern.all = function () {
        return [
            ChromaticPattern.POWER_CHORD,
            ChromaticPattern.TRIAD_MAJOR,
            ChromaticPattern.TRIAD_MINOR,
            ChromaticPattern.TRIAD_DIMINISHED,
            ChromaticPattern.TRIAD_AUGMENTED,
            ChromaticPattern.TRIAD_SUS4,
            ChromaticPattern.TRIAD_SUS2,
            ChromaticPattern.TRIAD_QUARTAL,
            ChromaticPattern.SEVENTH,
            ChromaticPattern.SEVENTH_b5,
            ChromaticPattern.SEVENTH_a5,
            ChromaticPattern.SEVENTH_SUS4,
            ChromaticPattern.SEVENTH_SUS4_b9,
            ChromaticPattern.SEVENTH_MINOR,
            ChromaticPattern.SEVENTH_MINOR_b5,
            ChromaticPattern.SEVENTH_MINOR_a5,
            ChromaticPattern.SIXTH,
            ChromaticPattern.SIXTH_MINOR,
            ChromaticPattern.SIXTH_SUS4,
            ChromaticPattern.SEVENTH_MAJ7,
            ChromaticPattern.SEVENTH_MINOR_MAJ7,
            ChromaticPattern.SIXTH_ADD9,
            ChromaticPattern.SIXTH_MINOR_ADD9,
            ChromaticPattern.SEVENTH_b9,
            ChromaticPattern.SEVENTH_a9,
            ChromaticPattern.SEVENTH_MINOR_b9,
            ChromaticPattern.SEVENTH_ADD11,
            ChromaticPattern.SEVENTH_ADD13,
            ChromaticPattern.NINTH,
            ChromaticPattern.NINTH_MINOR,
            ChromaticPattern.NINTH_b5,
            ChromaticPattern.NINTH_a5,
            ChromaticPattern.NINTH_SUS4,
            ChromaticPattern.NINTH_MAJ9,
            ChromaticPattern.NINTH_MINOR_MAJ9,
            ChromaticPattern.NINTH_ADD6,
            ChromaticPattern.NINTH_a11,
            ChromaticPattern.NINTH_MAJ9_a11,
            ChromaticPattern.ELEVENTH,
            ChromaticPattern.ELEVENTH_MINOR,
            ChromaticPattern.ELEVENTH_b9,
            ChromaticPattern.ELEVENTH_a9,
            ChromaticPattern.ELEVENTH_MAJ11,
            ChromaticPattern.ELEVENTH_MINOR_MAJ11,
            ChromaticPattern.THIRTEENTH_MINOR,
            ChromaticPattern.THIRTEENTH_SUS4,
            ChromaticPattern.THIRTEENTH_b5,
            ChromaticPattern.THIRTEENTH_a5,
            ChromaticPattern.THIRTEENTH_b9,
            ChromaticPattern.THIRTEENTH_a9,
            ChromaticPattern.THIRTEENTH_b5b9,
            ChromaticPattern.THIRTEENTH_b5a9,
            ChromaticPattern.THIRTEENTH_a5b9,
            ChromaticPattern.THIRTEENTH_a5a9,
            ChromaticPattern.THIRTEENTH_MAJ13,
            ChromaticPattern.THIRTEENTH_MINOR_MAJ13,
            ChromaticPattern.THIRTEENTH_MAJ13_b5,
            ChromaticPattern.THIRTEENTH_MAJ13_a5,
            ChromaticPattern.THIRTEENTH_MAJ13_b9,
            ChromaticPattern.THIRTEENTH_MAJ13_a9,
            ChromaticPattern.THIRTEENTH_MAJ13_b5b9,
            ChromaticPattern.THIRTEENTH_MAJ13_b5a9,
            ChromaticPattern.THIRTEENTH_MAJ13_a5b9,
            ChromaticPattern.THIRTEENTH_MAJ13_a5a9
        ];
    }

    initializeInversions();

    Immutables.lockrIf(ChromaticPattern, (obj) => !(obj instanceof PrecalcCache));
}

function initializeTriads() {
    ChromaticPattern.TRIAD_MAJOR = ChromaticPattern.fromRootIntervals(0, 4, 7);
    (<any>ChromaticPattern.TRIAD_MAJOR.withInv(1))._rootIndex = 2;
    (<any>ChromaticPattern.TRIAD_MAJOR.withInv(2))._rootIndex = 1;
    ChromaticPattern.TRIAD_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7);
    ChromaticPattern.TRIAD_DIMINISHED = ChromaticPattern.fromRootIntervals(0, 3, 6);
    ChromaticPattern.TRIAD_AUGMENTED = ChromaticPattern.fromRootIntervals(0, 4, 8);
    ChromaticPattern.TRIAD_SUS4 = ChromaticPattern.fromRootIntervals(0, 5, 7);
    ChromaticPattern.TRIAD_SUS2 = ChromaticPattern.fromRootIntervals(0, 2, 7);
    ChromaticPattern.TRIAD_QUARTAL = ChromaticPattern.fromRootIntervals(0, 5, 10);
}

function initializeExtensions() {
    initializeNinths();
    initializeElevenths();
    initializeThirteenths();
}

function initializeSevenths() {
    ChromaticPattern.SEVENTH = ChromaticPattern.fromRootIntervals(0, 4, 7, 10);
    ChromaticPattern.SEVENTH_b5 = ChromaticPattern.fromRootIntervals(0, 4, 6, 10);
    ChromaticPattern.SEVENTH_a5 = ChromaticPattern.fromRootIntervals(0, 4, 8, 10);
    ChromaticPattern.SEVENTH_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7, 10);
    ChromaticPattern.SEVENTH_MINOR_b5 = ChromaticPattern.fromRootIntervals(0, 3, 6, 10);
    ChromaticPattern.SEVENTH_MINOR_a5 = ChromaticPattern.fromRootIntervals(0, 3, 8, 10);
    ChromaticPattern.SEVENTH_MINOR_MAJ7 = ChromaticPattern.fromRootIntervals(0, 3, 7, 11);
    ChromaticPattern.SEVENTH_MAJ7 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11);
    ChromaticPattern.SEVENTH_MAJ7_b5 = ChromaticPattern.fromRootIntervals(0, 4, 6, 11);
    ChromaticPattern.SEVENTH_SUS4 = ChromaticPattern.fromRootIntervals(0, 5, 7, 10);

    ChromaticPattern.SIXTH = ChromaticPattern.fromRootIntervals(0, 4, 7, 9);
    ChromaticPattern.SIXTH_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7, 9);
    ChromaticPattern.SIXTH_SUS4 = ChromaticPattern.fromRootIntervals(0, 5, 7, 9);
}

function initializeNinths() {
    ChromaticPattern.SIXTH_ADD9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 9, 14);
    ChromaticPattern.SIXTH_MINOR_ADD9 = ChromaticPattern.fromRootIntervals(0, 3, 7, 9, 14);
    ChromaticPattern.SEVENTH_b9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 13);
    ChromaticPattern.SEVENTH_a9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 15);
    ChromaticPattern.SEVENTH_SUS4_b9 = ChromaticPattern.fromRootIntervals(0, 5, 7, 10, 15);
    ChromaticPattern.SEVENTH_MINOR_b9 = ChromaticPattern.fromRootIntervals(0, 3, 7, 10, 13);
    ChromaticPattern.NINTH = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 14);
    ChromaticPattern.NINTH_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7, 10, 14);
    ChromaticPattern.NINTH_b5 = ChromaticPattern.fromRootIntervals(0, 4, 6, 10, 14);
    ChromaticPattern.NINTH_a5 = ChromaticPattern.fromRootIntervals(0, 4, 8, 10, 14);
    ChromaticPattern.NINTH_SUS4 = ChromaticPattern.fromRootIntervals(0, 5, 7, 10, 14);
    ChromaticPattern.NINTH_MAJ9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 14);
    ChromaticPattern.NINTH_MINOR_MAJ9 = ChromaticPattern.fromRootIntervals(0, 3, 7, 11, 14);
    ChromaticPattern.NINTH_ADD6 = ChromaticPattern.fromRootIntervals(0, 4, 7, 9, 10, 14);
}

function initializeElevenths() {
    ChromaticPattern.SEVENTH_ADD11 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 17);
    ChromaticPattern.NINTH_a11 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 14, 18);
    ChromaticPattern.NINTH_MAJ9_a11 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 14, 18);
    ChromaticPattern.ELEVENTH = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 14, 17);
    ChromaticPattern.ELEVENTH_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7, 10, 14, 17);
    ChromaticPattern.ELEVENTH_b9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 13, 17);
    ChromaticPattern.ELEVENTH_a9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 15, 17);
    ChromaticPattern.ELEVENTH_MAJ11 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 14, 17);
    ChromaticPattern.ELEVENTH_MINOR_MAJ11 = ChromaticPattern.fromRootIntervals(0, 3, 7, 11, 14, 17);
}

function initializeThirteenths() {
    ChromaticPattern.SEVENTH_ADD13 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 21);
    ChromaticPattern.THIRTEENTH_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7, 10, 14, 17, 21);
    ChromaticPattern.THIRTEENTH_SUS4 = ChromaticPattern.fromRootIntervals(0, 5, 7, 10, 14, 17, 21);
    ChromaticPattern.THIRTEENTH_b5 = ChromaticPattern.fromRootIntervals(0, 4, 6, 10, 14, 17, 21);
    ChromaticPattern.THIRTEENTH_a5 = ChromaticPattern.fromRootIntervals(0, 4, 8, 10, 14, 17, 21);
    ChromaticPattern.THIRTEENTH_b9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 13, 17, 21);
    ChromaticPattern.THIRTEENTH_a9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 15, 17, 21);
    ChromaticPattern.THIRTEENTH_b5b9 = ChromaticPattern.fromRootIntervals(0, 4, 6, 10, 13, 17, 21);
    ChromaticPattern.THIRTEENTH_b5a9 = ChromaticPattern.fromRootIntervals(0, 4, 6, 10, 15, 17, 21);
    ChromaticPattern.THIRTEENTH_a5b9 = ChromaticPattern.fromRootIntervals(0, 4, 8, 10, 13, 17, 21);
    ChromaticPattern.THIRTEENTH_a5a9 = ChromaticPattern.fromRootIntervals(0, 4, 8, 10, 15, 17, 21);
    ChromaticPattern.THIRTEENTH_MAJ13 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 14, 17, 21);
    ChromaticPattern.THIRTEENTH_MINOR_MAJ13 = ChromaticPattern.fromRootIntervals(0, 3, 7, 11, 14, 17, 21);
    ChromaticPattern.THIRTEENTH_MAJ13_b5 = ChromaticPattern.fromRootIntervals(0, 4, 6, 11, 14, 17, 21);
    ChromaticPattern.THIRTEENTH_MAJ13_a5 = ChromaticPattern.fromRootIntervals(0, 4, 8, 11, 14, 17, 21);
    ChromaticPattern.THIRTEENTH_MAJ13_b9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 13, 17, 21);
    ChromaticPattern.THIRTEENTH_MAJ13_a9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 15, 17, 21);
    ChromaticPattern.THIRTEENTH_MAJ13_b5b9 = ChromaticPattern.fromRootIntervals(0, 4, 6, 11, 13, 17, 21);
    ChromaticPattern.THIRTEENTH_MAJ13_b5a9 = ChromaticPattern.fromRootIntervals(0, 4, 6, 11, 15, 17, 21);
    ChromaticPattern.THIRTEENTH_MAJ13_a5b9 = ChromaticPattern.fromRootIntervals(0, 4, 8, 11, 13, 17, 21);
    ChromaticPattern.THIRTEENTH_MAJ13_a5a9 = ChromaticPattern.fromRootIntervals(0, 4, 8, 11, 15, 17, 21);
}

function initializeInversions() {
    for (let pattern of ChromaticPattern.all()) {
        for (let i = 1; i < pattern.length; i++) {
            let patternInv = pattern.withInv(i);
            if (!ChromaticPattern.all().includes(patternInv)) {
                (<any>patternInv)._rootIndex = pattern.length - i;
            }
        }
    }

    for (let pattern of ChromaticPattern.all()) {
        for (let i = 0; i < pattern.length; i++) {
            let patternInv = pattern.withInv(i);
            Object.freeze(patternInv);
        }
    }
}