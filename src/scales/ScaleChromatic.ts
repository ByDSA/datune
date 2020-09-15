import { rotativeTrim } from '../common/MathUtils';
import { Chromatic } from '../degrees/Chromatic';
import { DiatonicAltDegree } from './degrees/DiatonicAltDegree';
import { Diatonic } from '../degrees/Diatonic';
import { IntervalDiatonic } from '../intervals/IntervalDiatonic';
import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { NamingScale } from '../lang/naming/NamingScale';
import { ChromaticPattern } from '../patterns/ChromaticPattern';
import { Settings } from '../settings/Settings';
import { ScaleAbstract } from './ScaleAbstract';
import { HashingObject, ScaleChromaticCache } from './ScaleChromaticCache';

export type I = number;
type D = number;
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

    private static _cache = new ScaleChromaticCache((hashingObject: HashingObject) => new ScaleChromatic(...hashingObject));

    private constructor(...intervals: I[]) {
        super(...intervals);
    }

    static fromIntraIntervals(...intraIntervals: I[]): ScaleChromatic {
        return ScaleChromatic._cache.getOrCreate(intraIntervals);
    }

    static fromRootIntervals(...rootIntervals: I[]): ScaleChromatic {
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

    static fromString(strValue: string): ScaleChromatic {
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

    static fromStringCode(strValue: string): ScaleChromatic {
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
            let distDiatonicInt = degree.diatonicDegree.valueOf() - prevDegree.diatonicDegree.valueOf();
            distDiatonicInt = rotativeTrim(distDiatonicInt, Diatonic.NUMBER);
            let distChromaticInt = degree.semis - prevDegree.semis;
            distChromaticInt = rotativeTrim(distChromaticInt, Chromatic.NUMBER);
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

    toString(): string {
        return NamingScale.toString(this);
    }

    hashCode(): string {
        let ret = "";
        for (const interval of this._intraIntervals)
            ret += interval + "-";

        return ret;
    }}