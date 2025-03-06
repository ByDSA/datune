/* eslint-disable camelcase */
import type { Scale } from "@datune/core/scales/alt";
import { AEOLIAN_b1, AUGMENTED_TRIAD, BEBOP_MAJOR, BLUES_a4, BLUES_b5, BLUES_MAJOR, BLUES_MINOR, CHROMATIC, DIMINISHED_7th, DOM7b5, DORIAN, DORIAN_a4, DORIAN_b2, DORIAN_b5, DOUBLE_HARMONIC, EGYPCIAN, HALF_DIMINISHED, HARMONIC_MAJOR, HARMONIC_MINOR, HUNGARIAN_MINOR, IONIAN_a5, IONIAN_AUGMENTED_a2, LOCRIAN, LOCRIAN_a2, LOCRIAN_a6, LOCRIAN_bb3_bb7, LOCRIAN_bb7, LYDIAN, LYDIAN_a2, LYDIAN_a2_a6, LYDIAN_a5, LYDIAN_b3, LYDIAN_b7, MAJOR, MELODIC_MINOR, MESSIAEN_III_INV, MESSIAEN_II_TRUNCATED_n3, MESSIAEN_INV_III_V_TRUNCATED_n2, MESSIAEN_IV, MESSIAEN_V, MESSIAEN_VI, MESSIAEN_VII, MESSIAEN_V_TRUNCATED, MINOR, MIXOLYDIAN, MIXOLYDIAN_b13, MIXOLYDIAN_b2, MIXOLYDIAN_b9_b13, NEAPOLITAN_MAJOR, NEAPOLITAN_MINOR, ORIENTAL, PENTATONIC, PENTATONIC_MINOR, PHRYGIAN, PHRYGIAN_b4, RAGA_INDRUPRIYA_INDIA, SUPERLOCRIAN, SUPERLOCRIAN_bb7, ULTRAPHRYGIAN, WHOLE_TONE } from "@datune/core/scales/symbolic/alt/constants";
import { getLangFromOptions } from "lang/Options";
import { Options } from "parsing";
import { toPascalCase } from "parsing/utils";

export function toStringName(scale: Scale, options?: Options): string | null {
  const name = toStringNameInner(scale, options);

  if (name)
    return toPascalCase(name);

  return null;
}

function toStringNameInner(scale: Scale, options?: Options): string | null {
  const lang = getLangFromOptions(options);

  switch (scale) {
    case MAJOR:
      return lang.scales.MAJOR;
    case MINOR:
      return lang.scales.MINOR;
    case DORIAN:
      return lang.scales.DORIAN;
    case PHRYGIAN:
      return lang.scales.PHRYGIAN;
    case LYDIAN:
      return lang.scales.LYDIAN;
    case MIXOLYDIAN:
      return lang.scales.MIXOLYDIAN;
    case LOCRIAN:
      return lang.scales.LOCRIAN;
    case HARMONIC_MINOR:
      return lang.scales.HARMONIC_MINOR;
    case LOCRIAN_a6:
      return lang.scales.LOCRIAN_a6;
    case IONIAN_a5:
      return lang.scales.IONIAN_a5;
    case DORIAN_a4:
      return lang.scales.DORIAN_a4;
    case MIXOLYDIAN_b9_b13:
      return lang.scales.MIXOLYDIAN_b9_b13;
    case LYDIAN_a2:
      return lang.scales.LYDIAN_a2;
    case SUPERLOCRIAN_bb7:
      return lang.scales.SUPERLOCRIAN_bb7;
    case HARMONIC_MAJOR:
      return lang.scales.HARMONIC_MAJOR;
    case DORIAN_b5:
      return lang.scales.DORIAN_b5;
    case PHRYGIAN_b4:
      return lang.scales.PHRYGIAN_b4;
    case LYDIAN_b3:
      return lang.scales.LYDIAN_b3;
    case MIXOLYDIAN_b2:
      return lang.scales.MIXOLYDIAN_b2;
    case AEOLIAN_b1:
      return lang.scales.AEOLIAN_b1;
    case LOCRIAN_bb7:
      return lang.scales.LOCRIAN_bb7;
    case MELODIC_MINOR:
      return lang.scales.MELODIC_MINOR;
    case DORIAN_b2:
      return lang.scales.DORIAN_b2;
    case LYDIAN_a5:
      return lang.scales.LYDIAN_a5;
    case LYDIAN_b7:
      return lang.scales.LYDIAN_b7;
    case MIXOLYDIAN_b13:
      return lang.scales.MIXOLYDIAN_b13;
    case LOCRIAN_a2:
      return lang.scales.LOCRIAN_a2;
    case SUPERLOCRIAN:
      return lang.scales.SUPERLOCRIAN;
    case DOUBLE_HARMONIC:
      return lang.scales.DOUBLE_HARMONIC;
    case LYDIAN_a2_a6:
      return lang.scales.LYDIAN_a2_a6;
    case ULTRAPHRYGIAN:
      return lang.scales.ULTRAPHRYGIAN;
    case HUNGARIAN_MINOR:
      return lang.scales.HUNGARIAN_MINOR;
    case ORIENTAL:
      return lang.scales.ORIENTAL;
    case IONIAN_AUGMENTED_a2:
      return lang.scales.IONIAN_AUGMENTED_a2;
    case LOCRIAN_bb3_bb7:
      return lang.scales.LOCRIAN_bb3_bb7;
    case NEAPOLITAN_MINOR:
      return lang.scales.NEAPOLITAN_MINOR;
    case NEAPOLITAN_MAJOR:
      return lang.scales.NEAPOLITAN_MAJOR;
    case BLUES_b5:
      return lang.scales.BLUES_b5;
    case BLUES_a4:
      return lang.scales.BLUES_a4;
    case WHOLE_TONE:
      return lang.scales.WHOLE_TONE;
    case PENTATONIC_MINOR:
      return lang.scales.PENTATONIC_MINOR;
    case PENTATONIC:
      return lang.scales.PENTATONIC;
    case EGYPCIAN:
      return lang.scales.EGYPCIAN;
    case BLUES_MINOR:
      return lang.scales.BLUES_MINOR;
    case BLUES_MAJOR:
      return lang.scales.BLUES_MAJOR;
    case CHROMATIC:
      return lang.scales.CHROMATIC;
    case AUGMENTED_TRIAD:
      return lang.scales.AUGMENTED_TRIAD;
    case DIMINISHED_7th:
      return lang.scales.DIMINISHED_7th;
    case MESSIAEN_V_TRUNCATED:
      return lang.scales.MESSIAEN_V_TRUNCATED;
    case DOM7b5:
      return lang.scales.DOM7b5;
    case MESSIAEN_INV_III_V_TRUNCATED_n2:
      return lang.scales.MESSIAEN_INV_III_V_TRUNCATED_n2;
    case HALF_DIMINISHED:
      return lang.scales.HALF_DIMINISHED;
    case MESSIAEN_V:
      return lang.scales.MESSIAEN_V;
    case RAGA_INDRUPRIYA_INDIA:
      return lang.scales.RAGA_INDRUPRIYA_INDIA;
    case MESSIAEN_II_TRUNCATED_n3:
      return lang.scales.MESSIAEN_II_TRUNCATED_n3;
    case MESSIAEN_III_INV:
      return lang.scales.MESSIAEN_III_INV;
    case MESSIAEN_IV:
      return lang.scales.MESSIAEN_IV;
    case MESSIAEN_VI:
      return lang.scales.MESSIAEN_VI;
    case MESSIAEN_VII:
      return lang.scales.MESSIAEN_VII;
    case BEBOP_MAJOR:
      return lang.scales.BEBOP_MAJOR;
    default: return null;
  }
}
