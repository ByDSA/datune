import { PrecalcCache } from '../common/PrecalcCache';
import { MathUtils } from '../common/MathUtils';
import { Chromatic } from '../degrees/Chromatic';
import { Diatonic } from '../degrees/Diatonic';
import { DiatonicAltDegree } from '../degrees/degrees/DiatonicAltDegree';
import { IntervalDiatonic } from '../interval/IntervalDiatonic';
import { IntervalDiatonicAlt } from '../interval/IntervalDiatonicAlt';
import { NamingScale } from '../lang/naming/NamingScale';
import { ChromaticPattern } from '../patterns/ChromaticPattern';
import { Settings } from '../settings/Settings';
import { ScaleAbstract } from './ScaleAbstract';

type I = number;
type D = number;
type HashingObject = I[];
export class ScaleChromatic extends ScaleAbstract<I, D> {
    static MAJOR: ScaleChromatic;
    static DORIAN: ScaleChromatic;
    static PHRYGIAN: ScaleChromatic;
    static LYDIAN: ScaleChromatic;
    static MIXOLYDIAN: ScaleChromatic;
    static MINOR: ScaleChromatic;
    static LOCRIAN: ScaleChromatic;

    static HARMONIC_MINOR: ScaleChromatic;
    static LOCRIAN_a6: ScaleChromatic;
    static IONIAN_a5: ScaleChromatic;
    static DORIAN_a4: ScaleChromatic;
    static MIXOLYDIAN_b9_b13: ScaleChromatic;
    static LYDIAN_a2: ScaleChromatic;
    static SUPERLOCRIAN_bb7: ScaleChromatic;

    static HARMONIC_MAJOR: ScaleChromatic;
    static DORIAN_b5: ScaleChromatic;
    static PHRYGIAN_b4: ScaleChromatic;
    static LYDIAN_b3: ScaleChromatic;
    static MIXOLYDIAN_b2: ScaleChromatic;
    static AEOLIAN_b1: ScaleChromatic;
    static LOCRIAN_bb7: ScaleChromatic;

    static MELODIC_MINOR: ScaleChromatic;
    static DORIAN_b2: ScaleChromatic;
    static LYDIAN_a5: ScaleChromatic;
    static LYDIAN_b7: ScaleChromatic;
    static MIXOLYDIAN_b13: ScaleChromatic;
    static LOCRIAN_a2: ScaleChromatic;
    static SUPERLOCRIAN: ScaleChromatic;

    static DOUBLE_HARMONIC: ScaleChromatic;
    static LYDIAN_a2_a6: ScaleChromatic;
    static ULTRAPHRYGIAN: ScaleChromatic;
    static HUNGARIAN_MINOR: ScaleChromatic;
    static ORIENTAL: ScaleChromatic;
    static IONIAN_AUGMENTED_a2: ScaleChromatic;
    static LOCRIAN_bb3_bb7: ScaleChromatic;

    static NEAPOLITAN_MINOR: ScaleChromatic;
    static NEAPOLITAN_MAJOR: ScaleChromatic;

    static HALF_DIMINISHED: ScaleChromatic;
    static MESSIAEN_V_TRUNCATED: ScaleChromatic;
    static MESSIAEN_INV_III_V_TRUNCATED_n2: ScaleChromatic;
    static MESSIAEN_V: ScaleChromatic;
    static RAGA_INDRUPRIYA_INDIA: ScaleChromatic;
    static MESSIAEN_II_TRUNCATED_n3: ScaleChromatic;
    static MESSIAEN_III_INV: ScaleChromatic;
    static MESSIAEN_IV: ScaleChromatic;
    static MESSIAEN_VI: ScaleChromatic;
    static MESSIAEN_VII: ScaleChromatic;

    static BLUES_b5: ScaleChromatic;
    static BLUES_a4: ScaleChromatic;

    // 5
    static PENTATONIC_MINOR: ScaleChromatic;
    static PENTATONIC: ScaleChromatic;
    static EGYPCIAN: ScaleChromatic;
    static BLUES_MINOR: ScaleChromatic;
    static BLUES_MAJOR: ScaleChromatic;

    // Symmetric
    static CHROMATIC: ScaleChromatic;
    static WHOLE_TONE: ScaleChromatic;
    static AUGMENTED_TRIAD: ScaleChromatic;
    static DIMINISHED_7th: ScaleChromatic;
    static DOM7b5: ScaleChromatic;

    // Bebop
    static BEBOP_MAJOR: ScaleChromatic;
    static BEBOP_DORIAN: ScaleChromatic;
    static BEBOP_DOMINANT: ScaleChromatic;
    static BEBOP_MELODIC_MINOR: ScaleChromatic;
    static BEBOP_HARMONIC_MINOR: ScaleChromatic;

    static sets = (class {
        static allDiatonicScales: () => ScaleChromatic[];

        static allHeptatonicScales: () => ScaleChromatic[];

        static allBebopScales: () => ScaleChromatic[];

        static allPentatonicScales: () => ScaleChromatic[];

        static allHexatonicScales: () => ScaleChromatic[];

        static all: () => ScaleChromatic[];

        static symmetricScales: () => ScaleChromatic[];
    });

    private static immutablesCache = new PrecalcCache<ScaleChromatic, HashingObject>(
        function (hashingObject: HashingObject): string {
            let ret = "";
            for (const interval of hashingObject)
                ret += interval + "-";
            return ret;
        },
        function (scale: ScaleChromatic): HashingObject {
            return scale.intraIntervals;
        },
        function (hashingObject: HashingObject): ScaleChromatic {
            return new ScaleChromatic(...hashingObject);
        }
    );

    private constructor(...intervals: I[]) {
        super(...intervals);
    }

    public static fromIntraIntervals(...intraIntervals: I[]): ScaleChromatic {
        return ScaleChromatic.immutablesCache.getOrCreate(intraIntervals);
    }

    public static fromRootIntervals(...rootIntervals: I[]): ScaleChromatic {
        let intraIntervals: number[] = [];
        for (let i = 1; i < rootIntervals.length; i++) {
            let intraIntervals_i = rootIntervals[i] - rootIntervals[i - 1];
            intraIntervals.push(intraIntervals_i);
        }

        intraIntervals.push(12 - rootIntervals[rootIntervals.length - 1])

        return this.fromIntraIntervals(...intraIntervals);
    }

    getMode(n: number): ScaleChromatic {
        let intraIntervals = this.getModeIntraIntervals(n);
        return ScaleChromatic.fromIntraIntervals(...intraIntervals);
    }

    public static fromString(strValue: string): ScaleChromatic {
        let srtValueInput = strValue;
        strValue = this.normalizeInputString(strValue);

        let scale: ScaleChromatic;

        scale = this.fromStringName(strValue);
        if (scale)
            return scale;

        scale = this.fromStringCode(srtValueInput);
        if (scale)
            return scale;

        throw new Error("Impossible get ScaleChromatic from string: " + srtValueInput);
    }

    public static fromStringCode(strValue: string): ScaleChromatic {
        let splitedStr: string[] = this.splitArray(strValue);
        if (!splitedStr)
            return null;

        let splitedNumbers: number[] = splitedStr.map(str => +str);
        splitedNumbers = splitedNumbers.filter(el => !isNaN(el));

        if (splitedNumbers.length == 0)
            return null;

        return ScaleChromatic.fromIntraIntervals(...splitedNumbers);
    }

    private static splitArray(str: string): string[] {
        let splited: string[] = str.split(/\s|,|-|:/);

        splited = splited.filter(el => el != null && el != "");

        if (splited.length > 1)
            return splited;

        return null;
    }

    private static fromStringName(str: string): ScaleChromatic {
        switch (str) {
            case "": return ScaleChromatic.MAJOR;
            case "m": return ScaleChromatic.MINOR;

            case ScaleChromatic.MAJOR.toString().toLowerCase(): return ScaleChromatic.MAJOR;
            case ScaleChromatic.MINOR.toString().toLowerCase(): return ScaleChromatic.MINOR;
            case ScaleChromatic.DORIAN.toString().toLowerCase(): return ScaleChromatic.DORIAN;
            case ScaleChromatic.PHRYGIAN.toString().toLowerCase(): return ScaleChromatic.PHRYGIAN;
            case ScaleChromatic.LYDIAN.toString().toLowerCase(): return ScaleChromatic.LYDIAN;
            case ScaleChromatic.MIXOLYDIAN.toString().toLowerCase(): return ScaleChromatic.MIXOLYDIAN;
            case ScaleChromatic.LOCRIAN.toString().toLowerCase(): return ScaleChromatic.LOCRIAN;

            default:
                for (let scale of ScaleChromatic.sets.all()) {
                    if (str == this.normalizeInputString(scale.toString()))
                        return scale;
                }
        }

        return null;
    }

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '')
            .replace(/#/g, Settings.symbols.sharp)
            .replace(/(b)([0-9])/g, Settings.symbols.bemol + "$2")
            .toLowerCase();

        while (strValue.match("b" + Settings.symbols.bemol)) {
            strValue = strValue.replace("b" + Settings.symbols.bemol, Settings.symbols.bemol + Settings.symbols.bemol);
        }

        return strValue;
    }

    private static degrees2Intervals(degrees: DiatonicAltDegree[]): IntervalDiatonicAlt[] {
        let intervals: IntervalDiatonicAlt[] = [];
        for (let i = 1; i <= degrees.length; i++) {
            let degree = degrees[i % degrees.length];
            let prevDegree = degrees[i - 1];
            let distDiatonicInt = degree.diatonicDegree.intValue - prevDegree.diatonicDegree.intValue;
            distDiatonicInt = MathUtils.rotativeTrim(distDiatonicInt, Diatonic.NUMBER);
            let distChromaticInt = degree.semis - prevDegree.semis;
            distChromaticInt = MathUtils.rotativeTrim(distChromaticInt, Chromatic.NUMBER);
            let intervalDiatonic = IntervalDiatonic.from(distDiatonicInt);
            let interval = IntervalDiatonicAlt.fromIntervals(distChromaticInt, intervalDiatonic);
            intervals.push(interval);
        }

        return intervals;
    }

    get pattern(): ChromaticPattern {
        return ChromaticPattern.fromRootIntervals(...this.intraIntervals);
    }

    protected calculateDegrees() {
        this._precalcDegrees = [];
        if (this._intraIntervals.length == 0) {
            return;
        }
        let acc = 0;
        this._precalcDegrees.push(acc);
        for (let i = 0; i < this._intraIntervals.length - 1; i++) {
            acc += this._intraIntervals[i];
            this._precalcDegrees.push(acc);
        }
        Object.freeze(this._precalcDegrees);
    }

    get modes(): ScaleChromatic[] {
        return <ScaleChromatic[]>super.modes;
    }

    // General

    public toString(): string {
        return NamingScale.toString(this);
    }

    hashCode(): string {
        let ret = "";
        for (const interval of this._intraIntervals)
            ret += interval + "-";

        return ret;
    }

    private static initialize() {
        ScaleChromatic.MAJOR = ScaleChromatic.fromIntraIntervals(2, 2, 1, 2, 2, 2, 1);

        ScaleChromatic.DORIAN = ScaleChromatic.MAJOR.getMode(2);
        ScaleChromatic.PHRYGIAN = ScaleChromatic.MAJOR.getMode(3);
        ScaleChromatic.LYDIAN = ScaleChromatic.MAJOR.getMode(4);
        ScaleChromatic.MIXOLYDIAN = ScaleChromatic.MAJOR.getMode(5);
        ScaleChromatic.MINOR = ScaleChromatic.MAJOR.getMode(6);
        ScaleChromatic.LOCRIAN = ScaleChromatic.MAJOR.getMode(7);

        ScaleChromatic.HARMONIC_MINOR = ScaleChromatic.fromIntraIntervals(2, 1, 2, 2, 1, 3, 1);
        ScaleChromatic.LOCRIAN_a6 = ScaleChromatic.HARMONIC_MINOR.getMode(2);
        ScaleChromatic.IONIAN_a5 = ScaleChromatic.HARMONIC_MINOR.getMode(3);
        ScaleChromatic.DORIAN_a4 = ScaleChromatic.HARMONIC_MINOR.getMode(4);
        ScaleChromatic.MIXOLYDIAN_b9_b13 = ScaleChromatic.HARMONIC_MINOR.getMode(5);
        ScaleChromatic.LYDIAN_a2 = ScaleChromatic.HARMONIC_MINOR.getMode(6);
        ScaleChromatic.SUPERLOCRIAN_bb7 = ScaleChromatic.HARMONIC_MINOR.getMode(7);

        ScaleChromatic.HARMONIC_MAJOR = ScaleChromatic.fromIntraIntervals(2, 2, 1, 2, 1, 3, 1);
        ScaleChromatic.DORIAN_b5 = ScaleChromatic.HARMONIC_MAJOR.getMode(2);
        ScaleChromatic.PHRYGIAN_b4 = ScaleChromatic.HARMONIC_MAJOR.getMode(3);
        ScaleChromatic.LYDIAN_b3 = ScaleChromatic.HARMONIC_MAJOR.getMode(4);
        ScaleChromatic.MIXOLYDIAN_b2 = ScaleChromatic.HARMONIC_MAJOR.getMode(5);
        ScaleChromatic.AEOLIAN_b1 = ScaleChromatic.HARMONIC_MAJOR.getMode(6);
        ScaleChromatic.LOCRIAN_bb7 = ScaleChromatic.HARMONIC_MAJOR.getMode(7);

        ScaleChromatic.MELODIC_MINOR = ScaleChromatic.fromIntraIntervals(2, 1, 2, 2, 2, 2, 1);
        ScaleChromatic.DORIAN_b2 = ScaleChromatic.MELODIC_MINOR.getMode(2);
        ScaleChromatic.LYDIAN_a5 = ScaleChromatic.MELODIC_MINOR.getMode(3);
        ScaleChromatic.LYDIAN_b7 = ScaleChromatic.MELODIC_MINOR.getMode(4);
        ScaleChromatic.MIXOLYDIAN_b13 = ScaleChromatic.MELODIC_MINOR.getMode(5);
        ScaleChromatic.LOCRIAN_a2 = ScaleChromatic.MELODIC_MINOR.getMode(6);
        ScaleChromatic.SUPERLOCRIAN = ScaleChromatic.MELODIC_MINOR.getMode(7);

        ScaleChromatic.DOUBLE_HARMONIC = ScaleChromatic.fromIntraIntervals(1, 3, 1, 2, 1, 3, 1);
        ScaleChromatic.LYDIAN_a2_a6 = ScaleChromatic.DOUBLE_HARMONIC.getMode(2);
        ScaleChromatic.ULTRAPHRYGIAN = ScaleChromatic.DOUBLE_HARMONIC.getMode(3);
        ScaleChromatic.HUNGARIAN_MINOR = ScaleChromatic.DOUBLE_HARMONIC.getMode(4);
        ScaleChromatic.ORIENTAL = ScaleChromatic.DOUBLE_HARMONIC.getMode(5);
        ScaleChromatic.IONIAN_AUGMENTED_a2 = ScaleChromatic.DOUBLE_HARMONIC.getMode(6);
        ScaleChromatic.LOCRIAN_bb3_bb7 = ScaleChromatic.DOUBLE_HARMONIC.getMode(7);

        ScaleChromatic.NEAPOLITAN_MINOR = ScaleChromatic.fromIntraIntervals(1, 2, 2, 2, 1, 3, 1);
        ScaleChromatic.NEAPOLITAN_MAJOR = ScaleChromatic.fromIntraIntervals(1, 2, 2, 2, 2, 2, 1);

        ScaleChromatic.MESSIAEN_V_TRUNCATED = ScaleChromatic.fromIntraIntervals(1, 5, 1, 5);
        ScaleChromatic.MESSIAEN_INV_III_V_TRUNCATED_n2 = ScaleChromatic.fromIntraIntervals(1, 3, 1, 3, 1, 3);
        ScaleChromatic.HALF_DIMINISHED = ScaleChromatic.fromIntraIntervals(1, 2, 1, 2, 1, 2, 1, 2);
        ScaleChromatic.MESSIAEN_V = ScaleChromatic.fromIntraIntervals(1, 1, 4, 1, 1, 4);
        ScaleChromatic.RAGA_INDRUPRIYA_INDIA = ScaleChromatic.fromIntraIntervals(1, 3, 2, 3, 1, 2);
        ScaleChromatic.MESSIAEN_II_TRUNCATED_n3 = ScaleChromatic.fromIntraIntervals(3, 1, 2, 3, 1, 2);
        ScaleChromatic.MESSIAEN_III_INV = ScaleChromatic.fromIntraIntervals(2, 1, 1, 2, 1, 1, 2, 1, 1);
        ScaleChromatic.MESSIAEN_IV = ScaleChromatic.fromIntraIntervals(1, 1, 1, 3, 1, 1, 1, 3);
        ScaleChromatic.MESSIAEN_VI = ScaleChromatic.fromIntraIntervals(1, 1, 2, 2, 1, 1, 2, 2);
        ScaleChromatic.MESSIAEN_VII = ScaleChromatic.fromIntraIntervals(1, 1, 1, 1, 2, 1, 1, 1, 1, 2);

        ScaleChromatic.BLUES_b5 = ScaleChromatic.fromIntraIntervals(3, 2, 1, 1, 3, 2);
        ScaleChromatic.BLUES_a4 = ScaleChromatic.BLUES_b5;

        // 5
        ScaleChromatic.PENTATONIC_MINOR = ScaleChromatic.fromIntraIntervals(3, 2, 2, 3, 2);
        ScaleChromatic.PENTATONIC = ScaleChromatic.PENTATONIC_MINOR.getMode(2);
        ScaleChromatic.EGYPCIAN = ScaleChromatic.PENTATONIC_MINOR.getMode(3);
        ScaleChromatic.BLUES_MINOR = ScaleChromatic.PENTATONIC_MINOR.getMode(4);
        ScaleChromatic.BLUES_MAJOR = ScaleChromatic.PENTATONIC_MINOR.getMode(5);

        // Symmetric
        ScaleChromatic.CHROMATIC = ScaleChromatic.fromIntraIntervals(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        ScaleChromatic.WHOLE_TONE = ScaleChromatic.fromIntraIntervals(2, 2, 2, 2, 2, 2);
        ScaleChromatic.AUGMENTED_TRIAD = ScaleChromatic.fromIntraIntervals(4, 4, 4);
        ScaleChromatic.DIMINISHED_7th = ScaleChromatic.fromIntraIntervals(3, 3, 3, 3);
        ScaleChromatic.DOM7b5 = ScaleChromatic.fromIntraIntervals(4, 2, 4, 2);

        // Bebop
        ScaleChromatic.BEBOP_MAJOR = ScaleChromatic.fromRootIntervals(
            ScaleChromatic.MAJOR.degrees[0],
            ScaleChromatic.MAJOR.degrees[1],
            ScaleChromatic.MAJOR.degrees[2],
            ScaleChromatic.MAJOR.degrees[3],
            ScaleChromatic.MAJOR.degrees[4],
            8,
            ScaleChromatic.MAJOR.degrees[5],
            ScaleChromatic.MAJOR.degrees[6]
        );

        ScaleChromatic.BEBOP_DORIAN = ScaleChromatic.fromRootIntervals(
            ScaleChromatic.DORIAN.degrees[0],
            ScaleChromatic.DORIAN.degrees[1],
            ScaleChromatic.DORIAN.degrees[2],
            4,
            ScaleChromatic.DORIAN.degrees[3],
            ScaleChromatic.DORIAN.degrees[4],
            ScaleChromatic.DORIAN.degrees[5],
            ScaleChromatic.DORIAN.degrees[6]
        );

        ScaleChromatic.BEBOP_DOMINANT = ScaleChromatic.fromRootIntervals(
            ScaleChromatic.MIXOLYDIAN.degrees[0],
            ScaleChromatic.MIXOLYDIAN.degrees[1],
            ScaleChromatic.MIXOLYDIAN.degrees[2],
            ScaleChromatic.MIXOLYDIAN.degrees[3],
            ScaleChromatic.MIXOLYDIAN.degrees[4],
            ScaleChromatic.MIXOLYDIAN.degrees[5],
            ScaleChromatic.MIXOLYDIAN.degrees[6],
            11,
        );

        ScaleChromatic.BEBOP_MELODIC_MINOR = ScaleChromatic.fromRootIntervals(
            ScaleChromatic.MELODIC_MINOR.degrees[0],
            ScaleChromatic.MELODIC_MINOR.degrees[1],
            ScaleChromatic.MELODIC_MINOR.degrees[2],
            ScaleChromatic.MELODIC_MINOR.degrees[3],
            ScaleChromatic.MELODIC_MINOR.degrees[4],
            8,
            ScaleChromatic.MELODIC_MINOR.degrees[5],
            ScaleChromatic.MELODIC_MINOR.degrees[6]
        );

        ScaleChromatic.BEBOP_HARMONIC_MINOR = ScaleChromatic.fromRootIntervals(
            ScaleChromatic.HARMONIC_MINOR.degrees[0],
            ScaleChromatic.HARMONIC_MINOR.degrees[1],
            ScaleChromatic.HARMONIC_MINOR.degrees[2],
            ScaleChromatic.HARMONIC_MINOR.degrees[3],
            ScaleChromatic.HARMONIC_MINOR.degrees[4],
            ScaleChromatic.HARMONIC_MINOR.degrees[5],
            10,
            ScaleChromatic.HARMONIC_MINOR.degrees[6]
        );

        ScaleChromatic.sets.allDiatonicScales = function () {
            return [
                ScaleChromatic.MAJOR,
                ScaleChromatic.DORIAN,
                ScaleChromatic.PHRYGIAN,
                ScaleChromatic.LYDIAN,
                ScaleChromatic.MIXOLYDIAN,
                ScaleChromatic.MINOR,
                ScaleChromatic.LOCRIAN
            ];
        }

        ScaleChromatic.sets.allHeptatonicScales = function () {
            return []
                .concat(ScaleChromatic.sets.allDiatonicScales())
                .concat([
                    ScaleChromatic.HARMONIC_MINOR,
                    ScaleChromatic.LOCRIAN_a6,
                    ScaleChromatic.IONIAN_a5,
                    ScaleChromatic.DORIAN_a4,
                    ScaleChromatic.MIXOLYDIAN_b9_b13,
                    ScaleChromatic.LYDIAN_a2,
                    ScaleChromatic.SUPERLOCRIAN_bb7,

                    ScaleChromatic.HARMONIC_MAJOR,
                    ScaleChromatic.DORIAN_b5,
                    ScaleChromatic.PHRYGIAN_b4,
                    ScaleChromatic.LYDIAN_b3,
                    ScaleChromatic.MIXOLYDIAN_b2,
                    ScaleChromatic.AEOLIAN_b1,
                    ScaleChromatic.LOCRIAN_bb7,

                    ScaleChromatic.MELODIC_MINOR,
                    ScaleChromatic.DORIAN_b2,
                    ScaleChromatic.LYDIAN_a5,
                    ScaleChromatic.LYDIAN_b7,
                    ScaleChromatic.MIXOLYDIAN_b13,
                    ScaleChromatic.LOCRIAN_a2,
                    ScaleChromatic.SUPERLOCRIAN,

                    ScaleChromatic.DOUBLE_HARMONIC,
                    ScaleChromatic.LYDIAN_a2_a6,
                    ScaleChromatic.ULTRAPHRYGIAN,
                    ScaleChromatic.HUNGARIAN_MINOR,
                    ScaleChromatic.ORIENTAL,
                    ScaleChromatic.IONIAN_AUGMENTED_a2,
                    ScaleChromatic.LOCRIAN_bb3_bb7,

                    ScaleChromatic.NEAPOLITAN_MINOR,
                    ScaleChromatic.NEAPOLITAN_MAJOR
                ]);
        }

        ScaleChromatic.sets.allBebopScales = function () {
            return [
                ScaleChromatic.BEBOP_MAJOR,
                ScaleChromatic.BEBOP_DORIAN,
                ScaleChromatic.BEBOP_DOMINANT,
                ScaleChromatic.BEBOP_MELODIC_MINOR,
                ScaleChromatic.BEBOP_HARMONIC_MINOR
            ];
        }

        ScaleChromatic.sets.allPentatonicScales = function () {
            return [
                ScaleChromatic.PENTATONIC_MINOR,
                ScaleChromatic.PENTATONIC,
                ScaleChromatic.EGYPCIAN,
                ScaleChromatic.BLUES_MINOR
            ];
        }

        ScaleChromatic.sets.allHexatonicScales = function () {
            return [
                ScaleChromatic.BLUES_b5,
                ScaleChromatic.BLUES_a4,
                ScaleChromatic.WHOLE_TONE
            ];
        }

        ScaleChromatic.sets.all = function (): ScaleChromatic[] {
            let ret: ScaleChromatic[];
            ret = ScaleChromatic.sets.allHeptatonicScales();
            ret = ret.concat(ScaleChromatic.sets.allPentatonicScales());
            ret = ret.concat(ScaleChromatic.sets.allHexatonicScales());
            ret = ret.concat(ScaleChromatic.sets.allBebopScales());
            ret = ret.concat(ScaleChromatic.sets.symmetricScales());

            return ret;
        }

        ScaleChromatic.sets.symmetricScales = function () {
            return [
                ScaleChromatic.CHROMATIC,
                ScaleChromatic.WHOLE_TONE,
                ScaleChromatic.AUGMENTED_TRIAD,
                ScaleChromatic.DIMINISHED_7th,
                ScaleChromatic.MESSIAEN_V_TRUNCATED,
                ScaleChromatic.DOM7b5,
                ScaleChromatic.MESSIAEN_INV_III_V_TRUNCATED_n2,
                ScaleChromatic.HALF_DIMINISHED,
                ScaleChromatic.MESSIAEN_V,
                ScaleChromatic.RAGA_INDRUPRIYA_INDIA,
                ScaleChromatic.MESSIAEN_II_TRUNCATED_n3,
                ScaleChromatic.MESSIAEN_III_INV,
                ScaleChromatic.MESSIAEN_IV,
                ScaleChromatic.MESSIAEN_VI,
                ScaleChromatic.MESSIAEN_VII
            ];
        };
    }
}