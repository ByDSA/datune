import { mod, NonEmptyArray, Sets } from '@datune/utils';
import { DiatonicAltArray } from '../../../../chords';
import { Settings } from '../../../../config';
import { ChromaticInterval, IntervalDiatonic, IntervalDiatonicAlt } from '../../../../intervals';
import { Chromatic, Diatonic, DiatonicAlt } from '../../../../pitches';
import { DegreeFunction } from '../../../../tonalities';
import { DiatonicAltPattern } from '../../../../voicings/relative/alt/DiatonicAltPattern';
import { NamingScale } from '../../../NamingScale';
import { ScaleAbstract } from '../../../ScaleAbstract';
import { ScaleAltConversor } from '../../chromatic/conversoralt/ScaleAltConversor';
import { Scale } from '../../chromatic/scale/Scale';
import { DiatonicDegree } from '../../degrees/DiatonicDegree';
import { DegreeAlt, DegreeAltArray } from '../degreealt/DegreeAlt';
import { HashingObjectType, ScaleAltCache } from './building/cache/ScaleAltCache';

type Interval = IntervalDiatonicAlt;
type IntervalArray = NonEmptyArray<IntervalDiatonicAlt>;
export type ScaleAltArray = NonEmptyArray<ScaleAlt>;
export class ScaleAlt extends ScaleAbstract<Interval, DegreeAlt> {
    private static _cache = new ScaleAltCache((hashingObject: HashingObjectType) => new ScaleAlt(...hashingObject))

    private constructor(...intervals: IntervalArray) {
        super(...intervals);
    }

    static fromDiatonicAlts(...pitches: DiatonicAltArray): ScaleAlt {
        let degrees = <DegreeAltArray>pitches.map((p: DiatonicAlt) => DegreeAlt.from(DiatonicDegree.fromInt(p.diatonic.valueOf()), p.alts));
        let scale = this.fromDegrees(...degrees);
        if (!Object.isFrozen(scale._precalcDegrees)) {
            scale._precalcDegrees = degrees;
            Object.freeze(scale._precalcDegrees);
        }

        return scale;
    }

    static fromDegrees(...degrees: DegreeAltArray): ScaleAlt {
        let intervals = this.degrees2Intervals(degrees);
        let scale = this.fromIntraIntervals(...intervals);
        if (scale._precalcDegrees == null) {
            scale._precalcDegrees = degrees;
            Object.freeze(scale._precalcDegrees);
        }

        return scale;
    }

    private static degrees2Intervals(degrees: DegreeAltArray): IntervalArray {
        let intervals: Interval[] = [];
        for (let i = 1; i <= degrees.length; i++) {
            let degree = degrees[i % degrees.length];
            let prevDegree = degrees[i - 1];
            let distDiatonicInt = degree.diatonicDegree.valueOf() - prevDegree.diatonicDegree.valueOf();
            distDiatonicInt = mod(distDiatonicInt, Diatonic.NUMBER);
            let distNoteInt = degree.degree - prevDegree.degree;
            distNoteInt = mod(distNoteInt, Chromatic.NUMBER);
            let intervalDiatonic = IntervalDiatonic.from(distDiatonicInt);
            let interval = IntervalDiatonicAlt.fromIntervals(distNoteInt, intervalDiatonic);
            intervals.push(interval);
        }

        return <IntervalArray>intervals;
    }

    static fromIntraIntervals(...intervals: IntervalArray): ScaleAlt {
        return ScaleAlt._cache.getOrCreate(intervals);
    }

    get modes(): ScaleAlt[] {
        return <ScaleAlt[]>super.modes;
    }

    getMode(n: number): ScaleAlt {
        let intraIntervals = this.getModeIntraIntervals(n);
        return ScaleAlt.fromIntraIntervals(...intraIntervals);
    }

    static fromString(strValue: string): ScaleAlt | null {
        let srtValueInput = strValue;
        strValue = this.normalizeInputString(strValue);

        let scale: ScaleAlt | null;

        scale = this.fromStringName(strValue);
        if (scale)
            return scale;

        scale = this.fromStringIntervals(srtValueInput);
        if (scale)
            return scale;

        return null;
    }

    static fromStringIntervals(strValue: string): ScaleAlt | null {
        let splited = this.splitArray(strValue);
        if (!splited)
            return null;

        let splitedIntervals: IntervalDiatonicAlt[] = <IntervalDiatonicAlt[]>splited.map(str => IntervalDiatonicAlt.fromString(str)).filter(s => s);

        if (splitedIntervals.length === 0)
            return null;

        return ScaleAlt.fromIntraIntervals(...<IntervalArray>splitedIntervals);
    }

    private static splitArray(str: string): string[] | null {
        let splited: string[] = str.split(/\s|,|-|:/);

        splited = splited.filter(el => el != null && el != "");

        if (splited.length > 1)
            return splited;

        return null;
    }

    private static fromStringName(str: string): ScaleAlt | null {
        switch (str) {
            case "": return ScaleAlt.MAJOR;
            case "m": return ScaleAlt.MINOR;

            case ScaleAlt.MAJOR.toString().toLowerCase(): return ScaleAlt.MAJOR;
            case ScaleAlt.MINOR.toString().toLowerCase(): return ScaleAlt.MINOR;
            case ScaleAlt.DORIAN.toString().toLowerCase(): return ScaleAlt.DORIAN;
            case ScaleAlt.PHRYGIAN.toString().toLowerCase(): return ScaleAlt.PHRYGIAN;
            case ScaleAlt.LYDIAN.toString().toLowerCase(): return ScaleAlt.LYDIAN;
            case ScaleAlt.MIXOLYDIAN.toString().toLowerCase(): return ScaleAlt.MIXOLYDIAN;
            case ScaleAlt.LOCRIAN.toString().toLowerCase(): return ScaleAlt.LOCRIAN;

            default:
                for (let scale of ScaleAlt.sets.common()) {
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

    protected calcDegrees(): DegreeAltArray {
        let ret: DegreeAltArray = [DegreeAlt.I];
        for (let i = 0; i < this._intraIntervals.length - 1; i++) {
            const interval = this._intraIntervals[i];
            let diatonicAltDegree = ret[ret.length - 1].withAdd(interval);
            ret.push(diatonicAltDegree);
        }

        return ret;
    }

    get degreeFunctions(): DegreeFunction[] {
        let ret: DegreeFunction[] = [];
        let diatonicAltChordPatterns: DiatonicAltPattern[] = DiatonicAltPattern.all();

        for (const diatonicAltDegree of this.degrees) {
            for (const diatonicAltChordPattern of diatonicAltChordPatterns) {
                let degreeFunction = DegreeFunction.from(diatonicAltDegree, diatonicAltChordPattern);
                const degrees = <DegreeAltArray>degreeFunction.degrees;
                if (this.hasEnharmonicDegrees(...degrees))
                    ret.push(degreeFunction);
            }
        }

        return ret;
    }

    hasEnharmonicDegrees(...degrees: DegreeAltArray): boolean {
        for (let degree of degrees) {
            let found = false;
            for (let scaleDegree of this.degrees)
                if (scaleDegree.degree == degree.degree) {
                    found = true;
                    break;
                }

            if (!found)
                return false;
        }

        return true;
    }

    get scale(): Scale {
        let intraIntervals = <NonEmptyArray<ChromaticInterval>>this.intraIntervals.map(intraInterval => intraInterval.interval);
        return <Scale>Scale.fromIntraIntervals(...intraIntervals);
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

    // SETS
    static get MAJOR(): ScaleAlt {
        if (!_MAJOR)
            _MAJOR = ScaleAlt.fromDegrees(
                DegreeAlt.I,
                DegreeAlt.II,
                DegreeAlt.III,
                DegreeAlt.IV,
                DegreeAlt.V,
                DegreeAlt.VI,
                DegreeAlt.VII,
            );

        return _MAJOR;
    }

    static get DORIAN(): ScaleAlt {
        if (!_DORIAN)
            _DORIAN = ScaleAlt.MAJOR.getMode(2);
        return _DORIAN
    }
    static get PHRYGIAN(): ScaleAlt {
        if (!_PHRYGIAN)
            _PHRYGIAN = ScaleAlt.MAJOR.getMode(3);
        return _PHRYGIAN;
    }
    static get LYDIAN(): ScaleAlt {
        if (!_LYDIAN)
            _LYDIAN = ScaleAlt.MAJOR.getMode(4);
        return _LYDIAN;
    }
    static get MIXOLYDIAN(): ScaleAlt {
        if (!_MIXOLYDIAN)
            _MIXOLYDIAN = ScaleAlt.MAJOR.getMode(5);
        return _MIXOLYDIAN;
    }
    static get MINOR(): ScaleAlt {
        if (!_MINOR)
            _MINOR = ScaleAlt.MAJOR.getMode(6);
        return _MINOR;
    }
    static get LOCRIAN(): ScaleAlt {
        if (!_LOCRIAN)
            _LOCRIAN = ScaleAlt.MAJOR.getMode(7);
        return _LOCRIAN;
    }

    static get HARMONIC_MINOR(): ScaleAlt {
        if (!_HARMONIC_MINOR)
            _HARMONIC_MINOR = ScaleAltConversor.from(Scale.HARMONIC_MINOR).scaleDiatonicAlt;
        return _HARMONIC_MINOR;
    }
    static get LOCRIAN_a6(): ScaleAlt {
        if (!_LOCRIAN_a6)
            _LOCRIAN_a6 = ScaleAlt.HARMONIC_MINOR.getMode(2);
        return _LOCRIAN_a6;
    }
    static get IONIAN_a5(): ScaleAlt {
        if (!_IONIAN_a5)
            _IONIAN_a5 = ScaleAlt.HARMONIC_MINOR.getMode(3);

        return _IONIAN_a5;
    }
    static get DORIAN_a4(): ScaleAlt {
        if (!_DORIAN_a4)
            _DORIAN_a4 = ScaleAlt.HARMONIC_MINOR.getMode(4);
        return _DORIAN_a4;
    }
    static get MIXOLYDIAN_b9_b13(): ScaleAlt {
        if (!_MIXOLYDIAN_b9_b13)
            _MIXOLYDIAN_b9_b13 = ScaleAlt.HARMONIC_MINOR.getMode(5);
        return _MIXOLYDIAN_b9_b13;
    }
    static get LYDIAN_a2(): ScaleAlt {
        if (!_LYDIAN_a2)
            _LYDIAN_a2 = ScaleAlt.HARMONIC_MINOR.getMode(6);
        return _LYDIAN_a2;
    }
    static get SUPERLOCRIAN_bb7(): ScaleAlt {
        if (!_SUPERLOCRIAN_bb7)
            _SUPERLOCRIAN_bb7 = ScaleAlt.HARMONIC_MINOR.getMode(7);
        return _SUPERLOCRIAN_bb7;
    }

    static get HARMONIC_MAJOR(): ScaleAlt {
        if (!_HARMONIC_MAJOR)
            _HARMONIC_MAJOR = ScaleAltConversor.from(Scale.HARMONIC_MAJOR).scaleDiatonicAlt;
        return _HARMONIC_MAJOR;
    }
    static get DORIAN_b5(): ScaleAlt {
        if (!_DORIAN_b5)
            _DORIAN_b5 = ScaleAlt.HARMONIC_MAJOR.getMode(2);
        return _DORIAN_b5;
    }
    static get PHRYGIAN_b4(): ScaleAlt {
        if (!_PHRYGIAN_b4)
            _PHRYGIAN_b4 = ScaleAlt.HARMONIC_MAJOR.getMode(3);
        return _PHRYGIAN_b4;
    }
    static get LYDIAN_b3(): ScaleAlt {
        if (!_LYDIAN_b3)
            _LYDIAN_b3 = ScaleAlt.HARMONIC_MAJOR.getMode(4);
        return _LYDIAN_b3;
    }
    static get MIXOLYDIAN_b2(): ScaleAlt {
        if (!_MIXOLYDIAN_b2)
            _MIXOLYDIAN_b2 = ScaleAlt.HARMONIC_MAJOR.getMode(5);
        return _MIXOLYDIAN_b2;
    }
    static get AEOLIAN_b1(): ScaleAlt {
        if (!_AEOLIAN_b1)
            _AEOLIAN_b1 = ScaleAlt.HARMONIC_MAJOR.getMode(6);
        return _AEOLIAN_b1;
    }
    static get LOCRIAN_bb7(): ScaleAlt {
        if (!_LOCRIAN_bb7)
            _LOCRIAN_bb7 = ScaleAlt.HARMONIC_MAJOR.getMode(7);
        return _LOCRIAN_bb7;
    }

    static get MELODIC_MINOR(): ScaleAlt {
        if (!_MELODIC_MINOR)
            _MELODIC_MINOR = ScaleAltConversor.from(Scale.MELODIC_MINOR).scaleDiatonicAlt;
        return _MELODIC_MINOR;
    }
    static get DORIAN_b2(): ScaleAlt {
        if (!_DORIAN_b2)
            _DORIAN_b2 = ScaleAlt.MELODIC_MINOR.getMode(2);
        return _DORIAN_b2;
    }
    static get LYDIAN_a5(): ScaleAlt {
        if (!_LYDIAN_a5)
            _LYDIAN_a5 = ScaleAlt.MELODIC_MINOR.getMode(3);
        return _LYDIAN_a5;
    }
    static get LYDIAN_b7(): ScaleAlt {
        if (!_LYDIAN_b7)
            _LYDIAN_b7 = ScaleAlt.MELODIC_MINOR.getMode(4);
        return _LYDIAN_b7;
    }
    static get MIXOLYDIAN_b13(): ScaleAlt {
        if (!_MIXOLYDIAN_b13)
            _MIXOLYDIAN_b13 = ScaleAlt.MELODIC_MINOR.getMode(5);
        return _MIXOLYDIAN_b13;
    }
    static get LOCRIAN_a2(): ScaleAlt {
        if (!_LOCRIAN_a2)
            _LOCRIAN_a2 = ScaleAlt.MELODIC_MINOR.getMode(6);
        return _LOCRIAN_a2;
    }
    static get SUPERLOCRIAN(): ScaleAlt {
        if (!_SUPERLOCRIAN)
            _SUPERLOCRIAN = ScaleAlt.MELODIC_MINOR.getMode(7);
        return _SUPERLOCRIAN;
    }

    static get DOUBLE_HARMONIC(): ScaleAlt {
        if (!_DOUBLE_HARMONIC)
            _DOUBLE_HARMONIC = ScaleAltConversor.from(Scale.DOUBLE_HARMONIC).scaleDiatonicAlt;
        return _DOUBLE_HARMONIC;
    }
    static get LYDIAN_a2_a6(): ScaleAlt {
        if (!_LYDIAN_a2_a6)
            _LYDIAN_a2_a6 = ScaleAlt.DOUBLE_HARMONIC.getMode(2);
        return _LYDIAN_a2_a6;
    }
    static get ULTRAPHRYGIAN(): ScaleAlt {
        if (!_ULTRAPHRYGIAN)
            _ULTRAPHRYGIAN = ScaleAlt.DOUBLE_HARMONIC.getMode(3);
        return _ULTRAPHRYGIAN;
    }
    static get HUNGARIAN_MINOR(): ScaleAlt {
        if (!_HUNGARIAN_MINOR)
            _HUNGARIAN_MINOR = ScaleAlt.DOUBLE_HARMONIC.getMode(4);
        return _HUNGARIAN_MINOR;
    }
    static get ORIENTAL(): ScaleAlt {
        if (!_ORIENTAL)
            _ORIENTAL = ScaleAlt.DOUBLE_HARMONIC.getMode(5);
        return _ORIENTAL;
    }
    static get IONIAN_AUGMENTED_a2(): ScaleAlt {
        if (!_IONIAN_AUGMENTED_a2)
            _IONIAN_AUGMENTED_a2 = ScaleAlt.DOUBLE_HARMONIC.getMode(6);
        return _IONIAN_AUGMENTED_a2;
    }
    static get LOCRIAN_bb3_bb7(): ScaleAlt {
        if (!_LOCRIAN_bb3_bb7)
            _LOCRIAN_bb3_bb7 = ScaleAlt.DOUBLE_HARMONIC.getMode(7);
        return _LOCRIAN_bb3_bb7;
    }

    static get NEAPOLITAN_MINOR(): ScaleAlt {
        if (!_NEAPOLITAN_MINOR)
            _NEAPOLITAN_MINOR = ScaleAltConversor.from(Scale.NEAPOLITAN_MINOR).scaleDiatonicAlt;
        return _NEAPOLITAN_MINOR;
    }
    static get NEAPOLITAN_MAJOR(): ScaleAlt {
        if (!_NEAPOLITAN_MAJOR)
            _NEAPOLITAN_MAJOR = ScaleAltConversor.from(Scale.NEAPOLITAN_MAJOR).scaleDiatonicAlt;
        return _NEAPOLITAN_MAJOR;
    }

    // 6
    static get BLUES_b5(): ScaleAlt {
        if (!_BLUES_b5)
            _BLUES_b5 = ScaleAlt.fromIntraIntervals(
                IntervalDiatonicAlt.MINOR_THIRD,
                IntervalDiatonicAlt.MAJOR_SECOND,
                IntervalDiatonicAlt.MINOR_SECOND,
                IntervalDiatonicAlt.AUGMENTED_UNISON,
                IntervalDiatonicAlt.MINOR_THIRD,
                IntervalDiatonicAlt.MAJOR_SECOND
            );
        return _BLUES_b5;
    }

    static get BLUES_a4(): ScaleAlt {
        if (!_BLUES_a4)
            _BLUES_a4 = ScaleAlt.fromIntraIntervals(
                IntervalDiatonicAlt.MINOR_THIRD,
                IntervalDiatonicAlt.MAJOR_SECOND,
                IntervalDiatonicAlt.AUGMENTED_UNISON,
                IntervalDiatonicAlt.MINOR_SECOND,
                IntervalDiatonicAlt.MINOR_THIRD,
                IntervalDiatonicAlt.MAJOR_SECOND
            );
        return _BLUES_a4;
    }
    // 5
    static get PENTATONIC_MINOR(): ScaleAlt {
        if (!_PENTATONIC_MINOR)
            _PENTATONIC_MINOR = ScaleAlt.fromIntraIntervals(
                IntervalDiatonicAlt.MINOR_THIRD,
                IntervalDiatonicAlt.MAJOR_SECOND,
                IntervalDiatonicAlt.MAJOR_SECOND,
                IntervalDiatonicAlt.MINOR_THIRD,
                IntervalDiatonicAlt.MAJOR_SECOND
            );
        return _PENTATONIC_MINOR;
    }
    static get PENTATONIC(): ScaleAlt {
        if (!_PENTATONIC)
            _PENTATONIC = ScaleAlt.PENTATONIC_MINOR.getMode(2);
        return _PENTATONIC;
    }
    static get EGYPCIAN(): ScaleAlt {
        if (!_EGYPCIAN)
            _EGYPCIAN = ScaleAlt.PENTATONIC_MINOR.getMode(3);
        return _EGYPCIAN;
    }
    static get BLUES_MINOR(): ScaleAlt {
        if (!_BLUES_MINOR)
            _BLUES_MINOR = ScaleAlt.PENTATONIC_MINOR.getMode(4);
        return _BLUES_MINOR;
    }
    static get BLUES_MAJOR(): ScaleAlt {
        if (!_BLUES_MAJOR)
            _BLUES_MAJOR = ScaleAlt.PENTATONIC_MINOR.getMode(5);
        return _BLUES_MAJOR;
    }

    // Symmetric
    static get CHROMATIC(): ScaleAlt {
        if (!_CHROMATIC)
            _CHROMATIC = ScaleAlt.fromDegrees(
                DegreeAlt.I,
                DegreeAlt.from(DiatonicDegree.I, 1),
                DegreeAlt.II,
                DegreeAlt.from(DiatonicDegree.II, 1),
                DegreeAlt.III,
                DegreeAlt.IV,
                DegreeAlt.from(DiatonicDegree.IV, 1),
                DegreeAlt.V,
                DegreeAlt.from(DiatonicDegree.V, 1),
                DegreeAlt.VI,
                DegreeAlt.from(DiatonicDegree.VI, 1),
                DegreeAlt.VII,
            );
        return _CHROMATIC;
    }
    static get WHOLE_TONE(): ScaleAlt {
        if (!_WHOLE_TONE)
            _WHOLE_TONE = ScaleAlt.fromDegrees(
                DegreeAlt.I,
                DegreeAlt.II,
                DegreeAlt.III,
                DegreeAlt.bV,
                DegreeAlt.bVI,
                DegreeAlt.bVII
            );
        return _WHOLE_TONE;
    }
    static get AUGMENTED_TRIAD(): ScaleAlt {
        if (!_AUGMENTED_TRIAD)
            _AUGMENTED_TRIAD = ScaleAlt.fromIntraIntervals(
                IntervalDiatonicAlt.MAJOR_THIRD,
                IntervalDiatonicAlt.MAJOR_THIRD,
                IntervalDiatonicAlt.MAJOR_THIRD
            );
        return _AUGMENTED_TRIAD;
    }
    static get DIMINISHED_7th(): ScaleAlt {
        if (!_DIMINISHED_7th)
            _DIMINISHED_7th = ScaleAlt.fromIntraIntervals(
                IntervalDiatonicAlt.MINOR_THIRD,
                IntervalDiatonicAlt.MINOR_THIRD,
                IntervalDiatonicAlt.MINOR_THIRD,
                IntervalDiatonicAlt.MINOR_THIRD
            );
        return _DIMINISHED_7th;
    }
    static get DOM7b5(): ScaleAlt {
        if (!_DOM7b5)
            _DOM7b5 = ScaleAlt.fromDegrees(
                DegreeAlt.I,
                DegreeAlt.III,
                DegreeAlt.bV,
                DegreeAlt.bVII,
            );
        return _DOM7b5;
    }

    static get RAGA_INDRUPRIYA_INDIA(): ScaleAlt {
        if (!_RAGA_INDRUPRIYA_INDIA)
            _RAGA_INDRUPRIYA_INDIA = ScaleAltConversor.from(Scale.RAGA_INDRUPRIYA_INDIA).scaleDiatonicAlt;
        return _RAGA_INDRUPRIYA_INDIA;
    }
    static get HALF_DIMINISHED(): ScaleAlt {
        if (!_HALF_DIMINISHED)
            _HALF_DIMINISHED = ScaleAltConversor.from(Scale.HALF_DIMINISHED).scaleDiatonicAlt;
        return _HALF_DIMINISHED;
    }
    static get MESSIAEN_V_TRUNCATED(): ScaleAlt {
        if (!_MESSIAEN_V_TRUNCATED)
            _MESSIAEN_V_TRUNCATED = ScaleAltConversor.from(Scale.MESSIAEN_V_TRUNCATED).scaleDiatonicAlt;
        return _MESSIAEN_V_TRUNCATED;
    }
    static get MESSIAEN_III_INV(): ScaleAlt {
        if (!_MESSIAEN_III_INV)
            _MESSIAEN_III_INV = ScaleAltConversor.from(Scale.MESSIAEN_III_INV).scaleDiatonicAlt;
        return _MESSIAEN_III_INV;
    }
    static get MESSIAEN_II_TRUNCATED_n3(): ScaleAlt {
        if (!_MESSIAEN_II_TRUNCATED_n3)
            _MESSIAEN_II_TRUNCATED_n3 = ScaleAltConversor.from(Scale.MESSIAEN_II_TRUNCATED_n3).scaleDiatonicAlt;
        return _MESSIAEN_II_TRUNCATED_n3;
    }
    static get MESSIAEN_INV_III_V_TRUNCATED_n2(): ScaleAlt {
        if (!_MESSIAEN_INV_III_V_TRUNCATED_n2)
            _MESSIAEN_INV_III_V_TRUNCATED_n2 = ScaleAltConversor.from(Scale.MESSIAEN_INV_III_V_TRUNCATED_n2).scaleDiatonicAlt;
        return _MESSIAEN_INV_III_V_TRUNCATED_n2;
    }
    static get MESSIAEN_IV(): ScaleAlt {
        if (!_MESSIAEN_IV)
            _MESSIAEN_IV = ScaleAltConversor.from(Scale.MESSIAEN_IV).scaleDiatonicAlt;
        return _MESSIAEN_IV;
    }
    static get MESSIAEN_V(): ScaleAlt {
        if (!_MESSIAEN_V)
            _MESSIAEN_V = ScaleAltConversor.from(Scale.MESSIAEN_V).scaleDiatonicAlt;
        return _MESSIAEN_V;
    }
    static get MESSIAEN_VI(): ScaleAlt {
        if (!_MESSIAEN_VI)
            _MESSIAEN_VI = ScaleAltConversor.from(Scale.MESSIAEN_VI).scaleDiatonicAlt;
        return _MESSIAEN_VI;
    }
    static get MESSIAEN_VII(): ScaleAlt {
        if (!_MESSIAEN_VII)
            _MESSIAEN_VII = ScaleAltConversor.from(Scale.MESSIAEN_VII).scaleDiatonicAlt;
        return _MESSIAEN_VII;
    }

    // Bebop
    static get BEBOP_MAJOR(): ScaleAlt {
        if (!_BEBOP_MAJOR)
            _BEBOP_MAJOR = ScaleAlt.fromDegrees(
                ScaleAlt.MAJOR.degrees[0],
                ScaleAlt.MAJOR.degrees[1],
                ScaleAlt.MAJOR.degrees[2],
                ScaleAlt.MAJOR.degrees[3],
                ScaleAlt.MAJOR.degrees[4],
                DegreeAlt.bVI,
                ScaleAlt.MAJOR.degrees[5],
                ScaleAlt.MAJOR.degrees[6]
            );
        return _BEBOP_MAJOR;
    }

    static get BEBOP_DORIAN(): ScaleAlt {
        if (!_BEBOP_DORIAN)
            _BEBOP_DORIAN = ScaleAlt.fromDegrees(
                ScaleAlt.DORIAN.degrees[0],
                ScaleAlt.DORIAN.degrees[1],
                ScaleAlt.DORIAN.degrees[2],
                DegreeAlt.III,
                ScaleAlt.DORIAN.degrees[3],
                ScaleAlt.DORIAN.degrees[4],
                ScaleAlt.DORIAN.degrees[5],
                ScaleAlt.DORIAN.degrees[6]
            );
        return _BEBOP_DORIAN;
    }

    static get BEBOP_DOMINANT(): ScaleAlt {
        if (!_BEBOP_DOMINANT)
            _BEBOP_DOMINANT = ScaleAlt.fromDegrees(
                ScaleAlt.MIXOLYDIAN.degrees[0],
                ScaleAlt.MIXOLYDIAN.degrees[1],
                ScaleAlt.MIXOLYDIAN.degrees[2],
                ScaleAlt.MIXOLYDIAN.degrees[3],
                ScaleAlt.MIXOLYDIAN.degrees[4],
                ScaleAlt.MIXOLYDIAN.degrees[5],
                ScaleAlt.MIXOLYDIAN.degrees[6],
                DegreeAlt.VII,
            );
        return _BEBOP_DOMINANT;
    }

    static get BEBOP_MELODIC_MINOR(): ScaleAlt {
        if (!_BEBOP_MELODIC_MINOR)
            _BEBOP_MELODIC_MINOR = ScaleAlt.fromDegrees(
                ScaleAlt.MELODIC_MINOR.degrees[0],
                ScaleAlt.MELODIC_MINOR.degrees[1],
                ScaleAlt.MELODIC_MINOR.degrees[2],
                ScaleAlt.MELODIC_MINOR.degrees[3],
                ScaleAlt.MELODIC_MINOR.degrees[4],
                DegreeAlt.bVI,
                ScaleAlt.MELODIC_MINOR.degrees[5],
                ScaleAlt.MELODIC_MINOR.degrees[6]
            );
        return _BEBOP_MELODIC_MINOR;
    }
    static get BEBOP_HARMONIC_MINOR(): ScaleAlt {
        if (!_BEBOP_HARMONIC_MINOR)
            _BEBOP_HARMONIC_MINOR = ScaleAlt.fromDegrees(
                ScaleAlt.HARMONIC_MINOR.degrees[0],
                ScaleAlt.HARMONIC_MINOR.degrees[1],
                ScaleAlt.HARMONIC_MINOR.degrees[2],
                ScaleAlt.HARMONIC_MINOR.degrees[3],
                ScaleAlt.HARMONIC_MINOR.degrees[4],
                ScaleAlt.HARMONIC_MINOR.degrees[5],
                DegreeAlt.bVII,
                ScaleAlt.HARMONIC_MINOR.degrees[6]
            );
        return _BEBOP_HARMONIC_MINOR;
    }
    static sets = (class {
        static allDiatonicScales: () => Set<ScaleAlt> = function () {
            return new Set([
                ScaleAlt.MAJOR,
                ScaleAlt.DORIAN,
                ScaleAlt.PHRYGIAN,
                ScaleAlt.LYDIAN,
                ScaleAlt.MIXOLYDIAN,
                ScaleAlt.MINOR,
                ScaleAlt.LOCRIAN
            ]);
        };

        static allHeptatonicScales: () => Set<ScaleAlt> = function () {
            let ret = new Set<ScaleAlt>();
            Sets.addSet(ret, ScaleAlt.sets.allDiatonicScales());
            Sets.addArray(ret, [
                ScaleAlt.HARMONIC_MINOR,
                ScaleAlt.LOCRIAN_a6,
                ScaleAlt.IONIAN_a5,
                ScaleAlt.DORIAN_a4,
                ScaleAlt.MIXOLYDIAN_b9_b13,
                ScaleAlt.LYDIAN_a2,
                ScaleAlt.SUPERLOCRIAN_bb7,

                ScaleAlt.HARMONIC_MAJOR,
                ScaleAlt.DORIAN_b5,
                ScaleAlt.PHRYGIAN_b4,
                ScaleAlt.LYDIAN_b3,
                ScaleAlt.MIXOLYDIAN_b2,
                ScaleAlt.AEOLIAN_b1,
                ScaleAlt.LOCRIAN_bb7,

                ScaleAlt.MELODIC_MINOR,
                ScaleAlt.DORIAN_b2,
                ScaleAlt.LYDIAN_a5,
                ScaleAlt.LYDIAN_b7,
                ScaleAlt.MIXOLYDIAN_b13,
                ScaleAlt.LOCRIAN_a2,
                ScaleAlt.SUPERLOCRIAN,

                ScaleAlt.DOUBLE_HARMONIC,
                ScaleAlt.LYDIAN_a2_a6,
                ScaleAlt.ULTRAPHRYGIAN,
                ScaleAlt.HUNGARIAN_MINOR,
                ScaleAlt.ORIENTAL,
                ScaleAlt.IONIAN_AUGMENTED_a2,
                ScaleAlt.LOCRIAN_bb3_bb7,

                ScaleAlt.NEAPOLITAN_MINOR,
                ScaleAlt.NEAPOLITAN_MAJOR
            ]);

            return ret;
        }

        static allBebopScales: () => Set<ScaleAlt> = function () {
            return new Set([
                ScaleAlt.BEBOP_MAJOR,
                ScaleAlt.BEBOP_DORIAN,
                ScaleAlt.BEBOP_DOMINANT,
                ScaleAlt.BEBOP_MELODIC_MINOR,
                ScaleAlt.BEBOP_HARMONIC_MINOR
            ]);
        }

        static allPentatonicScales: () => Set<ScaleAlt> = function () {
            return new Set([
                ScaleAlt.PENTATONIC_MINOR,
                ScaleAlt.PENTATONIC,
                ScaleAlt.EGYPCIAN,
                ScaleAlt.BLUES_MINOR
            ]);
        };

        static allHexatonicScales: () => Set<ScaleAlt> = function () {
            return new Set([
                ScaleAlt.BLUES_b5,
                ScaleAlt.BLUES_a4,
                ScaleAlt.WHOLE_TONE
            ]);
        };

        static common: () => Set<ScaleAlt> = function (): Set<ScaleAlt> {
            let ret = new Set<ScaleAlt>();
            Sets.addSet(ret, ScaleAlt.sets.allHeptatonicScales());
            Sets.addSet(ret, ScaleAlt.sets.allPentatonicScales());
            Sets.addSet(ret, ScaleAlt.sets.allHexatonicScales());
            Sets.addSet(ret, ScaleAlt.sets.allBebopScales());
            Sets.addSet(ret, ScaleAlt.sets.symmetricScales());

            return ret;
        };

        static symmetricScales: () => Set<ScaleAlt> = function () {
            return new Set([
                ScaleAlt.CHROMATIC,
                ScaleAlt.WHOLE_TONE,
                ScaleAlt.AUGMENTED_TRIAD,
                ScaleAlt.DIMINISHED_7th,
                ScaleAlt.MESSIAEN_V_TRUNCATED,
                ScaleAlt.DOM7b5,
                ScaleAlt.MESSIAEN_INV_III_V_TRUNCATED_n2,
                ScaleAlt.HALF_DIMINISHED,
                ScaleAlt.MESSIAEN_V,
                ScaleAlt.RAGA_INDRUPRIYA_INDIA,
                ScaleAlt.MESSIAEN_II_TRUNCATED_n3,
                ScaleAlt.MESSIAEN_III_INV,
                ScaleAlt.MESSIAEN_IV,
                ScaleAlt.MESSIAEN_VI,
                ScaleAlt.MESSIAEN_VII
            ]);
        };
    });
}

let _MAJOR: ScaleAlt, _DORIAN: ScaleAlt, _PHRYGIAN: ScaleAlt, _LYDIAN: ScaleAlt, _MIXOLYDIAN: ScaleAlt, _MINOR: ScaleAlt, _LOCRIAN: ScaleAlt;
let _HARMONIC_MINOR: ScaleAlt, _LOCRIAN_a6: ScaleAlt, _IONIAN_a5: ScaleAlt, _DORIAN_a4: ScaleAlt, _MIXOLYDIAN_b9_b13: ScaleAlt, _LYDIAN_a2: ScaleAlt, _SUPERLOCRIAN_bb7: ScaleAlt;
let _HARMONIC_MAJOR: ScaleAlt, _DORIAN_b5: ScaleAlt, _PHRYGIAN_b4: ScaleAlt, _LYDIAN_b3: ScaleAlt, _MIXOLYDIAN_b2: ScaleAlt, _AEOLIAN_b1: ScaleAlt, _LOCRIAN_bb7: ScaleAlt;
let _MELODIC_MINOR: ScaleAlt, _DORIAN_b2: ScaleAlt, _LYDIAN_a5: ScaleAlt, _LYDIAN_b7: ScaleAlt, _MIXOLYDIAN_b13: ScaleAlt, _LOCRIAN_a2: ScaleAlt, _SUPERLOCRIAN: ScaleAlt;
let _DOUBLE_HARMONIC: ScaleAlt, _LYDIAN_a2_a6: ScaleAlt, _ULTRAPHRYGIAN: ScaleAlt, _HUNGARIAN_MINOR: ScaleAlt, _ORIENTAL: ScaleAlt, _IONIAN_AUGMENTED_a2: ScaleAlt, _LOCRIAN_bb3_bb7: ScaleAlt;
let _NEAPOLITAN_MINOR: ScaleAlt, _NEAPOLITAN_MAJOR: ScaleAlt;
let _BLUES_b5: ScaleAlt, _BLUES_a4: ScaleAlt;
let _PENTATONIC_MINOR: ScaleAlt, _PENTATONIC: ScaleAlt, _EGYPCIAN: ScaleAlt, _BLUES_MINOR: ScaleAlt, _BLUES_MAJOR: ScaleAlt;
let _CHROMATIC: ScaleAlt, _WHOLE_TONE: ScaleAlt, _AUGMENTED_TRIAD: ScaleAlt, _DIMINISHED_7th: ScaleAlt, _DOM7b5: ScaleAlt, _RAGA_INDRUPRIYA_INDIA: ScaleAlt, _HALF_DIMINISHED: ScaleAlt,
    _MESSIAEN_V_TRUNCATED: ScaleAlt, _MESSIAEN_III_INV: ScaleAlt, _MESSIAEN_II_TRUNCATED_n3: ScaleAlt, _MESSIAEN_INV_III_V_TRUNCATED_n2: ScaleAlt, _MESSIAEN_IV: ScaleAlt, _MESSIAEN_V: ScaleAlt, _MESSIAEN_VI: ScaleAlt, _MESSIAEN_VII: ScaleAlt;
let _BEBOP_MAJOR: ScaleAlt, _BEBOP_DORIAN: ScaleAlt, _BEBOP_DOMINANT: ScaleAlt, _BEBOP_MELODIC_MINOR: ScaleAlt, _BEBOP_HARMONIC_MINOR: ScaleAlt;
