import type { Temperament } from "./Temperament";
import type { Interval } from "intervals/symbolic/chromatic/Interval";
import type { Interval as RealInterval } from "intervals/real/Interval";
import * as CI from "intervals/symbolic/chromatic/constants";
import * as RI from "intervals/real/constants";
import { simplify, octaves } from "intervals/symbolic/chromatic/modifiers";
import { shiftOctaves } from "intervals/real/modifiers/shiftOctaves";

export function initialize() {
  if (ET12 as unknown)
    throw new Error("Already initialized");

  if (!RI.UNISON)
    RI.initialize();

  ET12 = (input: Interval): RealInterval => {
    const simpleInterval = simplify(input);
    const simpleRealInterval = (() => {
      switch (simpleInterval) {
        case CI.P1: return RI.UNISON;
        case CI.m2: return RI.ET12_m2;
        case CI.M2: return RI.ET12_M2;
        case CI.m3: return RI.ET12_m3;
        case CI.M3: return RI.ET12_M3;
        case CI.P4: return RI.ET12_P4;
        case CI.TRITONE: return RI.ET12_TRITONE;
        case CI.P5: return RI.ET12_P5;
        case CI.m6: return RI.ET12_m6;
        case CI.M6: return RI.ET12_M6;
        case CI.m7: return RI.ET12_m7;
        case CI.M7: return RI.ET12_M7;
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
        case 1: return RI.J_m2;
        case 2: return RI.J_MAJOR_TONE;
        case 3: return RI.J_m3;
        case 4: return RI.J_M3;
        case 5: return RI.J_P4;
        case 7: return RI.J_P5;
        case 8: return RI.J_m6;
        case 9: return RI.J_M6;
        case 10: return RI.J_m7_SMALL;
        case 11: return RI.J_M7;
        case 6:
        // para AltPitch
          /*  if (interval === d5)
          return RI.J_d5;

        if (interval === a4)
          return RI.J_a4;

          throw generateError(interval);
*/
          return RI.J_d5;
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
        case 10: return RI.J_m7_GREATER;
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
      // comentarios = AltPitch
      // / case d2: return RI.PT_d2;
        case CI.P1: return RI.UNISON;
          // case a1: return RI.PT_a1;
        case CI.m2: return RI.PT_m2;
        // case d3: return RI.PT_d3;
        case CI.M2: return RI.PT_M2;
        case CI.m3: return RI.PT_m3;
          // case a2: return RI.PT_a2;
          // case d4: return RI.PT_d4;
        case CI.M3: return RI.PT_M3;
        case CI.P4: return RI.PT_P4;
          // case a3: return RI.PT_a3;
        case CI.d5: return RI.PT_d5;
          // case a4: return RI.PT_a4;
          // case d6: return RI.PT_d6;
        case CI.P5: return RI.PT_P5;
        case CI.m6: return RI.PT_m6;
          // case a5: return RI.PT_a5;
          // case d7: return RI.PT_d7;
        case CI.M6: return RI.PT_M6;
        case CI.m7: return RI.PT_m7;
          // case a6: return RI.PT_a6;
          // case d8: return RI.PT_d8;
        case CI.M7: return RI.PT_M7;
        case CI.P8: return RI.OCTAVE;
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

function generateError(interval: Interval): Error {
  return new Error(`Cannot convert interval ${interval}.`);
}
