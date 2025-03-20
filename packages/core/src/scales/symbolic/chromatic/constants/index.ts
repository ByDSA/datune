/* eslint-disable camelcase */
import type { Scale } from "../Scale";
import { NonEmptyNumberArray } from "datils/datatypes";
import { deepFreeze } from "datils/datatypes/objects";
import { fromIntraIntervals, fromRootIntervals } from "../building";
import { mode } from "../modifiers";
import { MAJOR_SCALE_DEGREES } from "./majorScaleDegrees";

export function initialize() {
  if (MAJOR)
    throw new Error("Already initialized");

  MAJOR = fromRootIntervals(...MAJOR_SCALE_DEGREES as NonEmptyNumberArray);
  MAJOR.toString = (): string => "Major";
  IONIAN = MAJOR;

  DORIAN = mode(MAJOR, 2);

  PHRYGIAN = mode(MAJOR, 3);

  LYDIAN = mode(MAJOR, 4);

  MIXOLYDIAN = mode(MAJOR, 5);

  MINOR = mode(MAJOR, 6);
  MINOR.toString = (): string => "Minor";
  AEOLIAN = MINOR;

  LOCRIAN = mode(MAJOR, 7);

  HARMONIC_MINOR = fromIntraIntervals(2, 1, 2, 2, 1, 3, 1);

  LOCRIAN_a6 = mode(HARMONIC_MINOR, 2);

  IONIAN_a5 = mode(HARMONIC_MINOR, 3);

  DORIAN_a4 = mode(HARMONIC_MINOR, 4);

  MIXOLYDIAN_b9_b13 = mode(HARMONIC_MINOR, 5);

  LYDIAN_a2 = mode(HARMONIC_MINOR, 6);

  SUPERLOCRIAN_bb7 = mode(HARMONIC_MINOR, 7);

  HARMONIC_MAJOR = fromIntraIntervals(2, 2, 1, 2, 1, 3, 1);

  DORIAN_b5 = mode(HARMONIC_MAJOR, 2);

  PHRYGIAN_b4 = mode(HARMONIC_MAJOR, 3);

  LYDIAN_b3 = mode(HARMONIC_MAJOR, 4);

  MIXOLYDIAN_b2 = mode(HARMONIC_MAJOR, 5);

  AEOLIAN_b1 = mode(HARMONIC_MAJOR, 6);

  LOCRIAN_bb7 = mode(HARMONIC_MAJOR, 7);

  MELODIC_MINOR = fromIntraIntervals(2, 1, 2, 2, 2, 2, 1);

  DORIAN_b2 = mode(MELODIC_MINOR, 2);

  LYDIAN_a5 = mode(MELODIC_MINOR, 3);

  LYDIAN_b7 = mode(MELODIC_MINOR, 4);

  MIXOLYDIAN_b13 = mode(MELODIC_MINOR, 5);

  LOCRIAN_a2 = mode(MELODIC_MINOR, 6);

  SUPERLOCRIAN = mode(MELODIC_MINOR, 7);

  DOUBLE_HARMONIC = fromIntraIntervals(1, 3, 1, 2, 1, 3, 1);

  LYDIAN_a2_a6 = mode(DOUBLE_HARMONIC, 2);

  ULTRAPHRYGIAN = mode(DOUBLE_HARMONIC, 3);

  HUNGARIAN_MINOR = mode(DOUBLE_HARMONIC, 4);

  ORIENTAL = mode(DOUBLE_HARMONIC, 5);

  IONIAN_AUGMENTED_a2 = mode(DOUBLE_HARMONIC, 6);

  LOCRIAN_bb3_bb7 = mode(DOUBLE_HARMONIC, 7);

  NEAPOLITAN_MINOR = fromIntraIntervals(1, 2, 2, 2, 1, 3, 1);

  NEAPOLITAN_MAJOR = fromIntraIntervals(1, 2, 2, 2, 2, 2, 1);

  MESSIAEN_V_TRUNCATED = fromIntraIntervals(1, 5, 1, 5);

  MESSIAEN_INV_III_V_TRUNCATED_n2 = fromIntraIntervals(1, 3, 1, 3, 1, 3);

  HALF_DIMINISHED = fromIntraIntervals(1, 2, 1, 2, 1, 2, 1, 2);

  MESSIAEN_V = fromIntraIntervals(1, 1, 4, 1, 1, 4);

  RAGA_INDRUPRIYA_INDIA = fromIntraIntervals(1, 3, 2, 3, 1, 2);

  MESSIAEN_II_TRUNCATED_n3 = fromIntraIntervals(3, 1, 2, 3, 1, 2);

  MESSIAEN_III_INV = fromIntraIntervals(2, 1, 1, 2, 1, 1, 2, 1, 1);

  MESSIAEN_IV = fromIntraIntervals(1, 1, 1, 3, 1, 1, 1, 3);

  MESSIAEN_VI = fromIntraIntervals(1, 1, 2, 2, 1, 1, 2, 2);

  MESSIAEN_VII = fromIntraIntervals(1, 1, 1, 1, 2, 1, 1, 1, 1, 2);

  BLUES_b5 = fromIntraIntervals(3, 2, 1, 1, 3, 2);

  BLUES_a4 = BLUES_b5;

  // 5
  PENTATONIC_MINOR = fromIntraIntervals(3, 2, 2, 3, 2);

  PENTATONIC = mode(PENTATONIC_MINOR, 2);

  EGYPCIAN = mode(PENTATONIC_MINOR, 3);

  BLUES_MINOR = mode(PENTATONIC_MINOR, 4);

  BLUES_MAJOR = mode(PENTATONIC_MINOR, 5);

  // Symmetric
  CHROMATIC = fromIntraIntervals(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

  WHOLE_TONE = fromIntraIntervals(2, 2, 2, 2, 2, 2);

  AUGMENTED_TRIAD = fromIntraIntervals(4, 4, 4);

  DIMINISHED_7th = fromIntraIntervals(3, 3, 3, 3);

  DOM7b5 = fromIntraIntervals(4, 2, 4, 2);

  // Bebop
  BEBOP_MAJOR = fromRootIntervals(
    MAJOR.degrees[0],
    MAJOR.degrees[1],
    MAJOR.degrees[2],
    MAJOR.degrees[3],
    MAJOR.degrees[4],
    8,
    MAJOR.degrees[5],
    MAJOR.degrees[6],
  );

  BEBOP_DORIAN = fromRootIntervals(
    DORIAN.degrees[0],
    DORIAN.degrees[1],
    DORIAN.degrees[2],
    4,
    DORIAN.degrees[3],
    DORIAN.degrees[4],
    DORIAN.degrees[5],
    DORIAN.degrees[6],
  );

  BEBOP_DOMINANT = fromRootIntervals(
    MIXOLYDIAN.degrees[0],
    MIXOLYDIAN.degrees[1],
    MIXOLYDIAN.degrees[2],
    MIXOLYDIAN.degrees[3],
    MIXOLYDIAN.degrees[4],
    MIXOLYDIAN.degrees[5],
    MIXOLYDIAN.degrees[6],
    11,
  );

  BEBOP_MELODIC_MINOR = fromRootIntervals(
    MELODIC_MINOR.degrees[0],
    MELODIC_MINOR.degrees[1],
    MELODIC_MINOR.degrees[2],
    MELODIC_MINOR.degrees[3],
    MELODIC_MINOR.degrees[4],
    8,
    MELODIC_MINOR.degrees[5],
    MELODIC_MINOR.degrees[6],
  );

  BEBOP_HARMONIC_MINOR = fromRootIntervals(
    HARMONIC_MINOR.degrees[0],
    HARMONIC_MINOR.degrees[1],
    HARMONIC_MINOR.degrees[2],
    HARMONIC_MINOR.degrees[3],
    HARMONIC_MINOR.degrees[4],
    HARMONIC_MINOR.degrees[5],
    10,
    HARMONIC_MINOR.degrees[6],
  );

  initializeSets();
  deepFreeze(COMMON);
}

export let MAJOR: Scale;

export let IONIAN: Scale;

export let DORIAN: Scale;

export let PHRYGIAN: Scale;

export let LYDIAN: Scale;

export let MIXOLYDIAN: Scale;

export let AEOLIAN: Scale;

export let MINOR: Scale;

export let LOCRIAN: Scale;

export let HARMONIC_MINOR: Scale;

export let LOCRIAN_a6: Scale;

export let IONIAN_a5: Scale;

export let DORIAN_a4: Scale;

export let MIXOLYDIAN_b9_b13: Scale;

export let LYDIAN_a2: Scale;

export let SUPERLOCRIAN_bb7: Scale;

export let HARMONIC_MAJOR: Scale;

export let DORIAN_b5: Scale;

export let PHRYGIAN_b4: Scale;

export let LYDIAN_b3: Scale;

export let MIXOLYDIAN_b2: Scale;

export let AEOLIAN_b1: Scale;

export let LOCRIAN_bb7: Scale;

export let MELODIC_MINOR: Scale;

export let DORIAN_b2: Scale;

export let LYDIAN_a5: Scale;

export let LYDIAN_b7: Scale;

export let MIXOLYDIAN_b13: Scale;

export let LOCRIAN_a2: Scale;

export let SUPERLOCRIAN: Scale;

export let DOUBLE_HARMONIC: Scale;

export let LYDIAN_a2_a6: Scale;

export let ULTRAPHRYGIAN: Scale;

export let HUNGARIAN_MINOR: Scale;

export let ORIENTAL: Scale;

export let IONIAN_AUGMENTED_a2: Scale;

export let LOCRIAN_bb3_bb7: Scale;

export let NEAPOLITAN_MINOR: Scale;

export let NEAPOLITAN_MAJOR: Scale;

export let MESSIAEN_V_TRUNCATED: Scale;

export let MESSIAEN_INV_III_V_TRUNCATED_n2: Scale;

export let HALF_DIMINISHED: Scale;

export let MESSIAEN_V: Scale;

export let RAGA_INDRUPRIYA_INDIA: Scale;

export let MESSIAEN_II_TRUNCATED_n3: Scale;

export let MESSIAEN_III_INV: Scale;

export let MESSIAEN_IV: Scale;

export let MESSIAEN_VI: Scale;

export let MESSIAEN_VII: Scale;

export let BLUES_b5: Scale;

export let BLUES_a4: Scale;

// 5
export let PENTATONIC_MINOR: Scale;

export let PENTATONIC: Scale;

export let EGYPCIAN: Scale;

export let BLUES_MINOR: Scale;

export let BLUES_MAJOR: Scale;

// Symmetric
export let CHROMATIC: Scale;

export let WHOLE_TONE: Scale;

export let AUGMENTED_TRIAD: Scale;

export let DIMINISHED_7th: Scale;

export let DOM7b5: Scale;

// Bebop
export let BEBOP_MAJOR: Scale;

export let BEBOP_DORIAN: Scale;

export let BEBOP_DOMINANT: Scale;

export let BEBOP_MELODIC_MINOR: Scale;

export let BEBOP_HARMONIC_MINOR: Scale;

function initializeSets() {
  DIATONIC_SCALES = new Set([
    MAJOR,
    DORIAN,
    PHRYGIAN,
    LYDIAN,
    MIXOLYDIAN,
    MINOR,
    LOCRIAN,
  ]);

  HEPTATONIC_SCALES = new Set([
    ...DIATONIC_SCALES,
    HARMONIC_MINOR,
    LOCRIAN_a6,
    IONIAN_a5,
    DORIAN_a4,
    MIXOLYDIAN_b9_b13,
    LYDIAN_a2,
    SUPERLOCRIAN_bb7,

    HARMONIC_MAJOR,
    DORIAN_b5,
    PHRYGIAN_b4,
    LYDIAN_b3,
    MIXOLYDIAN_b2,
    AEOLIAN_b1,
    LOCRIAN_bb7,

    MELODIC_MINOR,
    DORIAN_b2,
    LYDIAN_a5,
    LYDIAN_b7,
    MIXOLYDIAN_b13,
    LOCRIAN_a2,
    SUPERLOCRIAN,

    DOUBLE_HARMONIC,
    LYDIAN_a2_a6,
    ULTRAPHRYGIAN,
    HUNGARIAN_MINOR,
    ORIENTAL,
    IONIAN_AUGMENTED_a2,
    LOCRIAN_bb3_bb7,

    NEAPOLITAN_MINOR,
    NEAPOLITAN_MAJOR,
  ]);

  BEBOP_SCALES = new Set([
    BEBOP_MAJOR,
    BEBOP_DORIAN,
    BEBOP_DOMINANT,
    BEBOP_MELODIC_MINOR,
    BEBOP_HARMONIC_MINOR,
  ]);

  PENTATONIC_SCALES = new Set([
    PENTATONIC_MINOR,
    PENTATONIC,
    EGYPCIAN,
    BLUES_MINOR,
  ]);

  HEXATONIC_SCALES = new Set([
    BLUES_b5,
    BLUES_a4,
    WHOLE_TONE,
  ]);

  SYMMETRIC_SCALES = new Set([
    CHROMATIC,
    WHOLE_TONE,
    AUGMENTED_TRIAD,
    DIMINISHED_7th,
    MESSIAEN_V_TRUNCATED,
    DOM7b5,
    MESSIAEN_INV_III_V_TRUNCATED_n2,
    HALF_DIMINISHED,
    MESSIAEN_V,
    RAGA_INDRUPRIYA_INDIA,
    MESSIAEN_II_TRUNCATED_n3,
    MESSIAEN_III_INV,
    MESSIAEN_IV,
    MESSIAEN_VI,
    MESSIAEN_VII,
  ]);

  COMMON = new Set([
    ...HEPTATONIC_SCALES,
    ...PENTATONIC_SCALES,
    ...HEXATONIC_SCALES,
    ...BEBOP_SCALES,
    ...SYMMETRIC_SCALES,
  ]);
  deepFreeze(COMMON);
}

export let DIATONIC_SCALES: Set<Scale>;

export let HEPTATONIC_SCALES: Set<Scale>;

export let BEBOP_SCALES: Set<Scale>;

export let PENTATONIC_SCALES: Set<Scale>;

export let HEXATONIC_SCALES: Set<Scale>;

export let COMMON: Set<Scale>;

export let SYMMETRIC_SCALES: Set<Scale>;
