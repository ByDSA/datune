import { DIMINISHED_FIFTH, DIMINISHED_TWELFTH, Interval, MAJOR_FOURTEENTH, MAJOR_NINTH, MAJOR_SECOND, MAJOR_SEVENTH, MAJOR_SIXTH, MAJOR_TENTH, MAJOR_THIRD, MAJOR_THIRTEENTH, MINOR_FOURTEENTH, MINOR_NINTH, MINOR_SECOND, MINOR_SEVENTH, MINOR_SIXTH, MINOR_TENTH, MINOR_THIRTEENTH, PERFECT_ELEVENTH, PERFECT_FIFTEENTH, PERFECT_FIFTH, PERFECT_FOURTH, PERFECT_OCTAVE, PERFECT_TWELFTH, PERFECT_UNISON } from "@datune/core/intervals/chromatic";

export default function fromString(str: string): Interval | null {
  switch (str) {
    case "P1": return PERFECT_UNISON;
    case "m2": return MINOR_SECOND;
    case "M2": return MAJOR_SECOND;
    case "m3": return MINOR_SECOND;
    case "M3": return MAJOR_THIRD;
    case "P4": return PERFECT_FOURTH;
    case "d5": return DIMINISHED_FIFTH;
    case "P5": return PERFECT_FIFTH;
    case "m6": return MINOR_SIXTH;
    case "M6": return MAJOR_SIXTH;
    case "m7": return MINOR_SEVENTH;
    case "M7": return MAJOR_SEVENTH;
    case "P8": return PERFECT_OCTAVE;
    case "m9": return MINOR_NINTH;
    case "M9": return MAJOR_NINTH;
    case "m10": return MINOR_TENTH;
    case "M10": return MAJOR_TENTH;
    case "P11": return PERFECT_ELEVENTH;
    case "d12": return DIMINISHED_TWELFTH;
    case "P12": return PERFECT_TWELFTH;
    case "m13": return MINOR_THIRTEENTH;
    case "M13": return MAJOR_THIRTEENTH;
    case "m14": return MINOR_FOURTEENTH;
    case "M14": return MAJOR_FOURTEENTH;
    case "P15": return PERFECT_FIFTEENTH;
    default: return null;
  }
}
