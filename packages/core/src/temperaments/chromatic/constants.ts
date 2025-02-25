/* eslint-disable import/no-mutable-exports */
import { DIMINISHED_FIFTH, Interval as ChromaticInterval, MAJOR_SECOND, MAJOR_SEVENTH, MAJOR_SIXTH, MAJOR_THIRD, MINOR_SECOND, MINOR_SEVENTH, MINOR_SIXTH, MINOR_THIRD, octaves, PERFECT_FIFTH, PERFECT_FOURTH, PERFECT_OCTAVE, PERFECT_UNISON, simplify, TRITONE } from "intervals/chromatic";
import { ET12_MAJOR_SECOND, ET12_MAJOR_SEVENTH, ET12_MAJOR_SIXTH, ET12_MAJOR_THIRD, ET12_MINOR_SECOND, ET12_MINOR_SEVENTH, ET12_MINOR_SIXTH, ET12_MINOR_THIRD, ET12_PERFECT_FIFTH, ET12_PERFECT_FOURTH, ET12_TRITONE, Interval as RealInterval, J_DIMINISHED_FIFTH, J_MAJOR_SEVENTH, J_MAJOR_SIXTH, J_MAJOR_THIRD, J_MAJOR_TONE, J_MINOR_SECOND, J_MINOR_SEVENTH_GREATER, J_MINOR_SEVENTH_SMALL, J_MINOR_SIXTH, J_MINOR_THIRD, J_MINOR_TONE, J_PERFECT_FIFTH, J_PERFECT_FOURTH, OCTAVE, PT_DIMINISHED_FIFTH, PT_MAJOR_SECOND, PT_MAJOR_SEVENTH, PT_MAJOR_SIXTH, PT_MAJOR_THIRD, PT_MINOR_SECOND, PT_MINOR_SEVENTH, PT_MINOR_SIXTH, PT_MINOR_THIRD, PT_PERFECT_FIFTH, PT_PERFECT_FOURTH, shiftOctaves, UNISON } from "intervals/real";
import Temperament from "./Temperament";

type Interval = ChromaticInterval;

export function initialize() {
  ET12 = (input: Interval): RealInterval => {
    const simpleInterval = simplify(input);
    const simpleRealInterval = (() => {
      switch (simpleInterval) {
        case PERFECT_UNISON: return UNISON;
        case MINOR_SECOND: return ET12_MINOR_SECOND;
        case MAJOR_SECOND: return ET12_MAJOR_SECOND;
        case MINOR_THIRD: return ET12_MINOR_THIRD;
        case MAJOR_THIRD: return ET12_MAJOR_THIRD;
        case PERFECT_FOURTH: return ET12_PERFECT_FOURTH;
        case TRITONE: return ET12_TRITONE;
        case PERFECT_FIFTH: return ET12_PERFECT_FIFTH;
        case MINOR_SIXTH: return ET12_MINOR_SIXTH;
        case MAJOR_SIXTH: return ET12_MAJOR_SIXTH;
        case MINOR_SEVENTH: return ET12_MINOR_SEVENTH;
        case MAJOR_SEVENTH: return ET12_MAJOR_SEVENTH;
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
        case 0: return UNISON;
        case 1: return J_MINOR_SECOND;
        case 2: return J_MAJOR_TONE;
        case 3: return J_MINOR_THIRD;
        case 4: return J_MAJOR_THIRD;
        case 5: return J_PERFECT_FOURTH;
        case 7: return J_PERFECT_FIFTH;
        case 8: return J_MINOR_SIXTH;
        case 9: return J_MAJOR_SIXTH;
        case 10: return J_MINOR_SEVENTH_SMALL;
        case 11: return J_MAJOR_SEVENTH;
        case 6:
        // para DiatonicAlt
          /*  if (interval === DIMINISHED_FIFTH)
          return J_DIMINISHED_FIFTH;

        if (interval === AUGMENTED_FOURTH)
          return J_AUGMENTED_FOURTH;

          throw generateError(interval);
*/
          return J_DIMINISHED_FIFTH;
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
        case 2: return J_MINOR_TONE;
        case 10: return J_MINOR_SEVENTH_GREATER;
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
      /// case DIMINISHED_SECOND: return PT_DIMINISHED_SECOND;
        case PERFECT_UNISON: return UNISON;
          // case AUGMENTED_UNISON: return PT_AUGMENTED_UNISON;
        case MINOR_SECOND: return PT_MINOR_SECOND;
        // case DIMINISHED_THIRD: return PT_DIMINISHED_THIRD;
        case MAJOR_SECOND: return PT_MAJOR_SECOND;
        case MINOR_THIRD: return PT_MINOR_THIRD;
          // case AUGMENTED_SECOND: return PT_AUGMENTED_SECOND;
          // case DIMINISHED_FOURTH: return PT_DIMINISHED_FOURTH;
        case MAJOR_THIRD: return PT_MAJOR_THIRD;
        case PERFECT_FOURTH: return PT_PERFECT_FOURTH;
          // case AUGMENTED_THIRD: return PT_AUGMENTED_THIRD;
        case DIMINISHED_FIFTH: return PT_DIMINISHED_FIFTH;
          // case AUGMENTED_FOURTH: return PT_AUGMENTED_FOURTH;
          // case DIMINISHED_SIXTH: return PT_DIMINISHED_SIXTH;
        case PERFECT_FIFTH: return PT_PERFECT_FIFTH;
        case MINOR_SIXTH: return PT_MINOR_SIXTH;
          // case AUGMENTED_FIFTH: return PT_AUGMENTED_FIFTH;
          // case DIMINISHED_SEVENTH: return PT_DIMINISHED_SEVENTH;
        case MAJOR_SIXTH: return PT_MAJOR_SIXTH;
        case MINOR_SEVENTH: return PT_MINOR_SEVENTH;
          // case AUGMENTED_SIXTH: return PT_AUGMENTED_SIXTH;
          // case DIMINISHED_OCTAVE: return PT_DIMINISHED_OCTAVE;
        case MAJOR_SEVENTH: return PT_MAJOR_SEVENTH;
        case PERFECT_OCTAVE: return OCTAVE;
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
