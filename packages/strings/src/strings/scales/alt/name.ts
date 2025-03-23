import type { Scale } from "@datune/core/scales/alt";
import { Scales as S } from "@datune/core/scales/symbolic/alt";
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
    case S.MAJOR:
      return lang.scales.MAJOR;
    case S.MINOR:
      return lang.scales.MINOR;
    case S.DORIAN:
      return lang.scales.DORIAN;
    case S.PHRYGIAN:
      return lang.scales.PHRYGIAN;
    case S.LYDIAN:
      return lang.scales.LYDIAN;
    case S.MIXOLYDIAN:
      return lang.scales.MIXOLYDIAN;
    case S.LOCRIAN:
      return lang.scales.LOCRIAN;
    case S.HARMONIC_MINOR:
      return lang.scales.HARMONIC_MINOR;
    case S.LOCRIAN_a6:
      return lang.scales.LOCRIAN_a6;
    case S.IONIAN_a5:
      return lang.scales.IONIAN_a5;
    case S.DORIAN_a4:
      return lang.scales.DORIAN_a4;
    case S.MIXOLYDIAN_b9_b13:
      return lang.scales.MIXOLYDIAN_b9_b13;
    case S.LYDIAN_a2:
      return lang.scales.LYDIAN_a2;
    case S.SUPERLOCRIAN_bb7:
      return lang.scales.SUPERLOCRIAN_bb7;
    case S.HARMONIC_MAJOR:
      return lang.scales.HARMONIC_MAJOR;
    case S.DORIAN_b5:
      return lang.scales.DORIAN_b5;
    case S.PHRYGIAN_b4:
      return lang.scales.PHRYGIAN_b4;
    case S.LYDIAN_b3:
      return lang.scales.LYDIAN_b3;
    case S.MIXOLYDIAN_b2:
      return lang.scales.MIXOLYDIAN_b2;
    case S.AEOLIAN_b1:
      return lang.scales.AEOLIAN_b1;
    case S.LOCRIAN_bb7:
      return lang.scales.LOCRIAN_bb7;
    case S.MELODIC_MINOR:
      return lang.scales.MELODIC_MINOR;
    case S.DORIAN_b2:
      return lang.scales.DORIAN_b2;
    case S.LYDIAN_a5:
      return lang.scales.LYDIAN_a5;
    case S.LYDIAN_b7:
      return lang.scales.LYDIAN_b7;
    case S.MIXOLYDIAN_b13:
      return lang.scales.MIXOLYDIAN_b13;
    case S.LOCRIAN_a2:
      return lang.scales.LOCRIAN_a2;
    case S.SUPERLOCRIAN:
      return lang.scales.SUPERLOCRIAN;
    case S.DOUBLE_HARMONIC:
      return lang.scales.DOUBLE_HARMONIC;
    case S.LYDIAN_a2_a6:
      return lang.scales.LYDIAN_a2_a6;
    case S.ULTRAPHRYGIAN:
      return lang.scales.ULTRAPHRYGIAN;
    case S.HUNGARIAN_MINOR:
      return lang.scales.HUNGARIAN_MINOR;
    case S.ORIENTAL:
      return lang.scales.ORIENTAL;
    case S.IONIAN_AUGMENTED_a2:
      return lang.scales.IONIAN_AUGMENTED_a2;
    case S.LOCRIAN_bb3_bb7:
      return lang.scales.LOCRIAN_bb3_bb7;
    case S.NEAPOLITAN_MINOR:
      return lang.scales.NEAPOLITAN_MINOR;
    case S.NEAPOLITAN_MAJOR:
      return lang.scales.NEAPOLITAN_MAJOR;
    case S.BLUES_b5:
      return lang.scales.BLUES_b5;
    case S.BLUES_a4:
      return lang.scales.BLUES_a4;
    case S.WHOLE_TONE:
      return lang.scales.WHOLE_TONE;
    case S.PENTATONIC_MINOR:
      return lang.scales.PENTATONIC_MINOR;
    case S.PENTATONIC:
      return lang.scales.PENTATONIC;
    case S.EGYPCIAN:
      return lang.scales.EGYPCIAN;
    case S.BLUES_MINOR:
      return lang.scales.BLUES_MINOR;
    case S.BLUES_MAJOR:
      return lang.scales.BLUES_MAJOR;
    case S.CHROMATIC:
      return lang.scales.CHROMATIC;
    case S.AUGMENTED_TRIAD:
      return lang.scales.AUGMENTED_TRIAD;
    case S.DIMINISHED_7th:
      return lang.scales.DIMINISHED_7th;
    case S.MESSIAEN_V_TRUNCATED:
      return lang.scales.MESSIAEN_V_TRUNCATED;
    case S.DOM7b5:
      return lang.scales.DOM7b5;
    case S.MESSIAEN_INV_III_V_TRUNCATED_n2:
      return lang.scales.MESSIAEN_INV_III_V_TRUNCATED_n2;
    case S.HALF_DIMINISHED:
      return lang.scales.HALF_DIMINISHED;
    case S.MESSIAEN_V:
      return lang.scales.MESSIAEN_V;
    case S.RAGA_INDRUPRIYA_INDIA:
      return lang.scales.RAGA_INDRUPRIYA_INDIA;
    case S.MESSIAEN_II_TRUNCATED_n3:
      return lang.scales.MESSIAEN_II_TRUNCATED_n3;
    case S.MESSIAEN_III_INV:
      return lang.scales.MESSIAEN_III_INV;
    case S.MESSIAEN_IV:
      return lang.scales.MESSIAEN_IV;
    case S.MESSIAEN_VI:
      return lang.scales.MESSIAEN_VI;
    case S.MESSIAEN_VII:
      return lang.scales.MESSIAEN_VII;
    case S.BEBOP_MAJOR:
      return lang.scales.BEBOP_MAJOR;
    default: return null;
  }
}
