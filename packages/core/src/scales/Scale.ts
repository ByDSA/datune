import { HashingObjectType } from './ScaleCache';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { rotativeTrim } from '@datune/utils/MathUtils';
import { Chromatic } from '../degrees/Chromatic';
import { DiatonicAltDegree } from './degrees/DiatonicAltDegree';
import { DiatonicDegree } from './degrees/DiatonicDegree';
import { Diatonic } from '../degrees/Diatonic';
import { DegreeFunction } from '../tonalities/functions/DegreeFunction';
import { IntervalDiatonic } from '../intervals/IntervalDiatonic';
import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { NamingScale } from '../lang/naming/NamingScale';
import { DiatonicAltPattern } from '../patterns/DiatonicAltPattern';
import { Settings } from '../settings/Settings';
import { ScaleAbstract } from './ScaleAbstract';
import { ScaleChromatic } from './ScaleChromatic';
import { ScaleDiatonicAltConversor } from './ScaleDiatonicAltConversor';
import { ScaleCache } from './ScaleCache';

type D = DiatonicAltDegree;
export type IntervalType = IntervalDiatonicAlt;
export class Scale extends ScaleAbstract<IntervalType, D> {
    static MAJOR: Scale;
    static DORIAN: Scale;
    static PHRYGIAN: Scale;
    static LYDIAN: Scale;
    static MIXOLYDIAN: Scale;
    static MINOR: Scale;
    static LOCRIAN: Scale;

    static HARMONIC_MINOR: Scale;
    static LOCRIAN_a6: Scale;
    static IONIAN_a5: Scale;
    static DORIAN_a4: Scale;
    static MIXOLYDIAN_b9_b13: Scale;
    static LYDIAN_a2: Scale;
    static SUPERLOCRIAN_bb7: Scale;

    static HARMONIC_MAJOR: Scale;
    static DORIAN_b5: Scale;
    static PHRYGIAN_b4: Scale;
    static LYDIAN_b3: Scale;
    static MIXOLYDIAN_b2: Scale;
    static AEOLIAN_b1: Scale;
    static LOCRIAN_bb7: Scale;

    static MELODIC_MINOR: Scale;
    static DORIAN_b2: Scale;
    static LYDIAN_a5: Scale;
    static LYDIAN_b7: Scale;
    static MIXOLYDIAN_b13: Scale;
    static LOCRIAN_a2: Scale;
    static SUPERLOCRIAN: Scale;

    static DOUBLE_HARMONIC: Scale;
    static LYDIAN_a2_a6: Scale;
    static ULTRAPHRYGIAN: Scale;
    static HUNGARIAN_MINOR: Scale;
    static ORIENTAL: Scale;
    static IONIAN_AUGMENTED_a2: Scale;
    static LOCRIAN_bb3_bb7: Scale;

    static NEAPOLITAN_MINOR: Scale;
    static NEAPOLITAN_MAJOR: Scale;

    // 6
    static BLUES_b5: Scale;
    static BLUES_a4: Scale;

    // 5
    static PENTATONIC_MINOR: Scale;
    static PENTATONIC: Scale;
    static EGYPCIAN: Scale;
    static BLUES_MINOR: Scale;
    static BLUES_MAJOR: Scale;

    // Symmetric
    static DOM7b5: Scale;
    static AUGMENTED_TRIAD: Scale;
    static DIMINISHED_7th: Scale;
    static HALF_DIMINISHED: Scale;
    static CHROMATIC: Scale;
    static WHOLE_TONE: Scale;
    static MESSIAEN_V_TRUNCATED: Scale;
    static MESSIAEN_INV_III_V_TRUNCATED_n2: Scale;
    static MESSIAEN_V: Scale;
    static RAGA_INDRUPRIYA_INDIA: Scale;
    static MESSIAEN_II_TRUNCATED_n3: Scale;
    static MESSIAEN_III_INV: Scale;
    static MESSIAEN_IV: Scale;
    static MESSIAEN_VI: Scale;
    static MESSIAEN_VII: Scale;

    // Bebop
    static BEBOP_MAJOR: Scale;
    static BEBOP_DORIAN: Scale;
    static BEBOP_DOMINANT: Scale;
    static BEBOP_MELODIC_MINOR: Scale;
    static BEBOP_HARMONIC_MINOR: Scale;

    static sets = (class {
        static allDiatonicScales: () => Scale[];

        static allHeptatonicScales: () => Scale[];

        static allBebopScales: () => Scale[];

        static allPentatonicScales: () => Scale[];

        static allHexatonicScales: () => Scale[];

        static all: () => Scale[];

        static symmetricScales: () => Scale[];
    });

    private static _cache = new ScaleCache((hashingObject: HashingObjectType) => new Scale(...hashingObject))

    private constructor(...intervals: IntervalType[]) {
        super(...intervals);
    }

    static fromDiatonicAlts(...pitches: DiatonicAlt[]): Scale {
        let degrees = pitches.map(p => DiatonicAltDegree.from(DiatonicDegree.fromInt(p.diatonic.valueOf()), p.alts));
        let scale = this.fromDegrees(...degrees);
        if (!Object.isFrozen(scale._precalcDegrees)) {
            scale._precalcDegrees = degrees;
            Object.freeze(scale._precalcDegrees);
        }

        return scale;
    }

    static fromDegrees(...degrees: D[]): Scale {
        let intervals = this.degrees2Intervals(degrees);
        let scale = this.fromIntraIntervals(...intervals);
        if (scale._precalcDegrees == null) {
            scale._precalcDegrees = degrees;
            Object.freeze(scale._precalcDegrees);
        }

        return scale;
    }

    private static degrees2Intervals(degrees: D[]): IntervalType[] {
        let intervals: IntervalType[] = [];
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

    static fromIntraIntervals(...intervals: IntervalType[]): Scale {
        return Scale._cache.getOrCreate(intervals);
    }

    getMode(n: number): Scale {
        let intraIntervals = this.getModeIntraIntervals(n);
        return Scale.fromIntraIntervals(...intraIntervals);
    }

    static fromString(strValue: string): Scale {
        let srtValueInput = strValue;
        strValue = this.normalizeInputString(strValue);

        let scale: Scale;

        scale = this.fromStringName(strValue);
        if (scale)
            return scale;

        scale = this.fromStringIntervals(srtValueInput);
        if (scale)
            return scale;

        throw new Error("Impossible get Scale from string: " + srtValueInput);
    }

    static fromStringIntervals(strValue: string): Scale {
        let splited = this.splitArray(strValue);
        if (!splited)
            return null;

        let splitedIntervals: IntervalDiatonicAlt[] = splited.map(str => IntervalDiatonicAlt.fromString(str));

        return Scale.fromIntraIntervals(...splitedIntervals);
    }

    private static splitArray(str: string): string[] {
        let splited: string[] = str.split(/\s|,|-|:/);

        splited = splited.filter(el => el != null && el != "");

        if (splited.length > 1)
            return splited;

        return null;
    }

    private static fromStringName(str: string): Scale {
        switch (str) {
            case "": return Scale.MAJOR;
            case "m": return Scale.MINOR;

            case Scale.MAJOR.toString().toLowerCase(): return Scale.MAJOR;
            case Scale.MINOR.toString().toLowerCase(): return Scale.MINOR;
            case Scale.DORIAN.toString().toLowerCase(): return Scale.DORIAN;
            case Scale.PHRYGIAN.toString().toLowerCase(): return Scale.PHRYGIAN;
            case Scale.LYDIAN.toString().toLowerCase(): return Scale.LYDIAN;
            case Scale.MIXOLYDIAN.toString().toLowerCase(): return Scale.MIXOLYDIAN;
            case Scale.LOCRIAN.toString().toLowerCase(): return Scale.LOCRIAN;

            default:
                for (let scale of Scale.sets.all()) {
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

    get diatonicAltChordPattern(): DiatonicAltPattern {
        return DiatonicAltPattern.fromRootIntervals(...this.intraIntervals);
    }

    protected calculateDegrees() {
        this._precalcDegrees = [DiatonicAltDegree.I];
        for (let i = 0; i < this._intraIntervals.length - 1; i++) {
            const interval = this._intraIntervals[i];
            let diatonicAltDegree = this._precalcDegrees[this._precalcDegrees.length - 1].withAdd(interval);
            this._precalcDegrees.push(diatonicAltDegree);
        }
        Object.freeze(this._precalcDegrees);
    }

    get degreeFunctions(): DegreeFunction[] {
        let ret: DegreeFunction[] = [];
        let diatonicAltChordPatterns: DiatonicAltPattern[] = DiatonicAltPattern.all();

        for (const diatonicAltDegree of this.degrees) {
            for (const diatonicAltChordPattern of diatonicAltChordPatterns) {
                let degreeFunction = DegreeFunction.from(diatonicAltDegree, diatonicAltChordPattern);
                if (this.hasEnharmonicDegrees(...degreeFunction.degrees))
                    ret.push(degreeFunction);
            }
        }

        return ret;
    }

    hasEnharmonicDegrees(...degrees: DiatonicAltDegree[]): boolean {
        for (let degree of degrees) {
            let found = false;
            for (let scaleDegree of this.degrees)
                if (scaleDegree.semis == degree.semis) {
                    found = true;
                    break;
                }

            if (!found)
                return false;
        }

        return true;
    }

    // General

    toString(): string {
        return NamingScale.toString(this);
    }

    hashCode(): string {
        let ret = "";
        for (const interval of this._intraIntervals)
            ret += "-" + interval.hashCode();

        return ret;
    }
}