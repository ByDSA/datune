import { NonEmptyArray } from '@datune/utils';
import { Settings } from '../../../../config';
import { ChromaticInterval } from '../../../../intervals';
import { ChromaticPattern } from '../../../../voicings/relative/chromatic/ChromaticPattern';
import { NamingScale } from '../../../NamingScale';
import { ScaleAbstract } from '../../../ScaleAbstract';
import { Degree } from '../degree/Degree';
import { HashingObject, ScaleCache } from './building/cache/ScaleCache';

type Interval = ChromaticInterval;
type IntervalArray = NonEmptyArray<Interval>;
type ScaleDegree = Degree;
export type ScaleArray = NonEmptyArray<Scale>;
export class Scale extends ScaleAbstract<Interval, ScaleDegree> {
    private static _cache = new ScaleCache((hashingObject: HashingObject) => new Scale(...hashingObject));

    private constructor(...intervals: IntervalArray) {
        super(...intervals);
    }

    static fromIntraIntervals(...intraIntervals: IntervalArray): Scale {
        return Scale._cache.getOrCreate(intraIntervals);
    }

    static fromRootIntervals(...rootIntervals: IntervalArray): Scale {
        let intraIntervals: number[] = [];
        for (let i = 1; i < rootIntervals.length; i++) {
            let intraIntervals_i = rootIntervals[i] - rootIntervals[i - 1];
            intraIntervals.push(intraIntervals_i);
        }

        intraIntervals.push(12 - rootIntervals[rootIntervals.length - 1])

        return this.fromIntraIntervals(...<IntervalArray>intraIntervals);
    }

    getMode(n: number): Scale {
        let intraIntervals = this.getModeIntraIntervals(n);
        return <Scale>Scale.fromIntraIntervals(...intraIntervals);
    }

    static fromString(strValue: string): Scale | null {
        let srtValueInput = strValue;
        strValue = this.normalizeInputString(strValue);

        let scale: Scale | null;

        scale = this.fromStringName(strValue);
        if (scale)
            return scale;

        scale = this.fromStringCode(srtValueInput);
        if (scale)
            return scale;

        return null;
    }

    static fromStringCode(strValue: string): Scale | null {
        let splitedStr: string[] | null = this.splitArray(strValue);
        if (!splitedStr)
            return null;

        let splitedNumbers: Interval[] = splitedStr.map(str => +str);
        splitedNumbers = splitedNumbers.filter(el => !isNaN(el));

        if (splitedNumbers.length == 0)
            return null;

        return Scale.fromIntraIntervals(...<IntervalArray>splitedNumbers);
    }

    private static splitArray(str: string): string[] | null {
        let splited: string[] = str.split(/\s|,|-|:/);

        splited = splited.filter(el => el != null && el != "");

        if (splited.length > 1)
            return splited;

        return null;
    }

    private static fromStringName(str: string): Scale | null {
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

    get pattern(): ChromaticPattern {
        return ChromaticPattern.fromRootIntervals(...this.intraIntervals);
    }

    protected calcDegrees(): NonEmptyArray<Degree> {
        let acc = Degree.I;
        let ret: NonEmptyArray<Degree> = [acc];
        for (let i = 0; i < this._intraIntervals.length - 1; i++) {
            acc += this._intraIntervals[i];
            ret.push(acc);
        }

        return ret;
    }

    get modes(): Scale[] {
        return <Scale[]>super.modes;
    }

    // General

    toString(): string {
        return NamingScale.toString(this);
    }

    /** @interal */
    hashCode(): string {
        let ret = "";
        for (const interval of this._intraIntervals)
            ret += interval + "-";

        return ret;
    }


    // SETS
    static get MAJOR(): Scale {
        return <Scale>Scale.fromIntraIntervals(2, 2, 1, 2, 2, 2, 1);
    }
    static get DORIAN(): Scale {
        return Scale.MAJOR.getMode(2);
    }
    static get PHRYGIAN(): Scale {
        return Scale.MAJOR.getMode(3);
    }
    static get LYDIAN(): Scale {
        return Scale.MAJOR.getMode(4);
    }
    static get MIXOLYDIAN(): Scale {
        return Scale.MAJOR.getMode(5);
    }
    static get MINOR(): Scale {
        return Scale.MAJOR.getMode(6);
    }
    static get LOCRIAN(): Scale {
        return Scale.MAJOR.getMode(7);
    }
    static get HARMONIC_MINOR(): Scale {
        return <Scale>Scale.fromIntraIntervals(2, 1, 2, 2, 1, 3, 1);
    }
    static get LOCRIAN_a6(): Scale {
        return Scale.HARMONIC_MINOR.getMode(2);
    }
    static get IONIAN_a5(): Scale {
        return Scale.HARMONIC_MINOR.getMode(3);
    }
    static get DORIAN_a4(): Scale {
        return Scale.HARMONIC_MINOR.getMode(4);
    }
    static get MIXOLYDIAN_b9_b13(): Scale {
        return Scale.HARMONIC_MINOR.getMode(5);
    }
    static get LYDIAN_a2(): Scale {
        return Scale.HARMONIC_MINOR.getMode(6);
    }
    static get SUPERLOCRIAN_bb7(): Scale {
        return Scale.HARMONIC_MINOR.getMode(7);
    }
    static get HARMONIC_MAJOR(): Scale {
        return <Scale>Scale.fromIntraIntervals(2, 2, 1, 2, 1, 3, 1);
    }
    static get DORIAN_b5(): Scale {
        return Scale.HARMONIC_MAJOR.getMode(2);
    }
    static get PHRYGIAN_b4(): Scale {
        return Scale.HARMONIC_MAJOR.getMode(3);
    }
    static get LYDIAN_b3(): Scale {
        return Scale.HARMONIC_MAJOR.getMode(4);
    }
    static get MIXOLYDIAN_b2(): Scale {
        return Scale.HARMONIC_MAJOR.getMode(5);
    }
    static get AEOLIAN_b1(): Scale {
        return Scale.HARMONIC_MAJOR.getMode(6);
    }
    static get LOCRIAN_bb7(): Scale {
        return Scale.HARMONIC_MAJOR.getMode(7);
    }
    static get MELODIC_MINOR(): Scale {
        return <Scale>Scale.fromIntraIntervals(2, 1, 2, 2, 2, 2, 1);
    }
    static get DORIAN_b2(): Scale {
        return Scale.MELODIC_MINOR.getMode(2);
    }
    static get LYDIAN_a5(): Scale {
        return Scale.MELODIC_MINOR.getMode(3);
    }
    static get LYDIAN_b7(): Scale {
        return Scale.MELODIC_MINOR.getMode(4);
    }
    static get MIXOLYDIAN_b13(): Scale {
        return Scale.MELODIC_MINOR.getMode(5);
    }
    static get LOCRIAN_a2(): Scale {
        return Scale.MELODIC_MINOR.getMode(6);
    }
    static get SUPERLOCRIAN(): Scale {
        return Scale.MELODIC_MINOR.getMode(7);
    }
    static get DOUBLE_HARMONIC(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 3, 1, 2, 1, 3, 1);
    }
    static get LYDIAN_a2_a6(): Scale {
        return Scale.DOUBLE_HARMONIC.getMode(2);
    }
    static get ULTRAPHRYGIAN(): Scale {
        return Scale.DOUBLE_HARMONIC.getMode(3);
    }
    static get HUNGARIAN_MINOR(): Scale {
        return Scale.DOUBLE_HARMONIC.getMode(4);
    }
    static get ORIENTAL(): Scale {
        return Scale.DOUBLE_HARMONIC.getMode(5);
    }
    static get IONIAN_AUGMENTED_a2(): Scale {
        return Scale.DOUBLE_HARMONIC.getMode(6);
    }
    static get LOCRIAN_bb3_bb7(): Scale {
        return Scale.DOUBLE_HARMONIC.getMode(7);
    }
    static get NEAPOLITAN_MINOR(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 2, 2, 2, 1, 3, 1);
    }
    static get NEAPOLITAN_MAJOR(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 2, 2, 2, 2, 2, 1);
    }
    static get MESSIAEN_V_TRUNCATED(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 5, 1, 5);
    }
    static get MESSIAEN_INV_III_V_TRUNCATED_n2(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 3, 1, 3, 1, 3);
    }
    static get HALF_DIMINISHED(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 2, 1, 2, 1, 2, 1, 2);
    }
    static get MESSIAEN_V(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 1, 4, 1, 1, 4);
    }
    static get RAGA_INDRUPRIYA_INDIA(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 3, 2, 3, 1, 2);
    }
    static get MESSIAEN_II_TRUNCATED_n3(): Scale {
        return <Scale>Scale.fromIntraIntervals(3, 1, 2, 3, 1, 2);
    }
    static get MESSIAEN_III_INV(): Scale {
        return <Scale>Scale.fromIntraIntervals(2, 1, 1, 2, 1, 1, 2, 1, 1);
    }
    static get MESSIAEN_IV(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 1, 1, 3, 1, 1, 1, 3);
    }
    static get MESSIAEN_VI(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 1, 2, 2, 1, 1, 2, 2);
    }
    static get MESSIAEN_VII(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 1, 1, 1, 2, 1, 1, 1, 1, 2);
    }
    static get BLUES_b5(): Scale {
        return <Scale>Scale.fromIntraIntervals(3, 2, 1, 1, 3, 2);
    }
    static get BLUES_a4(): Scale {
        return Scale.BLUES_b5;

        // 5
    }
    static get PENTATONIC_MINOR(): Scale {
        return <Scale>Scale.fromIntraIntervals(3, 2, 2, 3, 2);
    }
    static get PENTATONIC(): Scale {
        return Scale.PENTATONIC_MINOR.getMode(2);
    }
    static get EGYPCIAN(): Scale {
        return Scale.PENTATONIC_MINOR.getMode(3);
    }
    static get BLUES_MINOR(): Scale {
        return Scale.PENTATONIC_MINOR.getMode(4);
    }
    static get BLUES_MAJOR(): Scale {
        return Scale.PENTATONIC_MINOR.getMode(5);

        // Symmetric
    }
    static get CHROMATIC(): Scale {
        return <Scale>Scale.fromIntraIntervals(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
    }
    static get WHOLE_TONE(): Scale {
        return <Scale>Scale.fromIntraIntervals(2, 2, 2, 2, 2, 2);
    }
    static get AUGMENTED_TRIAD(): Scale {
        return <Scale>Scale.fromIntraIntervals(4, 4, 4);
    }
    static get DIMINISHED_7th(): Scale {
        return <Scale>Scale.fromIntraIntervals(3, 3, 3, 3);
    }
    static get DOM7b5(): Scale {
        return <Scale>Scale.fromIntraIntervals(4, 2, 4, 2);
    }

    // Bebop
    static get BEBOP_MAJOR(): Scale {
        return <Scale>Scale.fromRootIntervals(
            Scale.MAJOR.degrees[0],
            Scale.MAJOR.degrees[1],
            Scale.MAJOR.degrees[2],
            Scale.MAJOR.degrees[3],
            Scale.MAJOR.degrees[4],
            8,
            Scale.MAJOR.degrees[5],
            Scale.MAJOR.degrees[6]
        );
    }

    static get BEBOP_DORIAN(): Scale {
        return <Scale>Scale.fromRootIntervals(
            Scale.DORIAN.degrees[0],
            Scale.DORIAN.degrees[1],
            Scale.DORIAN.degrees[2],
            4,
            Scale.DORIAN.degrees[3],
            Scale.DORIAN.degrees[4],
            Scale.DORIAN.degrees[5],
            Scale.DORIAN.degrees[6]
        );
    }

    static get BEBOP_DOMINANT(): Scale {
        return <Scale>Scale.fromRootIntervals(
            Scale.MIXOLYDIAN.degrees[0],
            Scale.MIXOLYDIAN.degrees[1],
            Scale.MIXOLYDIAN.degrees[2],
            Scale.MIXOLYDIAN.degrees[3],
            Scale.MIXOLYDIAN.degrees[4],
            Scale.MIXOLYDIAN.degrees[5],
            Scale.MIXOLYDIAN.degrees[6],
            11,
        );
    }

    static get BEBOP_MELODIC_MINOR(): Scale {
        return <Scale>Scale.fromRootIntervals(
            Scale.MELODIC_MINOR.degrees[0],
            Scale.MELODIC_MINOR.degrees[1],
            Scale.MELODIC_MINOR.degrees[2],
            Scale.MELODIC_MINOR.degrees[3],
            Scale.MELODIC_MINOR.degrees[4],
            8,
            Scale.MELODIC_MINOR.degrees[5],
            Scale.MELODIC_MINOR.degrees[6]
        );
    }

    static get BEBOP_HARMONIC_MINOR(): Scale {
        return <Scale>Scale.fromRootIntervals(
            Scale.HARMONIC_MINOR.degrees[0],
            Scale.HARMONIC_MINOR.degrees[1],
            Scale.HARMONIC_MINOR.degrees[2],
            Scale.HARMONIC_MINOR.degrees[3],
            Scale.HARMONIC_MINOR.degrees[4],
            Scale.HARMONIC_MINOR.degrees[5],
            10,
            Scale.HARMONIC_MINOR.degrees[6]
        );
    }

    static sets = (class {
        static allDiatonicScales: () => Scale[] = function () {
            return [
                Scale.MAJOR,
                Scale.DORIAN,
                Scale.PHRYGIAN,
                Scale.LYDIAN,
                Scale.MIXOLYDIAN,
                Scale.MINOR,
                Scale.LOCRIAN
            ];
        };

        static allHeptatonicScales: () => Scale[] = function () {
            let ret: Scale[] = [];
            ret = ret.concat(Scale.sets.allDiatonicScales());
            ret = ret.concat([
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

            return ret;
        };

        static allBebopScales: () => Scale[] = function () {
            return [
                Scale.BEBOP_MAJOR,
                Scale.BEBOP_DORIAN,
                Scale.BEBOP_DOMINANT,
                Scale.BEBOP_MELODIC_MINOR,
                Scale.BEBOP_HARMONIC_MINOR
            ];
        };

        static allPentatonicScales: () => Scale[] = function () {
            return [
                Scale.PENTATONIC_MINOR,
                Scale.PENTATONIC,
                Scale.EGYPCIAN,
                Scale.BLUES_MINOR
            ];
        }

        static allHexatonicScales: () => Scale[] = function () {
            return [
                Scale.BLUES_b5,
                Scale.BLUES_a4,
                Scale.WHOLE_TONE
            ];
        }

        static all: () => Scale[] = function (): Scale[] {
            let ret: Scale[];
            ret = Scale.sets.allHeptatonicScales();
            ret = ret.concat(Scale.sets.allPentatonicScales());
            ret = ret.concat(Scale.sets.allHexatonicScales());
            ret = ret.concat(Scale.sets.allBebopScales());
            ret = ret.concat(Scale.sets.symmetricScales());

            return ret;
        }

        static symmetricScales: () => Scale[] = function () {
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
    });
}