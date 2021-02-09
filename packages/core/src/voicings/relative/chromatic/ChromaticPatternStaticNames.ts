import { ChromaticPattern, ChromaticPatternArray } from './ChromaticPattern';


export class ChromaticPatternStaticNames {
    // Intervals
    static get MINOR_SECOND() {
        if (!_MINOR_SECOND) {
            _MINOR_SECOND = ChromaticPattern.fromRootIntervals(0, 1);
            calculateInversionsAndFreeze(_MINOR_SECOND);
        }
        return _MINOR_SECOND;
    }

    static get MAJOR_SECOND() {
        if (!_MAJOR_SECOND) {
            _MAJOR_SECOND = ChromaticPattern.fromRootIntervals(0, 2);
            calculateInversionsAndFreeze(_MAJOR_SECOND);
        }
        return _MAJOR_SECOND;
    }

    static get MINOR_THIRD() {
        if (!_MINOR_THIRD) {
            _MINOR_THIRD = ChromaticPattern.fromRootIntervals(0, 3);
            calculateInversionsAndFreeze(_MINOR_THIRD);
        }
        return _MINOR_THIRD;
    }

    static get MAJOR_THIRD() {
        if (!_MAJOR_THIRD) {
            _MAJOR_THIRD = ChromaticPattern.fromRootIntervals(0, 4);
            calculateInversionsAndFreeze(_MAJOR_THIRD);
        }
        return _MAJOR_THIRD;
    }

    static get TRITONE() {
        if (!_TRITONE)
            _TRITONE = ChromaticPattern.fromRootIntervals(0, 6);

        return _TRITONE;
    }

    static get POWER_CHORD() {
        if (!_POWER_CHORD) {
            _POWER_CHORD = ChromaticPattern.fromRootIntervals(0, 7);
            calculateInversionsAndFreeze(_POWER_CHORD);
        }
        return _POWER_CHORD;
    }

    // Triads
    static get TRIAD_MAJOR(): ChromaticPattern {
        if (!_TRIAD_MAJOR) {
            _TRIAD_MAJOR = ChromaticPattern.fromRootIntervals(0, 4, 7);
            calculateInversionsAndFreeze(_TRIAD_MAJOR);
        }
        return _TRIAD_MAJOR;
    }
    static get TRIAD_MINOR(): ChromaticPattern {
        if (!_TRIAD_MINOR) {
            _TRIAD_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7);
            calculateInversionsAndFreeze(_TRIAD_MINOR);
        }
        return _TRIAD_MINOR;
    }
    static get TRIAD_DIMINISHED(): ChromaticPattern {
        if (!_TRIAD_DIMINISHED) {
            _TRIAD_DIMINISHED = ChromaticPattern.fromRootIntervals(0, 3, 6);
            calculateInversionsAndFreeze(_TRIAD_DIMINISHED);
        }
        return _TRIAD_DIMINISHED;
    }

    static get TRIAD_AUGMENTED(): ChromaticPattern {
        if (!_TRIAD_AUGMENTED) {
            _TRIAD_AUGMENTED = ChromaticPattern.fromRootIntervals(0, 4, 8);
            Object.freeze(_TRIAD_AUGMENTED);
        }
        return _TRIAD_AUGMENTED;
    }
    static get TRIAD_SUS4(): ChromaticPattern {
        return ChromaticPattern.fromRootIntervals(0, 5, 7);
    }
    static get TRIAD_SUS2(): ChromaticPattern {
        return ChromaticPattern.fromRootIntervals(0, 2, 7);
    }
    static get TRIAD_QUARTAL(): ChromaticPattern {
        return ChromaticPattern.fromRootIntervals(0, 5, 10);
    }

    // Sevenths
    static get SEVENTH(): ChromaticPattern {
        if (!_SEVENTH) {
            _SEVENTH = ChromaticPattern.fromRootIntervals(0, 4, 7, 10);
            calculateInversionsAndFreeze(_SEVENTH);
        }
        return _SEVENTH;
    }
    static get SEVENTH_b5(): ChromaticPattern {
        if (!_SEVENTH_b5) {
            _SEVENTH_b5 = ChromaticPattern.fromRootIntervals(0, 4, 6, 10);
            Object.freeze(_SEVENTH_b5);
            (<any>_SEVENTH_b5.withInv(1))._rootIndex = 3;
            Object.freeze(_SEVENTH_b5.withInv(1));
        }
        return _SEVENTH_b5;
    }
    static get SEVENTH_a5(): ChromaticPattern {
        if (!_SEVENTH_a5) {
            _SEVENTH_a5 = ChromaticPattern.fromRootIntervals(0, 4, 8, 10);
            calculateInversionsAndFreeze(_SEVENTH_a5);
        }
        return _SEVENTH_a5;
    }
    static get SEVENTH_MINOR(): ChromaticPattern {
        initialize_SEVENTH_MINOR_IfNeeded();

        return _SEVENTH_MINOR;
    }
    static get SEVENTH_MINOR_b5(): ChromaticPattern {
        initialize_SEVENTH_MINOR_b5_IfNeeded();
        return _SEVENTH_MINOR_b5;
    }
    static get SEVENTH_MINOR_a5(): ChromaticPattern {
        initialize_SEVENTH_MINOR_a5_IfNeeded();
        return _SEVENTH_MINOR_a5;
    }
    static get SEVENTH_MINOR_MAJ7(): ChromaticPattern {
        if (!_SEVENTH_MINOR_MAJ7) {
            _SEVENTH_MINOR_MAJ7 = ChromaticPattern.fromRootIntervals(0, 3, 7, 11);
            calculateInversionsAndFreeze(_SEVENTH_MINOR_MAJ7);
        }
        return _SEVENTH_MINOR_MAJ7;
    }
    static get SEVENTH_MAJ7(): ChromaticPattern {
        if (!_SEVENTH_MAJ7) {
            _SEVENTH_MAJ7 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11);
            calculateInversionsAndFreeze(_SEVENTH_MAJ7);
        }
        return _SEVENTH_MAJ7;
    }
    static get SEVENTH_MAJ7_b5(): ChromaticPattern {
        if (!_SEVENTH_MAJ7b5) {
            _SEVENTH_MAJ7b5 = ChromaticPattern.fromRootIntervals(0, 4, 6, 11);
            calculateInversionsAndFreeze(_SEVENTH_MAJ7b5);
        }
        return _SEVENTH_MAJ7b5;
    }
    static get SEVENTH_SUS4(): ChromaticPattern {
        if (!_SEVENTH_SUS4) {
            _SEVENTH_SUS4 = ChromaticPattern.fromRootIntervals(0, 5, 7, 10);
            calculateInversionsAndFreeze(_SEVENTH_SUS4);
        }
        return _SEVENTH_SUS4;
    }
    static get SIXTH(): ChromaticPattern {
        initialize_SEVENTH_MINOR_IfNeeded();

        return _SIXTH;
    }
    static get SIXTH_MINOR(): ChromaticPattern {
        initialize_SEVENTH_MINOR_b5_IfNeeded();

        return _SIXTH_MINOR;
    }
    static get SIXTH_SUS4(): ChromaticPattern {
        initialize_SEVENTH_MINOR_a5_IfNeeded();

        return _SIXTH_SUS4;
    }

    // Ninths

    static get SIXTH_ADD9(): ChromaticPattern {
        if (!_SIXTH_ADD9) {
            _SIXTH_ADD9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 9, 14);
            calculateInversionsAndFreeze(_SIXTH_ADD9);
        }

        return _SIXTH_ADD9;
    }
    static get SIXTH_MINOR_ADD9(): ChromaticPattern {
        if (!_SIXTH_MINOR_ADD9) {
            _SIXTH_MINOR_ADD9 = ChromaticPattern.fromRootIntervals(0, 3, 7, 9, 14);
            calculateInversionsAndFreeze(_SIXTH_MINOR_ADD9);
        }

        return _SIXTH_MINOR_ADD9;
    }
    static get SEVENTH_b9(): ChromaticPattern {
        if (!_SEVENTH_b9) {
            _SEVENTH_b9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 13);
            calculateInversionsAndFreeze(_SEVENTH_b9);
        }

        return _SEVENTH_b9;
    }
    static get SEVENTH_a9(): ChromaticPattern {
        if (!_SEVENTH_a9) {
            _SEVENTH_a9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 15);
            calculateInversionsAndFreeze(_SEVENTH_a9);
        }
        return _SEVENTH_a9;
    }
    static get SEVENTH_SUS4_b9(): ChromaticPattern {
        if (!_SEVENTH_SUS4_b9) {
            _SEVENTH_SUS4_b9 = ChromaticPattern.fromRootIntervals(0, 5, 7, 10, 15);
            calculateInversionsAndFreeze(_SEVENTH_SUS4_b9);
        }
        return _SEVENTH_SUS4_b9;
    }
    static get SEVENTH_MINOR_b9(): ChromaticPattern {
        initialize_SEVENTH_MINOR_b9_ifNeeded();
        return _SEVENTH_MINOR_b9;
    }
    static get NINTH(): ChromaticPattern {
        if (!_NINTH) {
            _NINTH = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 14);
            calculateInversionsAndFreeze(_NINTH);
        }
        return _NINTH;
    }
    static get NINTH_MINOR(): ChromaticPattern {
        if (!_NINTH_MINOR) {
            _NINTH_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7, 10, 14);
            calculateInversionsAndFreeze(_NINTH_MINOR);
        }
        return _NINTH_MINOR;
    }
    static get NINTH_b5(): ChromaticPattern {
        if (!_NINTH_b5) {
            _NINTH_b5 = ChromaticPattern.fromRootIntervals(0, 4, 6, 10, 14);
            calculateInversionsAndFreeze(_NINTH_b5);
        }
        return _NINTH_b5;
    }
    static get NINTH_a5(): ChromaticPattern {
        if (!_NINTH_a5) {
            _NINTH_a5 = ChromaticPattern.fromRootIntervals(0, 4, 8, 10, 14);
            calculateInversionsAndFreeze(_NINTH_a5);
        }
        return _NINTH_a5;
    }
    static get NINTH_SUS4(): ChromaticPattern {
        if (!_NINTH_SUS4) {
            _NINTH_SUS4 = ChromaticPattern.fromRootIntervals(0, 5, 7, 10, 14);
            calculateInversionsAndFreeze(_NINTH_SUS4);
        }
        return _NINTH_SUS4;
    }
    static get NINTH_MAJ9(): ChromaticPattern {
        if (!_NINTH_MAJ9) {
            _NINTH_MAJ9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 14);
            calculateInversionsAndFreeze(_NINTH_MAJ9);
        }
        return _NINTH_MAJ9;
    }
    static get NINTH_MINOR_MAJ9(): ChromaticPattern {
        if (!_NINTH_MINOR_MAJ9) {
            _NINTH_MINOR_MAJ9 = ChromaticPattern.fromRootIntervals(0, 3, 7, 11, 14);
            calculateInversionsAndFreeze(_NINTH_MINOR_MAJ9);
        }
        return _NINTH_MINOR_MAJ9;
    }
    static get NINTH_ADD6(): ChromaticPattern {
        if (!_NINTH_ADD6) {
            _NINTH_ADD6 = ChromaticPattern.fromRootIntervals(0, 4, 7, 9, 10, 14);
            calculateInversionsAndFreeze(_NINTH_ADD6);
        }
        return _NINTH_ADD6;
    }

    // Elevenths

    static get SEVENTH_ADD11(): ChromaticPattern {
        if (!_SEVENTH_ADD11) {
            _SEVENTH_ADD11 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 17);
            calculateInversionsAndFreeze(_SEVENTH_ADD11);
        }
        return _SEVENTH_ADD11;
    }
    static get NINTH_a11(): ChromaticPattern {
        if (!_NINTH_a11) {
            _NINTH_a11 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 14, 18);
            calculateInversionsAndFreeze(_NINTH_a11);
        }
        return _NINTH_a11;
    }
    static get NINTH_MAJ9_a11(): ChromaticPattern {
        if (!_NINTH_MAJ9_a11) {
            _NINTH_MAJ9_a11 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 14, 18);
            calculateInversionsAndFreeze(_NINTH_MAJ9_a11);
        }
        return _NINTH_MAJ9_a11;
    }
    static get ELEVENTH(): ChromaticPattern {
        if (!_ELEVENTH) {
            _ELEVENTH = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 14, 17);
            calculateInversionsAndFreeze(_ELEVENTH);
        }
        return _ELEVENTH;
    }
    static get ELEVENTH_MINOR(): ChromaticPattern {
        if (!_ELEVENTH_MINOR) {
            _ELEVENTH_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7, 10, 14, 17);
            calculateInversionsAndFreeze(_ELEVENTH_MINOR);
        }
        return _ELEVENTH_MINOR;
    }
    static get ELEVENTH_b9(): ChromaticPattern {
        if (!_ELEVENTH_b9)
            _ELEVENTH_b9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 13, 17);

        return _ELEVENTH_b9;
    }
    static get ELEVENTH_a9(): ChromaticPattern {
        if (!_ELEVENTH_a9)
            _ELEVENTH_a9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 15, 17);

        return _ELEVENTH_a9
    }
    static get ELEVENTH_MAJ11(): ChromaticPattern {
        if (!_ELEVENTH_MAJ11)
            _ELEVENTH_MAJ11 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 14, 17);

        return _ELEVENTH_MAJ11;
    }
    static get ELEVENTH_MINOR_MAJ11(): ChromaticPattern {
        if (!_ELEVENTH_MINOR_MAJ11)
            _ELEVENTH_MINOR_MAJ11 = ChromaticPattern.fromRootIntervals(0, 3, 7, 11, 14, 17);

        return _ELEVENTH_MINOR_MAJ11;
    }

    // THIRTEENTH

    static get SEVENTH_ADD13(): ChromaticPattern {
        initialize_SEVENTH_MINOR_b9_ifNeeded();
        return _SEVENTH_ADD13;
    }
    static get THIRTEENTH_MINOR(): ChromaticPattern {
        initialize_THIRTEENTH_MAJ13_IfNeeded();
        return _THIRTEENTH_MINOR;
    }
    static get THIRTEENTH_SUS4(): ChromaticPattern {
        if (!_THIRTEENTH_SUS4) {
            _THIRTEENTH_SUS4 = ChromaticPattern.fromRootIntervals(0, 5, 7, 10, 14, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_SUS4);
        }
        return _THIRTEENTH_SUS4;
    }
    static get THIRTEENTH_b5(): ChromaticPattern {
        initialize_THIRTEENTH_b5_IfNeeded();
        return _THIRTEENTH_b5;
    }
    static get THIRTEENTH_a5(): ChromaticPattern {
        initialize_THIRTEENTH_a5_IfNeeded();
        return _THIRTEENTH_a5;
    }
    static get THIRTEENTH_b9(): ChromaticPattern {
        if (!_THIRTEENTH_b9) {
            _THIRTEENTH_b9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 13, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_b9);
        }
        return _THIRTEENTH_b9;
    }
    static get THIRTEENTH_a9(): ChromaticPattern {
        if (!_THIRTEENTH_a9) {
            _THIRTEENTH_a9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 15, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_a9);
        }
        return _THIRTEENTH_a9;
    }
    static get THIRTEENTH_b5b9(): ChromaticPattern {
        initialize_THIRTEENTH_MAJ13_a5a9_IfNeeded();

        return _THIRTEENTH_b5b9;
    }
    static get THIRTEENTH_b5a9(): ChromaticPattern {
        if (!_THIRTEENTH_b5a9) {
            _THIRTEENTH_b5a9 = ChromaticPattern.fromRootIntervals(0, 4, 6, 10, 15, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_b5a9);
        }
        return _THIRTEENTH_b5a9;
    }
    static get THIRTEENTH_a5b9(): ChromaticPattern {
        if (!_THIRTEENTH_a5b9) {
            _THIRTEENTH_a5b9 = ChromaticPattern.fromRootIntervals(0, 4, 8, 10, 13, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_a5b9);
        }
        return _THIRTEENTH_a5b9;
    }
    static get THIRTEENTH_a5a9(): ChromaticPattern {
        if (!_THIRTEENTH_a5a9) {
            _THIRTEENTH_a5a9 = ChromaticPattern.fromRootIntervals(0, 4, 8, 10, 15, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_a5a9);
        }
        return _THIRTEENTH_a5a9;
    }
    static get THIRTEENTH_MAJ13(): ChromaticPattern {
        initialize_THIRTEENTH_MAJ13_IfNeeded();
        return _THIRTEENTH_MAJ13;
    }
    static get THIRTEENTH_MINOR_MAJ13(): ChromaticPattern {
        if (!_THIRTEENTH_MINOR_MAJ13) {
            _THIRTEENTH_MINOR_MAJ13 = ChromaticPattern.fromRootIntervals(0, 3, 7, 11, 14, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_MINOR_MAJ13);
        }

        return _THIRTEENTH_MINOR_MAJ13;
    }
    static get THIRTEENTH_MAJ13_b5(): ChromaticPattern {
        if (!_THIRTEENTH_MAJ13_b5) {
            _THIRTEENTH_MAJ13_b5 = ChromaticPattern.fromRootIntervals(0, 4, 6, 11, 14, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_MAJ13_b5);
        }

        return _THIRTEENTH_MAJ13_b5;
    }
    static get THIRTEENTH_MAJ13_a5(): ChromaticPattern {
        if (!_THIRTEENTH_MAJ13_a5) {
            _THIRTEENTH_MAJ13_a5 = ChromaticPattern.fromRootIntervals(0, 4, 8, 11, 14, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_MAJ13_a5);
        }
        return _THIRTEENTH_MAJ13_a5;
    }
    static get THIRTEENTH_MAJ13_b9(): ChromaticPattern {
        initialize_THIRTEENTH_b5_IfNeeded();

        return _THIRTEENTH_MAJ13_b9;
    }
    static get THIRTEENTH_MAJ13_a9(): ChromaticPattern {
        initialize_THIRTEENTH_a5_IfNeeded();

        return _THIRTEENTH_MAJ13_a9;
    }
    static get THIRTEENTH_MAJ13_b5b9(): ChromaticPattern {
        if (!_THIRTEENTH_MAJ13_b5b9) {
            _THIRTEENTH_MAJ13_b5b9 = ChromaticPattern.fromRootIntervals(0, 4, 6, 11, 13, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_MAJ13_b5b9);
        }
        return _THIRTEENTH_MAJ13_b5b9;
    }
    static get THIRTEENTH_MAJ13_b5a9(): ChromaticPattern {
        if (!_THIRTEENTH_MAJ13_b5a9) {
            _THIRTEENTH_MAJ13_b5a9 = ChromaticPattern.fromRootIntervals(0, 4, 6, 11, 15, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_MAJ13_b5a9);
        }

        return _THIRTEENTH_MAJ13_b5a9;
    }
    static get THIRTEENTH_MAJ13_a5b9(): ChromaticPattern {
        if (!_THIRTEENTH_MAJ13_a5b9) {
            _THIRTEENTH_MAJ13_a5b9 = ChromaticPattern.fromRootIntervals(0, 4, 8, 11, 13, 17, 21);
            calculateInversionsAndFreeze(_THIRTEENTH_MAJ13_a5b9);
        }

        return _THIRTEENTH_MAJ13_a5b9;
    }
    static get THIRTEENTH_MAJ13_a5a9(): ChromaticPattern {
        initialize_THIRTEENTH_MAJ13_a5a9_IfNeeded();

        return _THIRTEENTH_MAJ13_a5a9;
    }

    private static _calcAll(): ChromaticPatternArray {
        return [
            ChromaticPattern.MINOR_SECOND,
            ChromaticPattern.MAJOR_SECOND,
            ChromaticPattern.MINOR_THIRD,
            ChromaticPattern.MAJOR_THIRD,
            ChromaticPattern.TRITONE,
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
            ChromaticPattern.SEVENTH_MAJ7_b5,
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

    private static _calcAllNonInversions(): ChromaticPatternArray {
        return [
            ChromaticPattern.POWER_CHORD,
            ChromaticPattern.TRIAD_MAJOR,
            ChromaticPattern.TRIAD_MINOR,
            ChromaticPattern.TRIAD_DIMINISHED,
            ChromaticPattern.TRIAD_AUGMENTED,
            ChromaticPattern.TRIAD_SUS4,
            ChromaticPattern.SEVENTH,
            ChromaticPattern.SEVENTH_b5,
            ChromaticPattern.SEVENTH_a5,
            ChromaticPattern.SEVENTH_SUS4,
            ChromaticPattern.SEVENTH_SUS4_b9,
            ChromaticPattern.SEVENTH_MINOR,
            ChromaticPattern.SEVENTH_MINOR_b5,
            ChromaticPattern.SEVENTH_MINOR_a5,
            ChromaticPattern.SEVENTH_MAJ7,
            ChromaticPattern.SEVENTH_MAJ7_b5,
            ChromaticPattern.SEVENTH_MINOR_MAJ7,
            ChromaticPattern.SIXTH_ADD9,
            ChromaticPattern.SIXTH_MINOR_ADD9,
            ChromaticPattern.SEVENTH_b9,
            ChromaticPattern.SEVENTH_a9,
            ChromaticPattern.SEVENTH_MINOR_b9,
            ChromaticPattern.SEVENTH_ADD11,
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
            ChromaticPattern.THIRTEENTH_SUS4,
            ChromaticPattern.THIRTEENTH_b5,
            ChromaticPattern.THIRTEENTH_a5,
            ChromaticPattern.THIRTEENTH_b9,
            ChromaticPattern.THIRTEENTH_a9,
            ChromaticPattern.THIRTEENTH_b5a9,
            ChromaticPattern.THIRTEENTH_a5b9,
            ChromaticPattern.THIRTEENTH_a5a9,
            ChromaticPattern.THIRTEENTH_MAJ13,
            ChromaticPattern.THIRTEENTH_MINOR_MAJ13,
            ChromaticPattern.THIRTEENTH_MAJ13_b5,
            ChromaticPattern.THIRTEENTH_MAJ13_a5,
            ChromaticPattern.THIRTEENTH_MAJ13_b5a9,
            ChromaticPattern.THIRTEENTH_MAJ13_b5b9,
            ChromaticPattern.THIRTEENTH_MAJ13_a5b9,
            ChromaticPattern.THIRTEENTH_MAJ13_a5a9
        ];
    }

    static get sets() {
        return {
            get all(): ChromaticPatternArray {
                if (!_all)
                    _all = ChromaticPattern._calcAll();

                return _all;
            },
            get commonTriads(): ChromaticPatternArray {
                return <ChromaticPatternArray>[
                    ...ChromaticPattern.sets.triadsMajorMinor,
                    ...ChromaticPattern.TRIAD_DIMINISHED.getAllInversions(),
                    ...ChromaticPattern.TRIAD_AUGMENTED.getAllInversions(),
                    ...ChromaticPattern.TRIAD_SUS4.getAllInversions(),
                ]
            },
            get triadsMajorMinor(): ChromaticPatternArray {
                return <ChromaticPatternArray>[
                    ...ChromaticPattern.TRIAD_MAJOR.getAllInversions(),
                    ...ChromaticPattern.TRIAD_MINOR.getAllInversions()
                ]
            }
        }
    }

    static allNonInversions(): ChromaticPatternArray {
        if (!_allNonInversions)
            _allNonInversions = this._calcAllNonInversions();

        return _allNonInversions;
    }
}

function calculateInversionsAndFreeze(pattern: ChromaticPattern) {
    for (let n = 1; n < pattern.length; n++) {
        const patternInv = (<any>pattern.withInv(n));
        if (Object.isFrozen(patternInv))
            throw new Error(JSON.stringify(patternInv));
        patternInv._rootIndex = pattern.length - n;
        Object.freeze(patternInv);
    }
    Object.freeze(pattern);
}

let _MINOR_SECOND: ChromaticPattern;
let _MAJOR_SECOND: ChromaticPattern;
let _MINOR_THIRD: ChromaticPattern;
let _MAJOR_THIRD: ChromaticPattern;
let _TRITONE: ChromaticPattern;
let _POWER_CHORD: ChromaticPattern;

let _TRIAD_MAJOR: ChromaticPattern;
let _TRIAD_MINOR: ChromaticPattern;
let _TRIAD_DIMINISHED: ChromaticPattern;
let _TRIAD_AUGMENTED: ChromaticPattern;

let _SEVENTH: ChromaticPattern;
let _SEVENTH_b5: ChromaticPattern;
let _SEVENTH_a5: ChromaticPattern;
let _SEVENTH_MINOR: ChromaticPattern;
let _SEVENTH_MINOR_b5: ChromaticPattern;
let _SEVENTH_MINOR_a5: ChromaticPattern;
let _SEVENTH_MINOR_MAJ7: ChromaticPattern;
let _SEVENTH_MAJ7: ChromaticPattern;
let _SEVENTH_MAJ7b5: ChromaticPattern;
let _SEVENTH_SUS4: ChromaticPattern;
let _SIXTH: ChromaticPattern;
let _SIXTH_MINOR: ChromaticPattern;
let _SIXTH_SUS4: ChromaticPattern;
let _SIXTH_ADD9: ChromaticPattern;
let _SIXTH_MINOR_ADD9: ChromaticPattern;
let _SEVENTH_b9: ChromaticPattern;
let _SEVENTH_a9: ChromaticPattern;
let _SEVENTH_SUS4_b9: ChromaticPattern;
let _SEVENTH_MINOR_b9: ChromaticPattern;
let _NINTH: ChromaticPattern;
let _NINTH_MINOR: ChromaticPattern;
let _NINTH_b5: ChromaticPattern;
let _NINTH_a5: ChromaticPattern;
let _NINTH_SUS4: ChromaticPattern;
let _NINTH_MAJ9: ChromaticPattern;
let _NINTH_MINOR_MAJ9: ChromaticPattern;
let _NINTH_ADD6: ChromaticPattern;
let _SEVENTH_ADD11: ChromaticPattern;
let _NINTH_a11: ChromaticPattern;
let _NINTH_MAJ9_a11: ChromaticPattern;
let _ELEVENTH: ChromaticPattern;
let _ELEVENTH_MINOR: ChromaticPattern;
let _ELEVENTH_b9: ChromaticPattern;
let _ELEVENTH_a9: ChromaticPattern;
let _ELEVENTH_MAJ11: ChromaticPattern;
let _ELEVENTH_MINOR_MAJ11: ChromaticPattern;
let _SEVENTH_ADD13: ChromaticPattern;
let _THIRTEENTH_MINOR: ChromaticPattern;
let _THIRTEENTH_SUS4: ChromaticPattern;
let _THIRTEENTH_b5: ChromaticPattern;
let _THIRTEENTH_a5: ChromaticPattern;
let _THIRTEENTH_b9: ChromaticPattern;
let _THIRTEENTH_a9: ChromaticPattern;
let _THIRTEENTH_b5b9: ChromaticPattern;
let _THIRTEENTH_b5a9: ChromaticPattern;
let _THIRTEENTH_a5b9: ChromaticPattern;
let _THIRTEENTH_a5a9: ChromaticPattern;
let _THIRTEENTH_MAJ13: ChromaticPattern;
let _THIRTEENTH_MINOR_MAJ13: ChromaticPattern;
let _THIRTEENTH_MAJ13_b5: ChromaticPattern;
let _THIRTEENTH_MAJ13_a5: ChromaticPattern;
let _THIRTEENTH_MAJ13_b9: ChromaticPattern;
let _THIRTEENTH_MAJ13_a9: ChromaticPattern;
let _THIRTEENTH_MAJ13_b5b9: ChromaticPattern;
let _THIRTEENTH_MAJ13_b5a9: ChromaticPattern;
let _THIRTEENTH_MAJ13_a5b9: ChromaticPattern;
let _THIRTEENTH_MAJ13_a5a9: ChromaticPattern;

let _all: ChromaticPatternArray;
let _allNonInversions: ChromaticPatternArray;

function initialize_SEVENTH_MINOR_IfNeeded() {
    if (!_SEVENTH_MINOR) {
        _SEVENTH_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7, 10);
        Object.freeze(_SEVENTH_MINOR);

        _SIXTH = ChromaticPattern.fromRootIntervals(0, 4, 7, 9);
        Object.freeze(_SIXTH);

        (<any>_SEVENTH_MINOR.withInv(2))._rootIndex = 2;
        Object.freeze(_SEVENTH_MINOR.withInv(2));
        (<any>_SEVENTH_MINOR.withInv(3))._rootIndex = 1;
        Object.freeze(_SEVENTH_MINOR.withInv(3));
    }
}

function initialize_SEVENTH_MINOR_a5_IfNeeded() {
    if (!_SEVENTH_MINOR_a5) {
        _SEVENTH_MINOR_a5 = ChromaticPattern.fromRootIntervals(0, 3, 8, 10);
        Object.freeze(_SEVENTH_MINOR_a5);

        _SIXTH_SUS4 = ChromaticPattern.fromRootIntervals(0, 5, 7, 9);
        Object.freeze(_SIXTH_SUS4);

        (<any>_SEVENTH_MINOR_a5.withInv(2))._rootIndex = 2;
        Object.freeze(_SEVENTH_MINOR_a5.withInv(2));
        (<any>_SEVENTH_MINOR_a5.withInv(3))._rootIndex = 1;
        Object.freeze(_SEVENTH_MINOR_a5.withInv(3));
    }
}

function initialize_SEVENTH_MINOR_b5_IfNeeded() {
    if (!_SEVENTH_MINOR_b5) {
        _SEVENTH_MINOR_b5 = ChromaticPattern.fromRootIntervals(0, 3, 6, 10);
        Object.freeze(_SEVENTH_MINOR_b5);

        _SIXTH_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7, 9);
        Object.freeze(_SIXTH_MINOR);

        (<any>_SEVENTH_MINOR_b5.withInv(2))._rootIndex = 2;
        Object.freeze(_SEVENTH_MINOR_b5.withInv(2));
        (<any>_SEVENTH_MINOR_b5.withInv(3))._rootIndex = 1;
        Object.freeze(_SEVENTH_MINOR_b5.withInv(3));
    }
}

function initialize_SEVENTH_MINOR_b9_ifNeeded() {
    if (!_SEVENTH_MINOR_b9) {
        _SEVENTH_MINOR_b9 = ChromaticPattern.fromRootIntervals(0, 3, 7, 10, 13);
        Object.freeze(_SEVENTH_MINOR_b9);
        (<any>_SEVENTH_MINOR_b9.withInv(2))._rootIndex = 3;
        Object.freeze(_SEVENTH_MINOR_b9.withInv(2));
        (<any>_SEVENTH_MINOR_b9.withInv(3))._rootIndex = 2;
        Object.freeze(_SEVENTH_MINOR_b9.withInv(3));
        (<any>_SEVENTH_MINOR_b9.withInv(4))._rootIndex = 1;
        Object.freeze(_SEVENTH_MINOR_b9.withInv(4));

        _SEVENTH_ADD13 = ChromaticPattern.fromRootIntervals(0, 4, 7, 10, 21);
        Object.freeze(_SEVENTH_ADD13);
    }
}

function initialize_THIRTEENTH_MAJ13_IfNeeded() {
    if (!_THIRTEENTH_MAJ13) {
        _THIRTEENTH_MAJ13 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 14, 17, 21);
        Object.freeze(_THIRTEENTH_MAJ13);
        (<any>_THIRTEENTH_MAJ13.withInv(1))._rootIndex = 6;
        Object.freeze(_THIRTEENTH_MAJ13.withInv(1));
        (<any>_THIRTEENTH_MAJ13.withInv(2))._rootIndex = 5;
        Object.freeze(_THIRTEENTH_MAJ13.withInv(2));
        (<any>_THIRTEENTH_MAJ13.withInv(3))._rootIndex = 4;
        Object.freeze(_THIRTEENTH_MAJ13.withInv(3));

        _THIRTEENTH_MINOR = ChromaticPattern.fromRootIntervals(0, 3, 7, 10, 14, 17, 21);
        Object.freeze(_THIRTEENTH_MINOR);

        (<any>_THIRTEENTH_MAJ13.withInv(5))._rootIndex = 2;
        Object.freeze(_THIRTEENTH_MAJ13.withInv(5));
        (<any>_THIRTEENTH_MAJ13.withInv(6))._rootIndex = 1;
        Object.freeze(_THIRTEENTH_MAJ13.withInv(6));
    }
}
function initialize_THIRTEENTH_b5_IfNeeded() {
    if (!_THIRTEENTH_b5) {
        _THIRTEENTH_b5 = ChromaticPattern.fromRootIntervals(0, 4, 6, 10, 14, 17, 21);
        Object.freeze(_THIRTEENTH_b5);
        (<any>_THIRTEENTH_b5.withInv(1))._rootIndex = 6;
        Object.freeze(_THIRTEENTH_b5.withInv(1));
        (<any>_THIRTEENTH_b5.withInv(2))._rootIndex = 5;
        Object.freeze(_THIRTEENTH_b5.withInv(2));
        (<any>_THIRTEENTH_b5.withInv(3))._rootIndex = 4;
        Object.freeze(_THIRTEENTH_b5.withInv(3));
        (<any>_THIRTEENTH_b5.withInv(4))._rootIndex = 3;
        Object.freeze(_THIRTEENTH_b5.withInv(4));

        _THIRTEENTH_MAJ13_b9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 13, 17, 21);
        Object.freeze(_THIRTEENTH_MAJ13_b9);

        (<any>_THIRTEENTH_b5.withInv(6))._rootIndex = 1;
        Object.freeze(_THIRTEENTH_b5.withInv(6));
    }
}

function initialize_THIRTEENTH_a5_IfNeeded() {
    if (!_THIRTEENTH_a5) {
        _THIRTEENTH_a5 = ChromaticPattern.fromRootIntervals(0, 4, 8, 10, 14, 17, 21);
        Object.freeze(_THIRTEENTH_a5);
        (<any>_THIRTEENTH_a5.withInv(1))._rootIndex = 6;
        Object.freeze(_THIRTEENTH_a5.withInv(1));
        (<any>_THIRTEENTH_a5.withInv(2))._rootIndex = 5;
        Object.freeze(_THIRTEENTH_a5.withInv(2));
        (<any>_THIRTEENTH_a5.withInv(3))._rootIndex = 4;
        Object.freeze(_THIRTEENTH_a5.withInv(3));
        (<any>_THIRTEENTH_a5.withInv(4))._rootIndex = 3;
        Object.freeze(_THIRTEENTH_a5.withInv(4));

        _THIRTEENTH_MAJ13_a9 = ChromaticPattern.fromRootIntervals(0, 4, 7, 11, 15, 17, 21);
        Object.freeze(_THIRTEENTH_MAJ13_a9);

        (<any>_THIRTEENTH_a5.withInv(6))._rootIndex = 1;
        Object.freeze(_THIRTEENTH_a5.withInv(6));
    }
}

function initialize_THIRTEENTH_MAJ13_a5a9_IfNeeded() {
    if (!_THIRTEENTH_MAJ13_a5a9) {
        _THIRTEENTH_MAJ13_a5a9 = ChromaticPattern.fromRootIntervals(0, 4, 8, 11, 15, 17, 21);

        Object.freeze(_THIRTEENTH_MAJ13_a5a9);
        (<any>_THIRTEENTH_MAJ13_a5a9.withInv(1))._rootIndex = 6;
        Object.freeze(_THIRTEENTH_MAJ13_a5a9.withInv(1));
        (<any>_THIRTEENTH_MAJ13_a5a9.withInv(2))._rootIndex = 5;
        Object.freeze(_THIRTEENTH_MAJ13_a5a9.withInv(2));

        _THIRTEENTH_b5b9 = ChromaticPattern.fromRootIntervals(0, 4, 6, 10, 13, 17, 21);
        Object.freeze(_THIRTEENTH_b5b9);

        (<any>_THIRTEENTH_MAJ13_a5a9.withInv(4))._rootIndex = 3;
        Object.freeze(_THIRTEENTH_MAJ13_a5a9.withInv(4));
        (<any>_THIRTEENTH_MAJ13_a5a9.withInv(5))._rootIndex = 2;
        Object.freeze(_THIRTEENTH_MAJ13_a5a9.withInv(5));
        (<any>_THIRTEENTH_MAJ13_a5a9.withInv(6))._rootIndex = 1;
        Object.freeze(_THIRTEENTH_MAJ13_a5a9.withInv(6));
    }
}