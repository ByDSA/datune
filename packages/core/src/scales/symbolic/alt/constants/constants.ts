/* eslint-disable camelcase */
import type { Scale } from "../Scale";
import { Degrees as D } from "degrees/alt";
import { Degrees as DD } from "degrees/diatonic";
import { Intervals as AI } from "intervals/alt";
import { Scales as CS } from "scales/chromatic";
import { initialize as initializeDegrees } from "degrees/alt/constants";
import { mode } from "../modifiers";
import { fromChromaticScale, fromDegrees, fromIntraIntervals, fromRootIntervals } from "../building";

export function initializeConstants() {
  if (MAJOR)
    throw new Error("MAJOR already defined");

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { bV, bVI, bVII, from: degreeFrom, I, II, III, IV, V, VI, VII } = D;
  const { a5, a1, d5, d7, M2, M3, m2, m3, P1 } = AI;
  // eslint-disable-next-line max-len, @typescript-eslint/naming-convention
  const { DOUBLE_HARMONIC: C_DOUBLE_HARMONIC, HALF_DIMINISHED: C_HALF_DIMINISHED, HARMONIC_MAJOR: C_HARMONIC_MAJOR, HARMONIC_MINOR: C_HARMONIC_MINOR, MELODIC_MINOR: C_MELODIC_MINOR, MESSIAEN_III_INV: C_MESSIAEN_III_INV, MESSIAEN_II_TRUNCATED_n3: C_MESSIAEN_II_TRUNCATED_n3, MESSIAEN_INV_III_V_TRUNCATED_n2: C_MESSIAEN_INV_III_V_TRUNCATED_n2, MESSIAEN_IV: C_MESSIAEN_IV, MESSIAEN_V: C_MESSIAEN_V, MESSIAEN_VI: C_MESSIAEN_VI, MESSIAEN_VII: C_MESSIAEN_VII, MESSIAEN_V_TRUNCATED: C_MESSIAEN_V_TRUNCATED, NEAPOLITAN_MAJOR: C_NEAPOLITAN_MAJOR, NEAPOLITAN_MINOR: C_NEAPOLITAN_MINOR, RAGA_INDRUPRIYA_INDIA: C_RAGA_INDRUPRIYA_INDIA } = CS;

  if (!I)
    initializeDegrees();

  MAJOR = fromDegrees(
    I,
    II,
    III,
    IV,
    V,
    VI,
    VII,
  );

  IONIAN = MAJOR;

  DORIAN = mode(MAJOR, 2);

  PHRYGIAN = mode(MAJOR, 3);

  LYDIAN = mode(MAJOR, 4);

  MIXOLYDIAN = mode(MAJOR, 5);

  MINOR = mode(MAJOR, 6);

  AEOLIAN = MINOR;

  LOCRIAN = mode(MAJOR, 7);

  HARMONIC_MINOR = fromChromaticScale(C_HARMONIC_MINOR);

  LOCRIAN_a6 = mode(HARMONIC_MINOR, 2);

  IONIAN_a5 = mode(HARMONIC_MINOR, 3);

  DORIAN_a4 = mode(HARMONIC_MINOR, 4);

  MIXOLYDIAN_b9_b13 = mode(HARMONIC_MINOR, 5);

  LYDIAN_a2 = mode(HARMONIC_MINOR, 6);

  SUPERLOCRIAN_bb7 = mode(HARMONIC_MINOR, 7);

  HARMONIC_MAJOR = fromChromaticScale(C_HARMONIC_MAJOR);

  DORIAN_b5 = mode(HARMONIC_MAJOR, 2);

  PHRYGIAN_b4 = mode(HARMONIC_MAJOR, 3);

  LYDIAN_b3 = mode(HARMONIC_MAJOR, 4);

  MIXOLYDIAN_b2 = mode(HARMONIC_MAJOR, 5);

  AEOLIAN_b1 = mode(HARMONIC_MAJOR, 6);

  LOCRIAN_bb7 = mode(HARMONIC_MAJOR, 7);

  MELODIC_MINOR = fromChromaticScale(C_MELODIC_MINOR);

  DORIAN_b2 = mode(MELODIC_MINOR, 2);

  LYDIAN_a5 = mode(MELODIC_MINOR, 3);

  LYDIAN_b7 = mode(MELODIC_MINOR, 4);

  MIXOLYDIAN_b13 = mode(MELODIC_MINOR, 5);

  LOCRIAN_a2 = mode(MELODIC_MINOR, 6);

  SUPERLOCRIAN = mode(MELODIC_MINOR, 7);

  DOUBLE_HARMONIC = fromChromaticScale(C_DOUBLE_HARMONIC);

  LYDIAN_a2_a6 = mode(DOUBLE_HARMONIC, 2);

  ULTRAPHRYGIAN = mode(DOUBLE_HARMONIC, 3);

  HUNGARIAN_MINOR = mode(DOUBLE_HARMONIC, 4);

  ORIENTAL = mode(DOUBLE_HARMONIC, 5);

  IONIAN_AUGMENTED_a2 = mode(DOUBLE_HARMONIC, 6);

  LOCRIAN_bb3_bb7 = mode(DOUBLE_HARMONIC, 7);

  NEAPOLITAN_MINOR = fromChromaticScale(C_NEAPOLITAN_MINOR);

  NEAPOLITAN_MAJOR = fromChromaticScale(C_NEAPOLITAN_MAJOR);

  // 6
  BLUES_b5 = fromIntraIntervals(
    m3,
    M2,
    m2,
    a1,
    m3,
    M2,
  );

  BLUES_a4 = fromIntraIntervals(
    m3,
    M2,
    a1,
    m2,
    m3,
    M2,
  );

  // 5
  PENTATONIC_MINOR = fromIntraIntervals(
    m3,
    M2,
    M2,
    m3,
    M2,
  );

  PENTATONIC = mode(PENTATONIC_MINOR, 2);

  EGYPCIAN = mode(PENTATONIC_MINOR, 3);

  BLUES_MINOR = mode(PENTATONIC_MINOR, 4);

  BLUES_MAJOR = mode(PENTATONIC_MINOR, 5);

  // Symmetric
  CHROMATIC = fromDegrees(
    I,
    degreeFrom(DD.I, 1),
    II,
    degreeFrom(DD.II, 1),
    III,
    IV,
    degreeFrom(DD.IV, 1),
    V,
    degreeFrom(DD.V, 1),
    VI,
    degreeFrom(DD.VI, 1),
    VII,
  );

  CHROMATIC_BY_FIFTHS = fromDegrees(
    I,
    degreeFrom(DD.I, 1),
    II,
    degreeFrom(DD.II, 1),
    III,
    degreeFrom(DD.III, 1),
    degreeFrom(DD.IV, 1),
    V,
    degreeFrom(DD.V, 1),
    VI,
    degreeFrom(DD.VI, 1),
    VII,
  );

  WHOLE_TONE = fromDegrees(
    I,
    II,
    III,
    bV,
    bVI,
    bVII,
  );

  AUGMENTED_TRIAD = fromRootIntervals(
    P1,
    M3,
    a5,
  );

  DIMINISHED_7th = fromRootIntervals(
    P1,
    m3,
    d5,
    d7,
  );

  DOM7b5 = fromDegrees(
    I,
    III,
    bV,
    bVII,
  );

  RAGA_INDRUPRIYA_INDIA = fromChromaticScale(C_RAGA_INDRUPRIYA_INDIA);

  HALF_DIMINISHED = fromChromaticScale(C_HALF_DIMINISHED);

  MESSIAEN_V_TRUNCATED = fromChromaticScale(C_MESSIAEN_V_TRUNCATED);

  MESSIAEN_III_INV = fromChromaticScale(C_MESSIAEN_III_INV);

  MESSIAEN_II_TRUNCATED_n3 = fromChromaticScale(C_MESSIAEN_II_TRUNCATED_n3);

  MESSIAEN_INV_III_V_TRUNCATED_n2 = fromChromaticScale(
    C_MESSIAEN_INV_III_V_TRUNCATED_n2,
  );

  MESSIAEN_IV = fromChromaticScale(C_MESSIAEN_IV);

  MESSIAEN_V = fromChromaticScale(C_MESSIAEN_V);

  MESSIAEN_VI = fromChromaticScale(C_MESSIAEN_VI);

  MESSIAEN_VII = fromChromaticScale(C_MESSIAEN_VII);

  // Bebop
  BEBOP_MAJOR = fromDegrees(
    MAJOR.degrees[0],
    MAJOR.degrees[1],
    MAJOR.degrees[2],
    MAJOR.degrees[3],
    MAJOR.degrees[4],
    bVI,
    MAJOR.degrees[5],
    MAJOR.degrees[6],
  );

  BEBOP_DORIAN = fromDegrees(
    DORIAN.degrees[0],
    DORIAN.degrees[1],
    DORIAN.degrees[2],
    III,
    DORIAN.degrees[3],
    DORIAN.degrees[4],
    DORIAN.degrees[5],
    DORIAN.degrees[6],
  );

  BEBOP_DOMINANT = fromDegrees(
    MIXOLYDIAN.degrees[0],
    MIXOLYDIAN.degrees[1],
    MIXOLYDIAN.degrees[2],
    MIXOLYDIAN.degrees[3],
    MIXOLYDIAN.degrees[4],
    MIXOLYDIAN.degrees[5],
    MIXOLYDIAN.degrees[6],
    VII,
  );

  BEBOP_MELODIC_MINOR = fromDegrees(
    MELODIC_MINOR.degrees[0],
    MELODIC_MINOR.degrees[1],
    MELODIC_MINOR.degrees[2],
    MELODIC_MINOR.degrees[3],
    MELODIC_MINOR.degrees[4],
    bVI,
    MELODIC_MINOR.degrees[5],
    MELODIC_MINOR.degrees[6],
  );

  BEBOP_HARMONIC_MINOR = fromDegrees(
    HARMONIC_MINOR.degrees[0],
    HARMONIC_MINOR.degrees[1],
    HARMONIC_MINOR.degrees[2],
    HARMONIC_MINOR.degrees[3],
    HARMONIC_MINOR.degrees[4],
    HARMONIC_MINOR.degrees[5],
    bVII,
    HARMONIC_MINOR.degrees[6],
  );
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

export let BLUES_b5: Scale;

export let BLUES_a4: Scale;

export let PENTATONIC_MINOR: Scale;

export let PENTATONIC: Scale;

export let EGYPCIAN: Scale;

export let BLUES_MINOR: Scale;

export let BLUES_MAJOR: Scale;

export let CHROMATIC: Scale;

export let CHROMATIC_BY_FIFTHS: Scale;

export let WHOLE_TONE: Scale;

export let AUGMENTED_TRIAD: Scale;

export let DIMINISHED_7th: Scale;

export let DOM7b5: Scale;

export let RAGA_INDRUPRIYA_INDIA: Scale;

export let HALF_DIMINISHED: Scale;

export let MESSIAEN_V_TRUNCATED: Scale;

export let MESSIAEN_III_INV: Scale;

export let MESSIAEN_II_TRUNCATED_n3: Scale;

export let MESSIAEN_INV_III_V_TRUNCATED_n2: Scale;

export let MESSIAEN_IV: Scale;

export let MESSIAEN_V: Scale;

export let MESSIAEN_VI: Scale;

export let MESSIAEN_VII: Scale;

export let BEBOP_MAJOR: Scale;

export let BEBOP_DORIAN: Scale;

export let BEBOP_DOMINANT: Scale;

export let BEBOP_MELODIC_MINOR: Scale;

export let BEBOP_HARMONIC_MINOR: Scale;
