import { Settings } from '../config';
import { ScaleAbstract } from './ScaleAbstract';
import { ScaleAlt } from './symbolic/alt/scalealt/ScaleAlt';
import { Scale } from './symbolic/chromatic/scale/Scale';

export class NamingScale {
    private constructor() {
    }

    static toString<I, D>(scale: ScaleAbstract<I, D>): string {
        switch (<any>scale) {
            case Scale.MAJOR:
            case ScaleAlt.MAJOR: return Settings.scales.MAJOR;
            case Scale.MINOR:
            case ScaleAlt.MINOR: return Settings.scales.MINOR;
            case Scale.DORIAN:
            case ScaleAlt.DORIAN: return Settings.scales.DORIAN;
            case Scale.PHRYGIAN:
            case ScaleAlt.PHRYGIAN: return Settings.scales.PHRYGIAN;
            case Scale.LYDIAN:
            case ScaleAlt.LYDIAN: return Settings.scales.LYDIAN;
            case Scale.MIXOLYDIAN:
            case ScaleAlt.MIXOLYDIAN: return Settings.scales.MIXOLYDIAN;
            case Scale.LOCRIAN:
            case ScaleAlt.LOCRIAN: return Settings.scales.LOCRIAN;
            case Scale.HARMONIC_MINOR:
            case ScaleAlt.HARMONIC_MINOR: return Settings.scales.HARMONIC_MINOR;
            case Scale.LOCRIAN_a6:
            case ScaleAlt.LOCRIAN_a6: return Settings.scales.LOCRIAN_a6;
            case Scale.IONIAN_a5:
            case ScaleAlt.IONIAN_a5: return Settings.scales.IONIAN_a5;
            case Scale.DORIAN_a4:
            case ScaleAlt.DORIAN_a4: return Settings.scales.DORIAN_a4;
            case Scale.MIXOLYDIAN_b9_b13:
            case ScaleAlt.MIXOLYDIAN_b9_b13: return Settings.scales.MIXOLYDIAN_b9_b13;
            case Scale.LYDIAN_a2:
            case ScaleAlt.LYDIAN_a2: return Settings.scales.LYDIAN_a2;
            case Scale.SUPERLOCRIAN_bb7:
            case ScaleAlt.SUPERLOCRIAN_bb7: return Settings.scales.SUPERLOCRIAN_bb7;
            case Scale.HARMONIC_MAJOR:
            case ScaleAlt.HARMONIC_MAJOR: return Settings.scales.HARMONIC_MAJOR;
            case Scale.DORIAN_b5:
            case ScaleAlt.DORIAN_b5: return Settings.scales.DORIAN_b5;
            case Scale.PHRYGIAN_b4:
            case ScaleAlt.PHRYGIAN_b4: return Settings.scales.PHRYGIAN_b4;
            case Scale.LYDIAN_b3:
            case ScaleAlt.LYDIAN_b3: return Settings.scales.LYDIAN_b3;
            case Scale.MIXOLYDIAN_b2:
            case ScaleAlt.MIXOLYDIAN_b2: return Settings.scales.MIXOLYDIAN_b2;
            case Scale.AEOLIAN_b1:
            case ScaleAlt.AEOLIAN_b1: return Settings.scales.AEOLIAN_b1;
            case Scale.LOCRIAN_bb7:
            case ScaleAlt.LOCRIAN_bb7: return Settings.scales.LOCRIAN_bb7;
            case Scale.MELODIC_MINOR:
            case ScaleAlt.MELODIC_MINOR: return Settings.scales.MELODIC_MINOR;
            case Scale.DORIAN_b2:
            case ScaleAlt.DORIAN_b2: return Settings.scales.DORIAN_b2;
            case Scale.LYDIAN_a5:
            case ScaleAlt.LYDIAN_a5: return Settings.scales.LYDIAN_a5;
            case Scale.LYDIAN_b7:
            case ScaleAlt.LYDIAN_b7: return Settings.scales.LYDIAN_b7;
            case Scale.MIXOLYDIAN_b13:
            case ScaleAlt.MIXOLYDIAN_b13: return Settings.scales.MIXOLYDIAN_b13;
            case Scale.LOCRIAN_a2:
            case ScaleAlt.LOCRIAN_a2: return Settings.scales.LOCRIAN_a2;
            case Scale.SUPERLOCRIAN:
            case ScaleAlt.SUPERLOCRIAN: return Settings.scales.SUPERLOCRIAN;
            case Scale.DOUBLE_HARMONIC:
            case ScaleAlt.DOUBLE_HARMONIC: return Settings.scales.DOUBLE_HARMONIC;
            case Scale.LYDIAN_a2_a6:
            case ScaleAlt.LYDIAN_a2_a6: return Settings.scales.LYDIAN_a2_a6;
            case Scale.ULTRAPHRYGIAN:
            case ScaleAlt.ULTRAPHRYGIAN: return Settings.scales.ULTRAPHRYGIAN;
            case Scale.HUNGARIAN_MINOR:
            case ScaleAlt.HUNGARIAN_MINOR: return Settings.scales.HUNGARIAN_MINOR;
            case Scale.ORIENTAL:
            case ScaleAlt.ORIENTAL: return Settings.scales.ORIENTAL;
            case Scale.IONIAN_AUGMENTED_a2:
            case ScaleAlt.IONIAN_AUGMENTED_a2: return Settings.scales.IONIAN_AUGMENTED_a2;
            case Scale.LOCRIAN_bb3_bb7:
            case ScaleAlt.LOCRIAN_bb3_bb7: return Settings.scales.LOCRIAN_bb3_bb7;
            case Scale.NEAPOLITAN_MINOR:
            case ScaleAlt.NEAPOLITAN_MINOR: return Settings.scales.NEAPOLITAN_MINOR;
            case Scale.NEAPOLITAN_MAJOR:
            case ScaleAlt.NEAPOLITAN_MAJOR: return Settings.scales.NEAPOLITAN_MAJOR;
            case Scale.BLUES_b5:
            case ScaleAlt.BLUES_b5: return Settings.scales.BLUES_b5;
            case Scale.BLUES_a4:
            case ScaleAlt.BLUES_a4: return Settings.scales.BLUES_a4;
            case Scale.WHOLE_TONE:
            case ScaleAlt.WHOLE_TONE: return Settings.scales.WHOLE_TONE;
            case Scale.PENTATONIC_MINOR:
            case ScaleAlt.PENTATONIC_MINOR: return Settings.scales.PENTATONIC_MINOR;
            case Scale.PENTATONIC:
            case ScaleAlt.PENTATONIC: return Settings.scales.PENTATONIC;
            case Scale.EGYPCIAN:
            case ScaleAlt.EGYPCIAN: return Settings.scales.EGYPCIAN;
            case Scale.BLUES_MINOR:
            case ScaleAlt.BLUES_MINOR: return Settings.scales.BLUES_MINOR;
            case Scale.BLUES_MAJOR:
            case ScaleAlt.BLUES_MAJOR: return Settings.scales.BLUES_MAJOR;
            case Scale.CHROMATIC:
            case ScaleAlt.CHROMATIC: return Settings.scales.CHROMATIC;
            case Scale.AUGMENTED_TRIAD:
            case ScaleAlt.AUGMENTED_TRIAD: return Settings.scales.AUGMENTED_TRIAD;
            case Scale.DIMINISHED_7th:
            case ScaleAlt.DIMINISHED_7th: return Settings.scales.DIMINISHED_7th;
            case Scale.MESSIAEN_V_TRUNCATED:
            case ScaleAlt.MESSIAEN_V_TRUNCATED: return Settings.scales.MESSIAEN_V_TRUNCATED;
            case Scale.DOM7b5:
            case ScaleAlt.DOM7b5: return Settings.scales.DOM7b5;
            case Scale.MESSIAEN_INV_III_V_TRUNCATED_n2:
            case ScaleAlt.MESSIAEN_INV_III_V_TRUNCATED_n2: return Settings.scales.MESSIAEN_INV_III_V_TRUNCATED_n2;
            case Scale.HALF_DIMINISHED:
            case ScaleAlt.HALF_DIMINISHED: return Settings.scales.HALF_DIMINISHED;
            case Scale.MESSIAEN_V:
            case ScaleAlt.MESSIAEN_V: return Settings.scales.MESSIAEN_V;
            case Scale.RAGA_INDRUPRIYA_INDIA:
            case ScaleAlt.RAGA_INDRUPRIYA_INDIA: return Settings.scales.RAGA_INDRUPRIYA_INDIA;
            case Scale.MESSIAEN_II_TRUNCATED_n3:
            case ScaleAlt.MESSIAEN_II_TRUNCATED_n3: return Settings.scales.MESSIAEN_II_TRUNCATED_n3;
            case Scale.MESSIAEN_III_INV:
            case ScaleAlt.MESSIAEN_III_INV: return Settings.scales.MESSIAEN_III_INV;
            case Scale.MESSIAEN_IV:
            case ScaleAlt.MESSIAEN_IV: return Settings.scales.MESSIAEN_IV;
            case Scale.MESSIAEN_VI:
            case ScaleAlt.MESSIAEN_VI: return Settings.scales.MESSIAEN_VI;
            case Scale.MESSIAEN_VII:
            case ScaleAlt.MESSIAEN_VII: return Settings.scales.MESSIAEN_VII;
            case Scale.BEBOP_MAJOR:
            case ScaleAlt.BEBOP_MAJOR: return Settings.scales.BEBOP_MAJOR;
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