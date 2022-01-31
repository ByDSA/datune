/* eslint-disable import/prefer-default-export */
import { DIMINISHED_TWELFTH, Interval, MAJOR_FOURTEENTH, MAJOR_NINTH, MAJOR_SECOND, MAJOR_SEVENTH, MAJOR_SIXTH, MAJOR_TENTH, MAJOR_THIRD, MAJOR_THIRTEENTH, MINOR_FOURTEENTH, MINOR_NINTH, MINOR_SECOND, MINOR_SEVENTH, MINOR_SIXTH, MINOR_TENTH, MINOR_THIRD, MINOR_THIRTEENTH, PERFECT_ELEVENTH, PERFECT_FIFTEENTH, PERFECT_FIFTH, PERFECT_FOURTH, PERFECT_OCTAVE, PERFECT_TWELFTH, PERFECT_UNISON, TRITONE } from "intervals/chromatic";

export default function stringify(obj: Interval): string {
  switch (obj) {
    case PERFECT_UNISON: return "P1";
    case MINOR_SECOND: return "m2";
    case MAJOR_SECOND: return "M2";
    case MINOR_THIRD: return "m3";
    case MAJOR_THIRD: return "M3";
    case PERFECT_FOURTH: return "P4";
    case TRITONE: return "T";
    case PERFECT_FIFTH: return "P5";
    case MINOR_SIXTH: return "m6";
    case MAJOR_SIXTH: return "M6";
    case MINOR_SEVENTH: return "m7";
    case MAJOR_SEVENTH: return "M7";
    case PERFECT_OCTAVE: return "P8";
    case MINOR_NINTH: return "m9";
    case MAJOR_NINTH: return "M9";
    case MINOR_TENTH: return "m10";
    case MAJOR_TENTH: return "M10";
    case PERFECT_ELEVENTH: return "P11";
    case DIMINISHED_TWELFTH: return "d12";
    case PERFECT_TWELFTH: return "P12";
    case MINOR_THIRTEENTH: return "m13";
    case MAJOR_THIRTEENTH: return "M13";
    case MINOR_FOURTEENTH: return "m14";
    case MAJOR_FOURTEENTH: return "M14";
    case PERFECT_FIFTEENTH: return "P15";
    default: throw new Error();
  }
}
