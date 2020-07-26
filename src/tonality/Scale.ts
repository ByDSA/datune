import { DiatonicAlt } from 'degrees/DiatonicAlt';
import { PrecalcCache } from '../common/PrecalcCache';
import { MathUtils } from '../common/MathUtils';
import { Chromatic } from '../degrees/Chromatic';
import { Diatonic } from '../degrees/Diatonic';
import { DiatonicAltDegree } from '../degrees/degrees/DiatonicAltDegree';
import { DiatonicDegree } from '../degrees/degrees/DiatonicDegree';
import { DegreeFunction } from '../function/DegreeFunction';
import { IntervalDiatonic } from '../interval/IntervalDiatonic';
import { IntervalDiatonicAlt } from '../interval/IntervalDiatonicAlt';
import { NamingScale } from '../lang/naming/NamingScale';
import { DiatonicAltPattern } from '../patterns/DiatonicAltPattern';
import { Settings } from '../settings/Settings';
import { ScaleAbstract } from './ScaleAbstract';
import { ScaleChromatic } from './ScaleChromatic';
import { ScaleDiatonicAltConversor } from './ScaleDiatonicAltConversor';

type D = DiatonicAltDegree;
type I = IntervalDiatonicAlt;
type HashingObject = I[];
export class Scale extends ScaleAbstract<I, D> {
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

    private static immutablesCache = new PrecalcCache<Scale, HashingObject>(
        function (hashingObject: HashingObject): string {
            let ret = "";
            for (const interval of hashingObject)
                ret += interval.hashCode();
            return ret;
        },
        function (scale: Scale): HashingObject {
            return scale.intraIntervals;
        },
        function (hashingObject: HashingObject): Scale {
            return new Scale(...hashingObject);
        }
    );

    private constructor(...intervals: I[]) {
        super(...intervals);
    }

    public static fromDiatonicAlts(...pitches: DiatonicAlt[]): Scale {
        let degrees = pitches.map(p => DiatonicAltDegree.from(DiatonicDegree.fromInt(p.diatonic.intValue), p.alts));
        let scale = this.fromDegrees(...degrees);
        if (!Object.isFrozen(scale._precalcDegrees)) {
            scale._precalcDegrees = degrees;
            Object.freeze(scale._precalcDegrees);
        }

        return scale;
    }

    public static fromDegrees(...degrees: D[]): Scale {
        let intervals = this.degrees2Intervals(degrees);
        let scale = this.fromIntraIntervals(...intervals);
        if (scale._precalcDegrees == null) {
            scale._precalcDegrees = degrees;
            Object.freeze(scale._precalcDegrees);
        }

        return scale;
    }

    private static degrees2Intervals(degrees: D[]): I[] {
        let intervals: I[] = [];
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

    public static fromIntraIntervals(...intervals: I[]): Scale {
        return Scale.immutablesCache.getOrCreate(intervals);
    }

    getMode(n: number): Scale {
        let intraIntervals = this.getModeIntraIntervals(n);
        return Scale.fromIntraIntervals(...intraIntervals);
    }

    public static fromString(strValue: string): Scale {
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

    public static fromStringIntervals(strValue: string): Scale {
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
            let diatonicAltDegree = this._precalcDegrees[this._precalcDegrees.length - 1].getAdd(interval);
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

    public toString(): string {
        return NamingScale.toString(this);
    }

    hashCode(): string {
        let ret = "";
        for (const interval of this._intraIntervals)
            ret += "-" + interval.hashCode();

        return ret;
    }

    private static initialize() {
        Scale.MAJOR = Scale.fromDegrees(
            DiatonicAltDegree.I,
            DiatonicAltDegree.II,
            DiatonicAltDegree.III,
            DiatonicAltDegree.IV,
            DiatonicAltDegree.V,
            DiatonicAltDegree.VI,
            DiatonicAltDegree.VII,
        );

        Scale.DORIAN = Scale.MAJOR.getMode(2);
        Scale.PHRYGIAN = Scale.MAJOR.getMode(3);
        Scale.LYDIAN = Scale.MAJOR.getMode(4);
        Scale.MIXOLYDIAN = Scale.MAJOR.getMode(5);
        Scale.MINOR = Scale.MAJOR.getMode(6);
        Scale.LOCRIAN = Scale.MAJOR.getMode(7);

        Scale.HARMONIC_MINOR = ScaleDiatonicAltConversor.from(ScaleChromatic.HARMONIC_MINOR).scaleDiatonicAlt;
        Scale.LOCRIAN_a6 = Scale.HARMONIC_MINOR.getMode(2);
        Scale.IONIAN_a5 = Scale.HARMONIC_MINOR.getMode(3);
        Scale.DORIAN_a4 = Scale.HARMONIC_MINOR.getMode(4);
        Scale.MIXOLYDIAN_b9_b13 = Scale.HARMONIC_MINOR.getMode(5);
        Scale.LYDIAN_a2 = Scale.HARMONIC_MINOR.getMode(6);
        Scale.SUPERLOCRIAN_bb7 = Scale.HARMONIC_MINOR.getMode(7);

        Scale.HARMONIC_MAJOR = ScaleDiatonicAltConversor.from(ScaleChromatic.HARMONIC_MAJOR).scaleDiatonicAlt;
        Scale.DORIAN_b5 = Scale.HARMONIC_MAJOR.getMode(2);
        Scale.PHRYGIAN_b4 = Scale.HARMONIC_MAJOR.getMode(3);
        Scale.LYDIAN_b3 = Scale.HARMONIC_MAJOR.getMode(4);
        Scale.MIXOLYDIAN_b2 = Scale.HARMONIC_MAJOR.getMode(5);
        Scale.AEOLIAN_b1 = Scale.HARMONIC_MAJOR.getMode(6);
        Scale.LOCRIAN_bb7 = Scale.HARMONIC_MAJOR.getMode(7);

        Scale.MELODIC_MINOR = ScaleDiatonicAltConversor.from(ScaleChromatic.MELODIC_MINOR).scaleDiatonicAlt;
        Scale.DORIAN_b2 = Scale.MELODIC_MINOR.getMode(2);
        Scale.LYDIAN_a5 = Scale.MELODIC_MINOR.getMode(3);
        Scale.LYDIAN_b7 = Scale.MELODIC_MINOR.getMode(4);
        Scale.MIXOLYDIAN_b13 = Scale.MELODIC_MINOR.getMode(5);
        Scale.LOCRIAN_a2 = Scale.MELODIC_MINOR.getMode(6);
        Scale.SUPERLOCRIAN = Scale.MELODIC_MINOR.getMode(7);

        Scale.DOUBLE_HARMONIC = ScaleDiatonicAltConversor.from(ScaleChromatic.DOUBLE_HARMONIC).scaleDiatonicAlt;
        Scale.LYDIAN_a2_a6 = Scale.DOUBLE_HARMONIC.getMode(2);
        Scale.ULTRAPHRYGIAN = Scale.DOUBLE_HARMONIC.getMode(3);
        Scale.HUNGARIAN_MINOR = Scale.DOUBLE_HARMONIC.getMode(4);
        Scale.ORIENTAL = Scale.DOUBLE_HARMONIC.getMode(5);
        Scale.IONIAN_AUGMENTED_a2 = Scale.DOUBLE_HARMONIC.getMode(6);
        Scale.LOCRIAN_bb3_bb7 = Scale.DOUBLE_HARMONIC.getMode(7);

        Scale.NEAPOLITAN_MINOR = ScaleDiatonicAltConversor.from(ScaleChromatic.NEAPOLITAN_MINOR).scaleDiatonicAlt;
        Scale.NEAPOLITAN_MAJOR = ScaleDiatonicAltConversor.from(ScaleChromatic.NEAPOLITAN_MAJOR).scaleDiatonicAlt;

        // 6
        Scale.BLUES_b5 = Scale.fromIntraIntervals(
            IntervalDiatonicAlt.MINOR_THIRD,
            IntervalDiatonicAlt.MAJOR_SECOND,
            IntervalDiatonicAlt.MINOR_SECOND,
            IntervalDiatonicAlt.AUGMENTED_UNISON,
            IntervalDiatonicAlt.MINOR_THIRD,
            IntervalDiatonicAlt.MAJOR_SECOND
        );

        Scale.BLUES_a4 = Scale.fromIntraIntervals(
            IntervalDiatonicAlt.MINOR_THIRD,
            IntervalDiatonicAlt.MAJOR_SECOND,
            IntervalDiatonicAlt.AUGMENTED_UNISON,
            IntervalDiatonicAlt.MINOR_SECOND,
            IntervalDiatonicAlt.MINOR_THIRD,
            IntervalDiatonicAlt.MAJOR_SECOND
        );

        // 5
        Scale.PENTATONIC_MINOR = Scale.fromIntraIntervals(
            IntervalDiatonicAlt.MINOR_THIRD,
            IntervalDiatonicAlt.MAJOR_SECOND,
            IntervalDiatonicAlt.MAJOR_SECOND,
            IntervalDiatonicAlt.MINOR_THIRD,
            IntervalDiatonicAlt.MAJOR_SECOND
        );
        Scale.PENTATONIC = Scale.PENTATONIC_MINOR.getMode(2);
        Scale.EGYPCIAN = Scale.PENTATONIC_MINOR.getMode(3);
        Scale.BLUES_MINOR = Scale.PENTATONIC_MINOR.getMode(4);
        Scale.BLUES_MAJOR = Scale.PENTATONIC_MINOR.getMode(5);

        // Symmetric
        Scale.CHROMATIC = Scale.fromDegrees(
            DiatonicAltDegree.I,
            DiatonicAltDegree.from(DiatonicDegree.I, 1),
            DiatonicAltDegree.II,
            DiatonicAltDegree.from(DiatonicDegree.II, 1),
            DiatonicAltDegree.III,
            DiatonicAltDegree.IV,
            DiatonicAltDegree.from(DiatonicDegree.IV, 1),
            DiatonicAltDegree.V,
            DiatonicAltDegree.from(DiatonicDegree.V, 1),
            DiatonicAltDegree.VI,
            DiatonicAltDegree.from(DiatonicDegree.VI, 1),
            DiatonicAltDegree.VII,
        );
        Scale.WHOLE_TONE = Scale.fromDegrees(
            DiatonicAltDegree.I,
            DiatonicAltDegree.II,
            DiatonicAltDegree.III,
            DiatonicAltDegree.bV,
            DiatonicAltDegree.bVI,
            DiatonicAltDegree.bVII
        );
        Scale.AUGMENTED_TRIAD = Scale.fromIntraIntervals(
            IntervalDiatonicAlt.MAJOR_THIRD,
            IntervalDiatonicAlt.MAJOR_THIRD,
            IntervalDiatonicAlt.MAJOR_THIRD
        );
        Scale.DIMINISHED_7th = Scale.fromIntraIntervals(
            IntervalDiatonicAlt.MINOR_THIRD,
            IntervalDiatonicAlt.MINOR_THIRD,
            IntervalDiatonicAlt.MINOR_THIRD,
            IntervalDiatonicAlt.MINOR_THIRD
        );
        Scale.DOM7b5 = Scale.fromDegrees(
            DiatonicAltDegree.I,
            DiatonicAltDegree.III,
            DiatonicAltDegree.bV,
            DiatonicAltDegree.bVII,
        );

        Scale.RAGA_INDRUPRIYA_INDIA = ScaleDiatonicAltConversor.from(ScaleChromatic.RAGA_INDRUPRIYA_INDIA).scaleDiatonicAlt;
        Scale.HALF_DIMINISHED = ScaleDiatonicAltConversor.from(ScaleChromatic.HALF_DIMINISHED).scaleDiatonicAlt;
        Scale.MESSIAEN_V_TRUNCATED = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_V_TRUNCATED).scaleDiatonicAlt;
        Scale.MESSIAEN_III_INV = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_III_INV).scaleDiatonicAlt;
        Scale.MESSIAEN_II_TRUNCATED_n3 = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_II_TRUNCATED_n3).scaleDiatonicAlt;
        Scale.MESSIAEN_INV_III_V_TRUNCATED_n2 = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_INV_III_V_TRUNCATED_n2).scaleDiatonicAlt;
        Scale.MESSIAEN_IV = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_IV).scaleDiatonicAlt;
        Scale.MESSIAEN_V = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_V).scaleDiatonicAlt;
        Scale.MESSIAEN_VI = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_VI).scaleDiatonicAlt;
        Scale.MESSIAEN_VII = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_VII).scaleDiatonicAlt;

        // Bebop
        Scale.BEBOP_MAJOR = Scale.fromDegrees(
            Scale.MAJOR.degrees[0],
            Scale.MAJOR.degrees[1],
            Scale.MAJOR.degrees[2],
            Scale.MAJOR.degrees[3],
            Scale.MAJOR.degrees[4],
            DiatonicAltDegree.bVI,
            Scale.MAJOR.degrees[5],
            Scale.MAJOR.degrees[6]
        );

        Scale.BEBOP_DORIAN = Scale.fromDegrees(
            Scale.DORIAN.degrees[0],
            Scale.DORIAN.degrees[1],
            Scale.DORIAN.degrees[2],
            DiatonicAltDegree.III,
            Scale.DORIAN.degrees[3],
            Scale.DORIAN.degrees[4],
            Scale.DORIAN.degrees[5],
            Scale.DORIAN.degrees[6]
        );

        Scale.BEBOP_DOMINANT = Scale.fromDegrees(
            Scale.MIXOLYDIAN.degrees[0],
            Scale.MIXOLYDIAN.degrees[1],
            Scale.MIXOLYDIAN.degrees[2],
            Scale.MIXOLYDIAN.degrees[3],
            Scale.MIXOLYDIAN.degrees[4],
            Scale.MIXOLYDIAN.degrees[5],
            Scale.MIXOLYDIAN.degrees[6],
            DiatonicAltDegree.VII,
        );

        Scale.BEBOP_MELODIC_MINOR = Scale.fromDegrees(
            Scale.MELODIC_MINOR.degrees[0],
            Scale.MELODIC_MINOR.degrees[1],
            Scale.MELODIC_MINOR.degrees[2],
            Scale.MELODIC_MINOR.degrees[3],
            Scale.MELODIC_MINOR.degrees[4],
            DiatonicAltDegree.bVI,
            Scale.MELODIC_MINOR.degrees[5],
            Scale.MELODIC_MINOR.degrees[6]
        );

        Scale.BEBOP_HARMONIC_MINOR = Scale.fromDegrees(
            Scale.HARMONIC_MINOR.degrees[0],
            Scale.HARMONIC_MINOR.degrees[1],
            Scale.HARMONIC_MINOR.degrees[2],
            Scale.HARMONIC_MINOR.degrees[3],
            Scale.HARMONIC_MINOR.degrees[4],
            Scale.HARMONIC_MINOR.degrees[5],
            DiatonicAltDegree.bVII,
            Scale.HARMONIC_MINOR.degrees[6]
        );

        Scale.sets.allDiatonicScales = function () {
            return [
                Scale.MAJOR,
                Scale.DORIAN,
                Scale.PHRYGIAN,
                Scale.LYDIAN,
                Scale.MIXOLYDIAN,
                Scale.MINOR,
                Scale.LOCRIAN
            ];
        }

        Scale.sets.allHeptatonicScales = function () {
            return []
                .concat(Scale.sets.allDiatonicScales())
                .concat([
                    Scale.HARMONIC_MINOR,
                    Scale.LOCRIAN_a6,
                    Scale.IONIAN_a5,
                    Scale.DORIAN_a4,
                    Scale.MIXOLYDIAN_b9_b13,
                    Scale.LYDIAN_a2,
                    Scale.SUPERLOCRIAN_bb7,

                    Scale.HARMONIC_MAJOR,
                    Scale.DORIAN_b5,
                    Scale.PHRYGIAN_b4,
                    Scale.LYDIAN_b3,
                    Scale.MIXOLYDIAN_b2,
                    Scale.AEOLIAN_b1,
                    Scale.LOCRIAN_bb7,

                    Scale.MELODIC_MINOR,
                    Scale.DORIAN_b2,
                    Scale.LYDIAN_a5,
                    Scale.LYDIAN_b7,
                    Scale.MIXOLYDIAN_b13,
                    Scale.LOCRIAN_a2,
                    Scale.SUPERLOCRIAN,

                    Scale.DOUBLE_HARMONIC,
                    Scale.LYDIAN_a2_a6,
                    Scale.ULTRAPHRYGIAN,
                    Scale.HUNGARIAN_MINOR,
                    Scale.ORIENTAL,
                    Scale.IONIAN_AUGMENTED_a2,
                    Scale.LOCRIAN_bb3_bb7,

                    Scale.NEAPOLITAN_MINOR,
                    Scale.NEAPOLITAN_MAJOR
                ]);
        }

        Scale.sets.allBebopScales = function () {
            return [
                Scale.BEBOP_MAJOR,
                Scale.BEBOP_DORIAN,
                Scale.BEBOP_DOMINANT,
                Scale.BEBOP_MELODIC_MINOR,
                Scale.BEBOP_HARMONIC_MINOR
            ];
        }

        Scale.sets.allPentatonicScales = function () {
            return [
                Scale.PENTATONIC_MINOR,
                Scale.PENTATONIC,
                Scale.EGYPCIAN,
                Scale.BLUES_MINOR
            ];
        }

        Scale.sets.allHexatonicScales = function () {
            return [
                Scale.BLUES_b5,
                Scale.BLUES_a4,
                Scale.WHOLE_TONE
            ];
        }

        Scale.sets.all = function (): Scale[] {
            let ret: Scale[];
            ret = Scale.sets.allHeptatonicScales();
            ret = ret.concat(Scale.sets.allPentatonicScales());
            ret = ret.concat(Scale.sets.allHexatonicScales());
            ret = ret.concat(Scale.sets.allBebopScales());
            ret = ret.concat(Scale.sets.symmetricScales());

            return ret;
        }

        Scale.sets.symmetricScales = function () {
            return [
                Scale.CHROMATIC,
                Scale.WHOLE_TONE,
                Scale.AUGMENTED_TRIAD,
                Scale.DIMINISHED_7th,
                Scale.MESSIAEN_V_TRUNCATED,
                Scale.DOM7b5,
                Scale.MESSIAEN_INV_III_V_TRUNCATED_n2,
                Scale.HALF_DIMINISHED,
                Scale.MESSIAEN_V,
                Scale.RAGA_INDRUPRIYA_INDIA,
                Scale.MESSIAEN_II_TRUNCATED_n3,
                Scale.MESSIAEN_III_INV,
                Scale.MESSIAEN_IV,
                Scale.MESSIAEN_VI,
                Scale.MESSIAEN_VII
            ];
        };
    }
}