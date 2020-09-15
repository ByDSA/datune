import { ScaleAbstract } from '../../scales/ScaleAbstract';
import { ScaleChromatic } from '../../scales/ScaleChromatic';
import { Settings } from '../../settings/Settings';
import { Scale } from '../../scales/scale';

export class NamingScale {
    private constructor() {
    }

    static toString<I, D>(scale: ScaleAbstract<I, D>): string {
        switch (<any>scale) {
            case ScaleChromatic.MAJOR:
            case Scale.MAJOR: return Settings.scales.MAJOR;
            case ScaleChromatic.MINOR:
            case Scale.MINOR: return Settings.scales.MINOR;
            case ScaleChromatic.DORIAN:
            case Scale.DORIAN: return Settings.scales.DORIAN;
            case ScaleChromatic.PHRYGIAN:
            case Scale.PHRYGIAN: return Settings.scales.PHRYGIAN;
            case ScaleChromatic.LYDIAN:
            case Scale.LYDIAN: return Settings.scales.LYDIAN;
            case ScaleChromatic.MIXOLYDIAN:
            case Scale.MIXOLYDIAN: return Settings.scales.MIXOLYDIAN;
            case ScaleChromatic.LOCRIAN:
            case Scale.LOCRIAN: return Settings.scales.LOCRIAN;
            case ScaleChromatic.HARMONIC_MINOR:
            case Scale.HARMONIC_MINOR: return Settings.scales.HARMONIC_MINOR;
            case ScaleChromatic.LOCRIAN_a6:
            case Scale.LOCRIAN_a6: return Settings.scales.LOCRIAN_a6;
            case ScaleChromatic.IONIAN_a5:
            case Scale.IONIAN_a5: return Settings.scales.IONIAN_a5;
            case ScaleChromatic.DORIAN_a4:
            case Scale.DORIAN_a4: return Settings.scales.DORIAN_a4;
            case ScaleChromatic.MIXOLYDIAN_b9_b13:
            case Scale.MIXOLYDIAN_b9_b13: return Settings.scales.MIXOLYDIAN_b9_b13;
            case ScaleChromatic.LYDIAN_a2:
            case Scale.LYDIAN_a2: return Settings.scales.LYDIAN_a2;
            case ScaleChromatic.SUPERLOCRIAN_bb7:
            case Scale.SUPERLOCRIAN_bb7: return Settings.scales.SUPERLOCRIAN_bb7;
            case ScaleChromatic.HARMONIC_MAJOR:
            case Scale.HARMONIC_MAJOR: return Settings.scales.HARMONIC_MAJOR;
            case ScaleChromatic.DORIAN_b5:
            case Scale.DORIAN_b5: return Settings.scales.DORIAN_b5;
            case ScaleChromatic.PHRYGIAN_b4:
            case Scale.PHRYGIAN_b4: return Settings.scales.PHRYGIAN_b4;
            case ScaleChromatic.LYDIAN_b3:
            case Scale.LYDIAN_b3: return Settings.scales.LYDIAN_b3;
            case ScaleChromatic.MIXOLYDIAN_b2:
            case Scale.MIXOLYDIAN_b2: return Settings.scales.MIXOLYDIAN_b2;
            case ScaleChromatic.AEOLIAN_b1:
            case Scale.AEOLIAN_b1: return Settings.scales.AEOLIAN_b1;
            case ScaleChromatic.LOCRIAN_bb7:
            case Scale.LOCRIAN_bb7: return Settings.scales.LOCRIAN_bb7;
            case ScaleChromatic.MELODIC_MINOR:
            case Scale.MELODIC_MINOR: return Settings.scales.MELODIC_MINOR;
            case ScaleChromatic.DORIAN_b2:
            case Scale.DORIAN_b2: return Settings.scales.DORIAN_b2;
            case ScaleChromatic.LYDIAN_a5:
            case Scale.LYDIAN_a5: return Settings.scales.LYDIAN_a5;
            case ScaleChromatic.LYDIAN_b7:
            case Scale.LYDIAN_b7: return Settings.scales.LYDIAN_b7;
            case ScaleChromatic.MIXOLYDIAN_b13:
            case Scale.MIXOLYDIAN_b13: return Settings.scales.MIXOLYDIAN_b13;
            case ScaleChromatic.LOCRIAN_a2:
            case Scale.LOCRIAN_a2: return Settings.scales.LOCRIAN_a2;
            case ScaleChromatic.SUPERLOCRIAN:
            case Scale.SUPERLOCRIAN: return Settings.scales.SUPERLOCRIAN;
            case ScaleChromatic.DOUBLE_HARMONIC:
            case Scale.DOUBLE_HARMONIC: return Settings.scales.DOUBLE_HARMONIC;
            case ScaleChromatic.LYDIAN_a2_a6:
            case Scale.LYDIAN_a2_a6: return Settings.scales.LYDIAN_a2_a6;
            case ScaleChromatic.ULTRAPHRYGIAN:
            case Scale.ULTRAPHRYGIAN: return Settings.scales.ULTRAPHRYGIAN;
            case ScaleChromatic.HUNGARIAN_MINOR:
            case Scale.HUNGARIAN_MINOR: return Settings.scales.HUNGARIAN_MINOR;
            case ScaleChromatic.ORIENTAL:
            case Scale.ORIENTAL: return Settings.scales.ORIENTAL;
            case ScaleChromatic.IONIAN_AUGMENTED_a2:
            case Scale.IONIAN_AUGMENTED_a2: return Settings.scales.IONIAN_AUGMENTED_a2;
            case ScaleChromatic.LOCRIAN_bb3_bb7:
            case Scale.LOCRIAN_bb3_bb7: return Settings.scales.LOCRIAN_bb3_bb7;
            case ScaleChromatic.NEAPOLITAN_MINOR:
            case Scale.NEAPOLITAN_MINOR: return Settings.scales.NEAPOLITAN_MINOR;
            case ScaleChromatic.NEAPOLITAN_MAJOR:
            case Scale.NEAPOLITAN_MAJOR: return Settings.scales.NEAPOLITAN_MAJOR;
            case ScaleChromatic.BLUES_b5:
            case Scale.BLUES_b5: return Settings.scales.BLUES_b5;
            case ScaleChromatic.BLUES_a4:
            case Scale.BLUES_a4: return Settings.scales.BLUES_a4;
            case ScaleChromatic.WHOLE_TONE:
            case Scale.WHOLE_TONE: return Settings.scales.WHOLE_TONE;
            case ScaleChromatic.PENTATONIC_MINOR:
            case Scale.PENTATONIC_MINOR: return Settings.scales.PENTATONIC_MINOR;
            case ScaleChromatic.PENTATONIC:
            case Scale.PENTATONIC: return Settings.scales.PENTATONIC;
            case ScaleChromatic.EGYPCIAN:
            case Scale.EGYPCIAN: return Settings.scales.EGYPCIAN;
            case ScaleChromatic.BLUES_MINOR:
            case Scale.BLUES_MINOR: return Settings.scales.BLUES_MINOR;
            case ScaleChromatic.BLUES_MAJOR:
            case Scale.BLUES_MAJOR: return Settings.scales.BLUES_MAJOR;
            case ScaleChromatic.CHROMATIC:
            case Scale.CHROMATIC: return Settings.scales.CHROMATIC;
            case ScaleChromatic.AUGMENTED_TRIAD:
            case Scale.AUGMENTED_TRIAD: return Settings.scales.AUGMENTED_TRIAD;
            case ScaleChromatic.DIMINISHED_7th:
            case Scale.DIMINISHED_7th: return Settings.scales.DIMINISHED_7th;
            case ScaleChromatic.MESSIAEN_V_TRUNCATED:
            case Scale.MESSIAEN_V_TRUNCATED: return Settings.scales.MESSIAEN_V_TRUNCATED;
            case ScaleChromatic.DOM7b5:
            case Scale.DOM7b5: return Settings.scales.DOM7b5;
            case ScaleChromatic.MESSIAEN_INV_III_V_TRUNCATED_n2:
            case Scale.MESSIAEN_INV_III_V_TRUNCATED_n2: return Settings.scales.MESSIAEN_INV_III_V_TRUNCATED_n2;
            case ScaleChromatic.HALF_DIMINISHED:
            case Scale.HALF_DIMINISHED: return Settings.scales.HALF_DIMINISHED;
            case ScaleChromatic.MESSIAEN_V:
            case Scale.MESSIAEN_V: return Settings.scales.MESSIAEN_V;
            case ScaleChromatic.RAGA_INDRUPRIYA_INDIA:
            case Scale.RAGA_INDRUPRIYA_INDIA: return Settings.scales.RAGA_INDRUPRIYA_INDIA;
            case ScaleChromatic.MESSIAEN_II_TRUNCATED_n3:
            case Scale.MESSIAEN_II_TRUNCATED_n3: return Settings.scales.MESSIAEN_II_TRUNCATED_n3;
            case ScaleChromatic.MESSIAEN_III_INV:
            case Scale.MESSIAEN_III_INV: return Settings.scales.MESSIAEN_III_INV;
            case ScaleChromatic.MESSIAEN_IV:
            case Scale.MESSIAEN_IV: return Settings.scales.MESSIAEN_IV;
            case ScaleChromatic.MESSIAEN_VI:
            case Scale.MESSIAEN_VI: return Settings.scales.MESSIAEN_VI;
            case ScaleChromatic.MESSIAEN_VII:
            case Scale.MESSIAEN_VII: return Settings.scales.MESSIAEN_VII;
            case ScaleChromatic.BEBOP_MAJOR:
            case Scale.BEBOP_MAJOR: return Settings.scales.BEBOP_MAJOR;
        }

        return this.scaleToStringByIntervals(scale);
    }

    private static scaleToStringByIntervals<D, I>(scale: ScaleAbstract<D, I>): string {
        let first = true;
        let ret: string = "";
        scale.intraIntervals.forEach(i => {
            if (first)
                first = false;
            else
                ret += "-";
            ret += i;
        });

        return ret;
    }
}