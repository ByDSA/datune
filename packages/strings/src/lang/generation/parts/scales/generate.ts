/* eslint-disable accessor-pairs */
import { alts } from "../../utils";
import Input from "./Input";
import Part from "./Part";

export default function generate(input: Input): Part {
  return {
    MAJOR: input.MAJOR,
    IONIAN: input.IONIAN,
    MINOR: input.MINOR,
    AEOLIAN: input.AEOLIAN,
    DORIAN: input.DORIAN,
    PHRYGIAN: input.PHRYGIAN,
    LYDIAN: input.LYDIAN,
    MIXOLYDIAN: input.MIXOLYDIAN,
    LOCRIAN: input.LOCRIAN,
    HARMONIC_MINOR: input.HARMONIC_MINOR,
    get LOCRIAN_a6(): string { return `${this.LOCRIAN} ${alts(1)}6`; },
    get IONIAN_a5(): string { return `${this.IONIAN} ${alts(1)}5`; },
    get DORIAN_a4(): string { return `${this.DORIAN} ${alts(1)}4`; },
    get MIXOLYDIAN_b9_b13(): string { return `${this.MIXOLYDIAN} ${alts(-1)}9${alts(-1)}13`; },
    get LYDIAN_a2(): string { return `${this.LYDIAN} ${alts(1)}2`; },
    get SUPERLOCRIAN_bb7(): string { return `${this.SUPERLOCRIAN} ${alts(-2)}7`; },

    HARMONIC_MAJOR: input.HARMONIC_MAJOR,
    get DORIAN_b5(): string { return `${this.DORIAN} ${alts(-1)}5`; },
    get PHRYGIAN_b4(): string { return `${this.PHRYGIAN} ${alts(-1)}4`; },
    get LYDIAN_b3(): string { return `${this.LYDIAN} ${alts(-1)}3`; },
    get MIXOLYDIAN_b2(): string { return `${this.MIXOLYDIAN} ${alts(-1)}2`; },
    get AEOLIAN_b1(): string { return `${this.LYDIAN} ${input.AUGMENTED} ${alts(1)}2`; },
    get LOCRIAN_bb7(): string { return `${this.LOCRIAN} ${alts(-2)}7`; },

    MELODIC_MINOR: input.MELODIC_MINOR,
    get DORIAN_b2(): string { return `${this.DORIAN} ${alts(-1)}2`; },
    get LYDIAN_a5(): string { return `${this.LYDIAN} ${alts(1)}5`; },
    get LYDIAN_b7(): string { return `${this.LYDIAN} ${alts(-1)}7`; },
    get MIXOLYDIAN_b13(): string { return `${this.MIXOLYDIAN} ${alts(-1)}13`; },
    get LOCRIAN_a2(): string { return `${this.LOCRIAN} ${alts(1)}2`; },
    SUPERLOCRIAN: input.SUPERLOCRIAN,

    DOUBLE_HARMONIC: input.DOUBLE_HARMONIC,
    get LYDIAN_a2_a6(): string { return `${this.LYDIAN} ${alts(1)}2${alts(1)}6`; },
    ULTRAPHRYGIAN: input.ULTRAPHRYGIAN,
    HUNGARIAN_MINOR: input.HUNGARIAN_MINOR,
    ORIENTAL: input.ORIENTAL,
    get IONIAN_AUGMENTED_a2(): string { return `${this.IONIAN} ${input.AUGMENTED} ${alts(1)}2`; },
    get LOCRIAN_bb3_bb7(): string { return `${this.LOCRIAN} ${alts(-2)}3${alts(-2)}7`; },

    NEAPOLITAN_MINOR: input.NEAPOLITAN_MINOR,
    NEAPOLITAN_MAJOR: input.NEAPOLITAN_MAJOR,
    get BLUES_b5(): string { return `${input.BLUES} ${alts(-1)}5`; },
    get BLUES_a4(): string { return `${input.BLUES} ${alts(1)}4`; },

    WHOLE_TONE: input.WHOLE_TONE,

    PENTATONIC_MINOR: input.PENTATONIC_MINOR,
    PENTATONIC: input.PENTATONIC,
    EGYPCIAN: input.EGYPCIAN,
    BLUES_MINOR: `${input.BLUES} ${input.MINOR}`,
    BLUES_MAJOR: `${input.BLUES} ${input.MAJOR}`,

    CHROMATIC: input.CHROMATIC,

    AUGMENTED_TRIAD: input.AUGMENTED_TRIAD,
    DIMINISHED_7th: input.DIMINISHED_7th,
    MESSIAEN_V_TRUNCATED: input.MESSIAEN_V_TRUNCATED,
    get DOM7b5(): string { return `DOM7${alts(-1)}5`; },
    MESSIAEN_INV_III_V_TRUNCATED_n2: input.MESSIAEN_INV_III_V_TRUNCATED_n2,
    HALF_DIMINISHED: input.HALF_DIMINISHED,
    MESSIAEN_V: input.MESSIAEN_V,
    RAGA_INDRUPRIYA_INDIA: input.RAGA_INDRUPRIYA_INDIA,
    MESSIAEN_II_TRUNCATED_n3: input.MESSIAEN_II_TRUNCATED_n3,
    MESSIAEN_III_INV: input.MESSIAEN_III_INV,
    MESSIAEN_IV: input.MESSIAEN_IV,
    MESSIAEN_VI: input.MESSIAEN_VI,
    MESSIAEN_VII: input.MESSIAEN_VII,

    BEBOP_MAJOR: input.BEBOP_MAJOR,
  };
}
