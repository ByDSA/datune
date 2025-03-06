/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import { Intervals as RI } from "intervals/real";
import { Intervals as CI } from "chromatic";
import { Temperaments as TE } from ".";

const { ET12, LIMIT_5_SYMMETRIC_N1, LIMIT_5_SYMMETRIC_N2, PYTHAGOREAN } = TE;
const { d5, M2, M7, M6, M3, m2, m7, m6, m3, P5, P4, P8, P1 } = CI;
const { ET12_P5, ET12_P4, J_d5, J_M7, J_M6, J_M3, J_MAJOR_TONE, J_m2, J_m7_GREATER, J_m7_SMALL, J_m6, J_m3, J_MINOR_TONE, J_P5, J_P4, OCTAVE, PT_d5, PT_M2, PT_M7, PT_M6, PT_M3, PT_m2, PT_m7, PT_m6, PT_m3, PT_P5, PT_P4, UNISON } = RI;

describe.each([
  [ET12, P1, UNISON],
  [ET12, P5, ET12_P5],
  [ET12, P4, ET12_P4],
  [ET12, P8, OCTAVE],
  [LIMIT_5_SYMMETRIC_N1, P1, UNISON],
  [LIMIT_5_SYMMETRIC_N1, m2, J_m2],
  [LIMIT_5_SYMMETRIC_N1, M2, J_MAJOR_TONE],
  [LIMIT_5_SYMMETRIC_N1, m3, J_m3],
  [LIMIT_5_SYMMETRIC_N1, M3, J_M3],
  [LIMIT_5_SYMMETRIC_N1, P4, J_P4],
  [LIMIT_5_SYMMETRIC_N1, d5, J_d5],
  [LIMIT_5_SYMMETRIC_N1, P5, J_P5],
  [LIMIT_5_SYMMETRIC_N1, m6, J_m6],
  [LIMIT_5_SYMMETRIC_N1, M6, J_M6],
  [LIMIT_5_SYMMETRIC_N1, m7, J_m7_SMALL],
  [LIMIT_5_SYMMETRIC_N1, M7, J_M7],
  [LIMIT_5_SYMMETRIC_N1, P8, OCTAVE],
  [LIMIT_5_SYMMETRIC_N2, M2, J_MINOR_TONE],
  [LIMIT_5_SYMMETRIC_N2, m7, J_m7_GREATER],
  [LIMIT_5_SYMMETRIC_N2, P8, OCTAVE],
  [PYTHAGOREAN, P1, UNISON],
  [PYTHAGOREAN, m2, PT_m2],
  [PYTHAGOREAN, M2, PT_M2],
  [PYTHAGOREAN, m3, PT_m3],
  [PYTHAGOREAN, M3, PT_M3],
  [PYTHAGOREAN, P4, PT_P4],
  [PYTHAGOREAN, d5, PT_d5],
  [PYTHAGOREAN, P5, PT_P5],
  [PYTHAGOREAN, m6, PT_m6],
  [PYTHAGOREAN, M6, PT_M6],
  [PYTHAGOREAN, m7, PT_m7],
  [PYTHAGOREAN, M7, PT_M7],
  [PYTHAGOREAN, P8, OCTAVE],
])("conversion", (temperament, interval, expected) => {
  it(`temperament=${temperament} interval=${interval} => ${expected}`, () => {
    expect(temperament).toBeDefined();
    expect(interval).toBeDefined();
    expect(expected).toBeDefined();

    const actual = temperament(interval);

    expect(actual).toBe(expected);
  } );
} );
