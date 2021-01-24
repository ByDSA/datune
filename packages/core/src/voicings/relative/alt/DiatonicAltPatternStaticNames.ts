import { ChromaticPattern } from "../chromatic/ChromaticPattern";
import { DiatonicPattern } from "../diatonic/DiatonicPattern";
import { DiatonicAltPattern } from "./DiatonicAltPattern";

export class PatternAltStaticNames {
    static get POWER_CHORD(): DiatonicAltPattern {
        if (!_POWER_CHORD) {
            _POWER_CHORD = DiatonicAltPattern.fromPatterns(ChromaticPattern.POWER_CHORD, DiatonicPattern.FIFTH);
            calculateInversionsAndFreeze(_POWER_CHORD)
        }
        return _POWER_CHORD;
    }
    static get TRIAD_MAJOR(): DiatonicAltPattern {
        if (!_TRIAD_MAJOR) {
            _TRIAD_MAJOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_MAJOR, DiatonicPattern.TRIAD);
            calculateInversionsAndFreeze(_TRIAD_MAJOR);
        }
        return _TRIAD_MAJOR;
    }
    static get TRIAD_MINOR(): DiatonicAltPattern {
        if (!_TRIAD_MINOR) {
            _TRIAD_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_MINOR, DiatonicPattern.TRIAD);
            calculateInversionsAndFreeze(_TRIAD_MINOR);
        }
        return _TRIAD_MINOR;
    }
    static get TRIAD_DIMINISHED(): DiatonicAltPattern {
        if (!_TRIAD_DIMINISHED) {
            _TRIAD_DIMINISHED = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_DIMINISHED, DiatonicPattern.TRIAD);
            calculateInversionsAndFreeze(_TRIAD_DIMINISHED);
        }
        return _TRIAD_DIMINISHED;
    }
    static get TRIAD_AUGMENTED(): DiatonicAltPattern {
        if (!_TRIAD_AUGMENTED) {
            _TRIAD_AUGMENTED = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_AUGMENTED, DiatonicPattern.TRIAD);
            calculateInversionsAndFreeze(_TRIAD_AUGMENTED);
        }
        return _TRIAD_AUGMENTED;
    }
    static get TRIAD_SUS4(): DiatonicAltPattern {
        if (!_TRIAD_SUS4) {
            _TRIAD_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_SUS4, DiatonicPattern.SUS4);
        }
        return _TRIAD_SUS4;
    }
    static get TRIAD_SUS2(): DiatonicAltPattern {
        if (!_TRIAD_SUS2) {
            _TRIAD_SUS2 = DiatonicAltPattern.TRIAD_SUS4.withInv();
        }
        return _TRIAD_SUS2;
    }
    static get TRIAD_QUARTAL(): DiatonicAltPattern {
        if (!_TRIAD_QUARTAL) {
            _TRIAD_QUARTAL = DiatonicAltPattern.TRIAD_SUS2.withInv();
        }
        return _TRIAD_QUARTAL;
    }
    static get SEVENTH(): DiatonicAltPattern {
        if (!_SEVENTH) {
            _SEVENTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH, DiatonicPattern.SEVENTH);
            calculateInversionsAndFreeze(_SEVENTH);
        }
        return _SEVENTH;
    }
    static get SEVENTH_b5(): DiatonicAltPattern {
        if (!_SEVENTH_b5) {
            _SEVENTH_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_b5, DiatonicPattern.SEVENTH);
            calculateInversionsAndFreeze(_SEVENTH_b5);
        }
        return _SEVENTH_b5;
    }
    static get SEVENTH_MAJ7_b5(): DiatonicAltPattern {
        if (!_SEVENTH_MAJ7_b5) {
            _SEVENTH_MAJ7_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MAJ7_b5, DiatonicPattern.SEVENTH);
            calculateInversionsAndFreeze(_SEVENTH_MAJ7_b5);
        }
        return _SEVENTH_MAJ7_b5;
    }
    static get SEVENTH_a5(): DiatonicAltPattern {
        if (!_SEVENTH_a5) {
            _SEVENTH_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_a5, DiatonicPattern.SEVENTH);
            calculateInversionsAndFreeze(_SEVENTH_a5);
        }
        return _SEVENTH_a5;
    }
    static get SEVENTH_SUS4(): DiatonicAltPattern {
        if (!_SEVENTH_SUS4) {
            _SEVENTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_SUS4, DiatonicPattern.SEVENTH_SUS4);
            calculateInversionsAndFreeze(_SEVENTH_SUS4);
        }
        return _SEVENTH_SUS4;
    }
    static get SEVENTH_SUS4_b9(): DiatonicAltPattern {
        if (!_SEVENTH_SUS4_b9) {
            _SEVENTH_SUS4_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_SUS4_b9, DiatonicPattern.NINTH_SUS4);
            calculateInversionsAndFreeze(_SEVENTH_SUS4_b9);
        }
        return _SEVENTH_SUS4_b9;
    }
    static get SEVENTH_MINOR(): DiatonicAltPattern {
        initialize_SEVENTH_MINOR_IfNeeded();
        return _SEVENTH_MINOR;
    }
    static get SEVENTH_MINOR_b5(): DiatonicAltPattern {
        initialize_SEVENTH_MINOR_b5_IfNeeded();
        return _SEVENTH_MINOR_b5;
    }
    static get SEVENTH_MINOR_a5(): DiatonicAltPattern {
        initialize_SEVENTH_MINOR_a5_IfNeeded();
        return _SEVENTH_MINOR_a5;
    }
    static get SIXTH(): DiatonicAltPattern {
        initialize_SEVENTH_MINOR_IfNeeded();
        return _SIXTH;
    }
    static get SIXTH_MINOR(): DiatonicAltPattern {
        initialize_SEVENTH_MINOR_b5_IfNeeded();
        return _SIXTH_MINOR;
    }
    static get SIXTH_SUS4(): DiatonicAltPattern {
        initialize_SEVENTH_MINOR_a5_IfNeeded();
        return _SIXTH_SUS4;
    }
    static get SEVENTH_MAJ7(): DiatonicAltPattern {
        if (!_SEVENTH_MAJ7) {
            _SEVENTH_MAJ7 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MAJ7, DiatonicPattern.SEVENTH);
            calculateInversionsAndFreeze(_SEVENTH_MAJ7);
        }
        return _SEVENTH_MAJ7;
    }
    static get SEVENTH_MINOR_MAJ7(): DiatonicAltPattern {
        if (!_SEVENTH_MINOR_MAJ7) {
            _SEVENTH_MINOR_MAJ7 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_MAJ7, DiatonicPattern.SEVENTH);
            calculateInversionsAndFreeze(_SEVENTH_MINOR_MAJ7);
        }
        return _SEVENTH_MINOR_MAJ7;
    }
    static get SIXTH_ADD9(): DiatonicAltPattern {
        if (!_SIXTH_ADD9) {
            _SIXTH_ADD9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_ADD9, DiatonicPattern.SIXTH_ADD9);
            calculateInversionsAndFreeze(_SIXTH_ADD9);
        }
        return _SIXTH_ADD9;
    }
    static get SIXTH_MINOR_ADD9(): DiatonicAltPattern {
        if (!_SIXTH_MINOR_ADD9) {
            _SIXTH_MINOR_ADD9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_MINOR_ADD9, DiatonicPattern.SIXTH_ADD9);
            calculateInversionsAndFreeze(_SIXTH_MINOR_ADD9);
        }
        return _SIXTH_MINOR_ADD9;
    }
    static get SEVENTH_b9(): DiatonicAltPattern {
        if (!_SEVENTH_b9) {
            _SEVENTH_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_b9, DiatonicPattern.NINTH);
            calculateInversionsAndFreeze(_SEVENTH_b9);
        }
        return _SEVENTH_b9;
    }
    static get SEVENTH_a9(): DiatonicAltPattern {
        if (!_SEVENTH_a9) {
            _SEVENTH_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_a9, DiatonicPattern.NINTH);
            calculateInversionsAndFreeze(_SEVENTH_a9);
        }
        return _SEVENTH_a9;
    }
    static get SEVENTH_MINOR_b9(): DiatonicAltPattern {
        initialize_SEVENTH_MINOR_b9_ifNeeded();
        return _SEVENTH_MINOR_b9;
    }
    static get SEVENTH_ADD11(): DiatonicAltPattern {
        if (!_SEVENTH_ADD11) {
            _SEVENTH_ADD11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_ADD11, DiatonicPattern.SEVENTH_ADD11);
            calculateInversionsAndFreeze(_SEVENTH_ADD11);
        }
        return _SEVENTH_ADD11;
    }
    static get SEVENTH_ADD13(): DiatonicAltPattern {
        initialize_SEVENTH_MINOR_b9_ifNeeded();
        return _SEVENTH_ADD13;
    }
    static get NINTH(): DiatonicAltPattern {
        if (!_NINTH) {
            _NINTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH, DiatonicPattern.NINTH);
            calculateInversionsAndFreeze(_NINTH);
        }
        return _NINTH;
    }
    static get NINTH_MINOR(): DiatonicAltPattern {
        if (!_NINTH_MINOR) {
            _NINTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MINOR, DiatonicPattern.NINTH);
            calculateInversionsAndFreeze(_NINTH_MINOR);
        }
        return _NINTH_MINOR;
    }
    static get NINTH_b5(): DiatonicAltPattern {
        if (!_NINTH_b5) {
            _NINTH_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_b5, DiatonicPattern.NINTH);
            calculateInversionsAndFreeze(_NINTH_b5);
        }
        return _NINTH_b5;
    }
    static get NINTH_a5(): DiatonicAltPattern {
        if (!_NINTH_a5) {
            _NINTH_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_a5, DiatonicPattern.NINTH);
            calculateInversionsAndFreeze(_NINTH_a5);
        }
        return _NINTH_a5;
    }
    static get NINTH_SUS4(): DiatonicAltPattern {
        if (!_NINTH_SUS4) {
            _NINTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_SUS4, DiatonicPattern.NINTH_SUS4);
            calculateInversionsAndFreeze(_NINTH_SUS4);
        }
        return _NINTH_SUS4;
    }
    static get NINTH_MAJ9(): DiatonicAltPattern {
        if (!_NINTH_MAJ9) {
            _NINTH_MAJ9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MAJ9, DiatonicPattern.NINTH);
            calculateInversionsAndFreeze(_NINTH_MAJ9);
        }
        return _NINTH_MAJ9;
    }
    static get NINTH_MINOR_MAJ9(): DiatonicAltPattern {
        if (!_NINTH_MINOR_MAJ9) {
            _NINTH_MINOR_MAJ9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MINOR_MAJ9, DiatonicPattern.NINTH);
            calculateInversionsAndFreeze(_NINTH_MINOR_MAJ9);
        }
        return _NINTH_MINOR_MAJ9;
    }
    static get NINTH_ADD6(): DiatonicAltPattern {
        if (!_NINTH_ADD6) {
            _NINTH_ADD6 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_ADD6, DiatonicPattern.NINTH_ADD6);
            calculateInversionsAndFreeze(_NINTH_ADD6);
        }
        return _NINTH_ADD6;
    }
    static get NINTH_a11(): DiatonicAltPattern {
        if (!_NINTH_a11) {
            _NINTH_a11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_a11, DiatonicPattern.ELEVENTH);
            calculateInversionsAndFreeze(_NINTH_a11);
        }
        return _NINTH_a11;
    }
    static get NINTH_MAJ9_a11(): DiatonicAltPattern {
        if (!_NINTH_MAJ9_a11) {
            _NINTH_MAJ9_a11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MAJ9_a11, DiatonicPattern.ELEVENTH);
            calculateInversionsAndFreeze(_NINTH_MAJ9_a11);
        }
        return _NINTH_MAJ9_a11;
    }
    static get ELEVENTH(): DiatonicAltPattern {
        if (!_ELEVENTH) {
            _ELEVENTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH, DiatonicPattern.ELEVENTH);
            calculateInversionsAndFreeze(_ELEVENTH);
        }
        return _ELEVENTH;
    }
    static get ELEVENTH_MINOR(): DiatonicAltPattern {
        if (!_ELEVENTH_MINOR) {
            _ELEVENTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_MINOR, DiatonicPattern.ELEVENTH);
            calculateInversionsAndFreeze(_ELEVENTH_MINOR);
        }
        return _ELEVENTH_MINOR;
    }
    static get ELEVENTH_b9(): DiatonicAltPattern {
        if (!_ELEVENTH_b9) {
            _ELEVENTH_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_b9, DiatonicPattern.ELEVENTH);
            calculateInversionsAndFreeze(_ELEVENTH_b9);
        }
        return _ELEVENTH_b9;
    }
    static get ELEVENTH_a9(): DiatonicAltPattern {
        if (!_ELEVENTH_a9) {
            _ELEVENTH_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_a9, DiatonicPattern.ELEVENTH);
            calculateInversionsAndFreeze(_ELEVENTH_a9);
        }
        return _ELEVENTH_a9;
    }
    static get ELEVENTH_MAJ11(): DiatonicAltPattern {
        if (!_ELEVENTH_MAJ11) {
            _ELEVENTH_MAJ11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_MAJ11, DiatonicPattern.ELEVENTH);
            calculateInversionsAndFreeze(_ELEVENTH_MAJ11);
        }
        return _ELEVENTH_MAJ11;
    }
    static get ELEVENTH_MINOR_MAJ11(): DiatonicAltPattern {
        if (!_ELEVENTH_MINOR_MAJ11) {
            _ELEVENTH_MINOR_MAJ11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_MINOR_MAJ11, DiatonicPattern.ELEVENTH);
            calculateInversionsAndFreeze(_ELEVENTH_MINOR_MAJ11);
        }
        return _ELEVENTH_MINOR_MAJ11;
    }
    static get THIRTEENTH_MINOR(): DiatonicAltPattern {
        initialize_THIRTEENTH_MAJ13_IfNeeded();
        return _THIRTEENTH_MINOR;
    }
    static get THIRTEENTH_SUS4(): DiatonicAltPattern {
        if (!_THIRTEENTH_SUS4) {
            _THIRTEENTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_SUS4, DiatonicPattern.THIRTEENTH_SUS4);
            calculateInversionsAndFreeze(_THIRTEENTH_SUS4);
        }
        return _THIRTEENTH_SUS4;
    }
    static get THIRTEENTH_b5(): DiatonicAltPattern {
        if (!_THIRTEENTH_b5) {
            _THIRTEENTH_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b5, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_b5);
        }
        return _THIRTEENTH_b5;
    }
    static get THIRTEENTH_a5(): DiatonicAltPattern {
        initialize_THIRTEENTH_a5_IfNeeded();
        return _THIRTEENTH_a5;
    }
    static get THIRTEENTH_b9(): DiatonicAltPattern {
        if (!_THIRTEENTH_b9) {
            _THIRTEENTH_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b9, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_b9);
        }
        return _THIRTEENTH_b9;
    }
    static get THIRTEENTH_a9(): DiatonicAltPattern {
        if (!_THIRTEENTH_a9) {
            _THIRTEENTH_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a9, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_a9);
        }
        return _THIRTEENTH_a9;
    }
    static get THIRTEENTH_b5b9(): DiatonicAltPattern {
        initialize_THIRTEENTH_MAJ13_a5a9_IfNeeded();
        return _THIRTEENTH_b5b9;
    }
    static get THIRTEENTH_b5a9(): DiatonicAltPattern {
        if (!_THIRTEENTH_b5a9) {
            _THIRTEENTH_b5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b5a9, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_b5a9);
        }
        return _THIRTEENTH_b5a9;
    }
    static get THIRTEENTH_a5b9(): DiatonicAltPattern {
        if (!_THIRTEENTH_a5b9) {
            _THIRTEENTH_a5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a5b9, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_a5b9);
        }
        return _THIRTEENTH_a5b9;
    }
    static get THIRTEENTH_a5a9(): DiatonicAltPattern {
        if (!_THIRTEENTH_a5a9) {
            _THIRTEENTH_a5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a5a9, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_a5a9);
        }
        return _THIRTEENTH_a5a9;
    }
    static get THIRTEENTH_MAJ13(): DiatonicAltPattern {
        initialize_THIRTEENTH_MAJ13_IfNeeded();
        return _THIRTEENTH_MAJ13;
    }
    static get THIRTEENTH_MINOR_MAJ13(): DiatonicAltPattern {
        if (!_THIRTEENTH_MINOR_MAJ13) {
            _THIRTEENTH_MINOR_MAJ13 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MINOR_MAJ13, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_MINOR_MAJ13);
        }
        return _THIRTEENTH_MINOR_MAJ13;
    }
    static get THIRTEENTH_MAJ13_b5(): DiatonicAltPattern {
        if (!_THIRTEENTH_MAJ13_b5) {
            _THIRTEENTH_MAJ13_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b5, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_MAJ13_b5);
        }
        return _THIRTEENTH_MAJ13_b5;
    }
    static get THIRTEENTH_MAJ13_a5(): DiatonicAltPattern {
        if (!_THIRTEENTH_MAJ13_a5) {
            _THIRTEENTH_MAJ13_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a5, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_MAJ13_a5);
        }
        return _THIRTEENTH_MAJ13_a5;
    }
    static get THIRTEENTH_MAJ13_b9(): DiatonicAltPattern {
        if (!_THIRTEENTH_MAJ13_a5) {
            _THIRTEENTH_MAJ13_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b9, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_MAJ13_a5);
        }
        return _THIRTEENTH_MAJ13_a5;
    }
    static get THIRTEENTH_MAJ13_a9(): DiatonicAltPattern {
        initialize_THIRTEENTH_a5_IfNeeded();
        return _THIRTEENTH_MAJ13_a9;
    }
    static get THIRTEENTH_MAJ13_b5b9(): DiatonicAltPattern {
        if (!_THIRTEENTH_MAJ13_b5b9) {
            _THIRTEENTH_MAJ13_b5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b5b9, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_MAJ13_b5b9);
        }
        return _THIRTEENTH_MAJ13_b5b9;
    }
    static get THIRTEENTH_MAJ13_b5a9(): DiatonicAltPattern {
        if (!_THIRTEENTH_MAJ13_b5a9) {
            _THIRTEENTH_MAJ13_b5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b5a9, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_MAJ13_b5a9);
        }
        return _THIRTEENTH_MAJ13_b5a9;
    }
    static get THIRTEENTH_MAJ13_a5b9(): DiatonicAltPattern {
        if (!_THIRTEENTH_MAJ13_a5b9) {
            _THIRTEENTH_MAJ13_a5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a5b9, DiatonicPattern.THIRTEENTH);
            calculateInversionsAndFreeze(_THIRTEENTH_MAJ13_a5b9);
        }
        return _THIRTEENTH_MAJ13_a5b9;
    }
    static get THIRTEENTH_MAJ13_a5a9(): DiatonicAltPattern {
        initialize_THIRTEENTH_MAJ13_a5a9_IfNeeded();
        return _THIRTEENTH_MAJ13_a5a9;
    }

    static all(): DiatonicAltPattern[] {
        return [
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
        ];
    }
}

function calculateInversionsAndFreeze(pattern: DiatonicAltPattern) {
    for (let n = 1; n < pattern.length; n++) {
        const patternInv = (<any>pattern.withInv(n));
        if (Object.isFrozen(patternInv))
            throw new Error(JSON.stringify(patternInv));
        patternInv._rootIndex = pattern.length - n;
        Object.freeze(patternInv);
    }
    Object.freeze(pattern);
}

let _POWER_CHORD: DiatonicAltPattern;
let _TRIAD_MAJOR: DiatonicAltPattern;
let _TRIAD_MINOR: DiatonicAltPattern;
let _TRIAD_DIMINISHED: DiatonicAltPattern;
let _TRIAD_AUGMENTED: DiatonicAltPattern;
let _TRIAD_SUS4: DiatonicAltPattern;
let _TRIAD_SUS2: DiatonicAltPattern;
let _TRIAD_QUARTAL: DiatonicAltPattern;
let _SEVENTH: DiatonicAltPattern;
let _SEVENTH_b5: DiatonicAltPattern;
let _SEVENTH_MAJ7_b5: DiatonicAltPattern;
let _SEVENTH_a5: DiatonicAltPattern;
let _SEVENTH_SUS4: DiatonicAltPattern;
let _SEVENTH_SUS4_b9: DiatonicAltPattern;
let _SEVENTH_MINOR: DiatonicAltPattern;
let _SEVENTH_MINOR_b5: DiatonicAltPattern;
let _SEVENTH_MINOR_a5: DiatonicAltPattern;
let _SIXTH: DiatonicAltPattern;
let _SIXTH_MINOR: DiatonicAltPattern;
let _SIXTH_SUS4: DiatonicAltPattern;
let _SEVENTH_MAJ7: DiatonicAltPattern;
let _SEVENTH_MINOR_MAJ7: DiatonicAltPattern;
let _SIXTH_ADD9: DiatonicAltPattern;
let _SIXTH_MINOR_ADD9: DiatonicAltPattern;
let _SEVENTH_b9: DiatonicAltPattern;
let _SEVENTH_a9: DiatonicAltPattern;
let _SEVENTH_MINOR_b9: DiatonicAltPattern;
let _SEVENTH_ADD11: DiatonicAltPattern;
let _SEVENTH_ADD13: DiatonicAltPattern;
let _NINTH: DiatonicAltPattern;
let _NINTH_MINOR: DiatonicAltPattern;
let _NINTH_b5: DiatonicAltPattern;
let _NINTH_a5: DiatonicAltPattern;
let _NINTH_SUS4: DiatonicAltPattern;
let _NINTH_MAJ9: DiatonicAltPattern;
let _NINTH_MINOR_MAJ9: DiatonicAltPattern;
let _NINTH_ADD6: DiatonicAltPattern;
let _NINTH_a11: DiatonicAltPattern;
let _NINTH_MAJ9_a11: DiatonicAltPattern;
let _ELEVENTH: DiatonicAltPattern;
let _ELEVENTH_MINOR: DiatonicAltPattern;
let _ELEVENTH_b9: DiatonicAltPattern;
let _ELEVENTH_a9: DiatonicAltPattern;
let _ELEVENTH_MAJ11: DiatonicAltPattern;
let _ELEVENTH_MINOR_MAJ11: DiatonicAltPattern;
let _THIRTEENTH_MINOR: DiatonicAltPattern;
let _THIRTEENTH_SUS4: DiatonicAltPattern;
let _THIRTEENTH_b5: DiatonicAltPattern;
let _THIRTEENTH_a5: DiatonicAltPattern;
let _THIRTEENTH_b9: DiatonicAltPattern;
let _THIRTEENTH_a9: DiatonicAltPattern;
let _THIRTEENTH_b5b9: DiatonicAltPattern;
let _THIRTEENTH_b5a9: DiatonicAltPattern;
let _THIRTEENTH_a5b9: DiatonicAltPattern;
let _THIRTEENTH_a5a9: DiatonicAltPattern;
let _THIRTEENTH_MAJ13: DiatonicAltPattern;
let _THIRTEENTH_MINOR_MAJ13: DiatonicAltPattern;
let _THIRTEENTH_MAJ13_b5: DiatonicAltPattern;
let _THIRTEENTH_MAJ13_a5: DiatonicAltPattern;
let _THIRTEENTH_MAJ13_a9: DiatonicAltPattern;
let _THIRTEENTH_MAJ13_b5b9: DiatonicAltPattern;
let _THIRTEENTH_MAJ13_b5a9: DiatonicAltPattern;
let _THIRTEENTH_MAJ13_a5b9: DiatonicAltPattern;
let _THIRTEENTH_MAJ13_a5a9: DiatonicAltPattern;
let _ALT: DiatonicAltPattern;

function initialize_SEVENTH_MINOR_IfNeeded() {
    if (!_SEVENTH_MINOR) {
        _SEVENTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR, DiatonicPattern.SEVENTH);
        Object.freeze(_SEVENTH_MINOR);

        _SIXTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH, DiatonicPattern.SIXTH);
        Object.freeze(_SIXTH);

        (<any>_SEVENTH_MINOR.withInv(2))._rootIndex = 2;
        Object.freeze(_SEVENTH_MINOR.withInv(2));
        (<any>_SEVENTH_MINOR.withInv(3))._rootIndex = 1;
        Object.freeze(_SEVENTH_MINOR.withInv(3));
    }
}

function initialize_SEVENTH_MINOR_b5_IfNeeded() {
    if (!_SEVENTH_MINOR_b5) {
        _SEVENTH_MINOR_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_b5, DiatonicPattern.SEVENTH);
        Object.freeze(_SEVENTH_MINOR_b5);

        _SIXTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_MINOR, DiatonicPattern.SIXTH);
        Object.freeze(_SIXTH_MINOR);

        (<any>_SEVENTH_MINOR_b5.withInv(2))._rootIndex = 2;
        Object.freeze(_SEVENTH_MINOR_b5.withInv(2));
        (<any>_SEVENTH_MINOR_b5.withInv(3))._rootIndex = 1;
        Object.freeze(_SEVENTH_MINOR_b5.withInv(3));
    }
}

function initialize_SEVENTH_MINOR_a5_IfNeeded() {
    if (!_SEVENTH_MINOR_a5) {
        _SEVENTH_MINOR_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_a5, DiatonicPattern.SEVENTH);
        Object.freeze(_SEVENTH_MINOR_a5);

        _SIXTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_SUS4, DiatonicPattern.SIXTH);
        Object.freeze(_SIXTH_SUS4);

        (<any>_SEVENTH_MINOR_a5.withInv(2))._rootIndex = 2;
        Object.freeze(_SEVENTH_MINOR_a5.withInv(2));
        (<any>_SEVENTH_MINOR_a5.withInv(3))._rootIndex = 1;
        Object.freeze(_SEVENTH_MINOR_a5.withInv(3));
    }
}

function initialize_SEVENTH_MINOR_b9_ifNeeded() {
    if (!_SEVENTH_MINOR_b9) {
        _SEVENTH_MINOR_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_b9, DiatonicPattern.NINTH);
        Object.freeze(_SEVENTH_MINOR_b9);
        (<any>_SEVENTH_MINOR_b9.withInv(2))._rootIndex = 3;
        Object.freeze(_SEVENTH_MINOR_b9.withInv(2));
        (<any>_SEVENTH_MINOR_b9.withInv(3))._rootIndex = 2;
        Object.freeze(_SEVENTH_MINOR_b9.withInv(3));
        (<any>_SEVENTH_MINOR_b9.withInv(4))._rootIndex = 1;
        Object.freeze(_SEVENTH_MINOR_b9.withInv(4));

        _SEVENTH_ADD13 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_ADD13, DiatonicPattern.SEVENTH_ADD13);
        Object.freeze(_SEVENTH_ADD13);
    }
}

function initialize_THIRTEENTH_MAJ13_IfNeeded() {
    if (!_THIRTEENTH_MAJ13) {
        _THIRTEENTH_MAJ13 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13, DiatonicPattern.THIRTEENTH);
        Object.freeze(_THIRTEENTH_MAJ13);
        (<any>_THIRTEENTH_MAJ13.withInv(1))._rootIndex = 6;
        Object.freeze(_THIRTEENTH_MAJ13.withInv(1));
        (<any>_THIRTEENTH_MAJ13.withInv(2))._rootIndex = 5;
        Object.freeze(_THIRTEENTH_MAJ13.withInv(2));
        (<any>_THIRTEENTH_MAJ13.withInv(3))._rootIndex = 4;
        Object.freeze(_THIRTEENTH_MAJ13.withInv(3));

        _THIRTEENTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MINOR, DiatonicPattern.THIRTEENTH);
        Object.freeze(_THIRTEENTH_MINOR);

        (<any>_THIRTEENTH_MAJ13.withInv(5))._rootIndex = 2;
        Object.freeze(_THIRTEENTH_MAJ13.withInv(5));
        (<any>_THIRTEENTH_MAJ13.withInv(6))._rootIndex = 1;
        Object.freeze(_THIRTEENTH_MAJ13.withInv(6));
    }
}

function initialize_THIRTEENTH_a5_IfNeeded() {
    if (!_THIRTEENTH_a5) {
        _THIRTEENTH_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a5, DiatonicPattern.THIRTEENTH);
        Object.freeze(_THIRTEENTH_a5);
        (<any>_THIRTEENTH_a5.withInv(1))._rootIndex = 6;
        Object.freeze(_THIRTEENTH_a5.withInv(1));
        (<any>_THIRTEENTH_a5.withInv(2))._rootIndex = 5;
        Object.freeze(_THIRTEENTH_a5.withInv(2));
        (<any>_THIRTEENTH_a5.withInv(3))._rootIndex = 4;
        Object.freeze(_THIRTEENTH_a5.withInv(3));
        (<any>_THIRTEENTH_a5.withInv(4))._rootIndex = 3;
        Object.freeze(_THIRTEENTH_a5.withInv(4));

        _THIRTEENTH_MAJ13_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a9, DiatonicPattern.THIRTEENTH);
        Object.freeze(_THIRTEENTH_MAJ13_a9);

        (<any>_THIRTEENTH_a5.withInv(6))._rootIndex = 1;
        Object.freeze(_THIRTEENTH_a5.withInv(6));
    }
}

function initialize_THIRTEENTH_MAJ13_a5a9_IfNeeded() {
    if (!_THIRTEENTH_MAJ13_a5a9) {
        _THIRTEENTH_MAJ13_a5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a5a9, DiatonicPattern.THIRTEENTH);

        Object.freeze(_THIRTEENTH_MAJ13_a5a9);
        (<any>_THIRTEENTH_MAJ13_a5a9.withInv(1))._rootIndex = 6;
        Object.freeze(_THIRTEENTH_MAJ13_a5a9.withInv(1));
        (<any>_THIRTEENTH_MAJ13_a5a9.withInv(2))._rootIndex = 5;
        Object.freeze(_THIRTEENTH_MAJ13_a5a9.withInv(2));

        _THIRTEENTH_b5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b5b9, DiatonicPattern.THIRTEENTH);
        Object.freeze(_THIRTEENTH_b5b9);

        (<any>_THIRTEENTH_MAJ13_a5a9.withInv(4))._rootIndex = 3;
        Object.freeze(_THIRTEENTH_MAJ13_a5a9.withInv(4));
        (<any>_THIRTEENTH_MAJ13_a5a9.withInv(5))._rootIndex = 2;
        Object.freeze(_THIRTEENTH_MAJ13_a5a9.withInv(5));
        (<any>_THIRTEENTH_MAJ13_a5a9.withInv(6))._rootIndex = 1;
        Object.freeze(_THIRTEENTH_MAJ13_a5a9.withInv(6));
    }
}