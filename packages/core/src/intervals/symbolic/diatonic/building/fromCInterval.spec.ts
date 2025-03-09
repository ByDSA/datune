import { Intervals as CI } from "intervals/chromatic";
import { Intervals as I } from "intervals/diatonic";
import { fromChromaticInterval } from "./fromCInterval";

describe.each([
  [CI.P1, I.UNISON],
  [CI.P4, I.FOURTH],
  [CI.P8, I.OCTAVE],
  [CI.neg(CI.P1), I.UNISON],
  [CI.M10, I.TENTH],
  [CI.neg(CI.d5), I.neg(I.FIFTH)],
  [CI.neg(CI.P5), I.neg(I.FIFTH)],
  [CI.neg(CI.M10), I.neg(I.TENTH)],
])("fromChromaticInterval", (cInterval, expected) => {
  it(`${cInterval} to DiatonicInterval should be ${expected}`, () => {
    const actual = fromChromaticInterval(cInterval);

    expect(actual).toBe(expected);
  } );
} );
