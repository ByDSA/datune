import type { Temperament } from "./Temperament";
import type { Interval as ChromaticInterval } from "intervals/symbolic/chromatic/Interval";
import * as CI from "intervals/symbolic/chromatic/constants";
import { simplify, octaves } from "intervals/symbolic/chromatic/modifiers";
import type { Interval as RealInterval } from "intervals/real/Interval";
import * as RI from "intervals/real/constants";
import { shiftOctaves } from "intervals/real/modifiers/shiftOctaves";

type Interval = ChromaticInterval;

export function initialize() {
  ET12 = (input: Interval): RealInterval => {
    const simpleInterval = simplify(input);
    const simpleRealInterval = (() => {
      switch (simpleInterval) {
        case CI.PERFECT_UNISON: return RI.UNISON;
        case CI.MINOR_SECOND: return RI.ET12_MINOR_SECOND;
        case CI.MAJOR_SECOND: return RI.ET12_MAJOR_SECOND;
        case CI.MINOR_THIRD: return RI.ET12_MINOR_THIRD;
        case CI.MAJOR_THIRD: return RI.ET12_MAJOR_THIRD;
        case CI.PERFECT_FOURTH: return RI.ET12_PERFECT_FOURTH;
        case CI.TRITONE: return RI.ET12_TRITONE;
        case CI.PERFECT_FIFTH: return RI.ET12_PERFECT_FIFTH;
        case CI.MINOR_SIXTH: return RI.ET12_MINOR_SIXTH;
        case CI.MAJOR_SIXTH: return RI.ET12_MAJOR_SIXTH;
        case CI.MINOR_SEVENTH: return RI.ET12_MINOR_SEVENTH;
        case CI.MAJOR_SEVENTH: return RI.ET12_MAJOR_SEVENTH;
        default: throw generateError(input);
      }
    } )();
    const inputOctaves = octaves(input);
    const realInterval = shiftOctaves(simpleRealInterval, inputOctaves);

    return realInterval;
  };

  ET12.toString = (): string => "ET12";

  LIMIT_5_SYMMETRIC_N1 = (input: Interval): RealInterval => {
    const simpleInterval = simplify(input);
    const simpleRealInterval = (() => {
      switch (simpleInterval) {
        case 0: return RI.UNISON;
        case 1: return RI.J_MINOR_SECOND;
        case 2: return RI.J_MAJOR_TONE;
        case 3: return RI.J_MINOR_THIRD;
        case 4: return RI.J_MAJOR_THIRD;
        case 5: return RI.J_PERFECT_FOURTH;
        case 7: return RI.J_PERFECT_FIFTH;
        case 8: return RI.J_MINOR_SIXTH;
        case 9: return RI.J_MAJOR_SIXTH;
        case 10: return RI.J_MINOR_SEVENTH_SMALL;
        case 11: return RI.J_MAJOR_SEVENTH;
        case 6:
        // para DiatonicAlt
          /*  if (interval === DIMINISHED_FIFTH)
          return RI.J_DIMINISHED_FIFTH;

        if (interval === AUGMENTED_FOURTH)
          return RI.J_AUGMENTED_FOURTH;

          throw generateError(interval);
*/
          return RI.J_DIMINISHED_FIFTH;
        default: throw generateError(input);
      }
    } )();
    const inputOctaves = octaves(input);
    const realInterval = shiftOctaves(simpleRealInterval, inputOctaves);

    return realInterval;
  };

  LIMIT_5_SYMMETRIC_N1.toString = (): string => "L5S-N1";

  LIMIT_5_SYMMETRIC_N2 = (input: Interval): RealInterval => {
    const simpleInterval = simplify(input);
    const simpleRealInterval = (() => {
      switch (simpleInterval) {
        case 2: return RI.J_MINOR_TONE;
        case 10: return RI.J_MINOR_SEVENTH_GREATER;
        default: return LIMIT_5_SYMMETRIC_N1(simpleInterval);
      }
    } )();
    const inputOctaves = octaves(input);
    const realInterval = shiftOctaves(simpleRealInterval, inputOctaves);

    return realInterval;
  };

  LIMIT_5_SYMMETRIC_N2.toString = (): string => "L5S-N2";

  PYTHAGOREAN = (input: Interval): RealInterval => {
    const simpleInterval = simplify(input);
    const simpleRealInterval = (() => {
      switch (simpleInterval) {
      // comentarios = DiatonicAlt
      /// case DIMINISHED_SECOND: return RI.PT_DIMINISHED_SECOND;
        case CI.PERFECT_UNISON: return RI.UNISON;
          // case AUGMENTED_UNISON: return RI.PT_AUGMENTED_UNISON;
        case CI.MINOR_SECOND: return RI.PT_MINOR_SECOND;
        // case DIMINISHED_THIRD: return RI.PT_DIMINISHED_THIRD;
        case CI.MAJOR_SECOND: return RI.PT_MAJOR_SECOND;
        case CI.MINOR_THIRD: return RI.PT_MINOR_THIRD;
          // case AUGMENTED_SECOND: return RI.PT_AUGMENTED_SECOND;
          // case DIMINISHED_FOURTH: return RI.PT_DIMINISHED_FOURTH;
        case CI.MAJOR_THIRD: return RI.PT_MAJOR_THIRD;
        case CI.PERFECT_FOURTH: return RI.PT_PERFECT_FOURTH;
          // case AUGMENTED_THIRD: return RI.PT_AUGMENTED_THIRD;
        case CI.DIMINISHED_FIFTH: return RI.PT_DIMINISHED_FIFTH;
          // case AUGMENTED_FOURTH: return RI.PT_AUGMENTED_FOURTH;
          // case DIMINISHED_SIXTH: return RI.PT_DIMINISHED_SIXTH;
        case CI.PERFECT_FIFTH: return RI.PT_PERFECT_FIFTH;
        case CI.MINOR_SIXTH: return RI.PT_MINOR_SIXTH;
          // case AUGMENTED_FIFTH: return RI.PT_AUGMENTED_FIFTH;
          // case DIMINISHED_SEVENTH: return RI.PT_DIMINISHED_SEVENTH;
        case CI.MAJOR_SIXTH: return RI.PT_MAJOR_SIXTH;
        case CI.MINOR_SEVENTH: return RI.PT_MINOR_SEVENTH;
          // case AUGMENTED_SIXTH: return RI.PT_AUGMENTED_SIXTH;
          // case DIMINISHED_OCTAVE: return RI.PT_DIMINISHED_OCTAVE;
        case CI.MAJOR_SEVENTH: return RI.PT_MAJOR_SEVENTH;
        case CI.PERFECT_OCTAVE: return RI.OCTAVE;
        default: throw generateError(input);
      }
    } )();
    const inputOctaves = octaves(input);
    const realInterval = shiftOctaves(simpleRealInterval, inputOctaves);

    return realInterval;
  };

  PYTHAGOREAN.toString = (): string => "PT";
}

export let ET12: Temperament;

export let LIMIT_5_SYMMETRIC_N1: Temperament;

export let LIMIT_5_SYMMETRIC_N2: Temperament;

export let PYTHAGOREAN: Temperament;

function generateError(interval: ChromaticInterval): Error {
  return new Error(`Cannot convert interval ${interval}.`);
}
