import { AUGMENTED_UNISON, MINOR_SECOND, PERFECT_FIFTH } from "../constants";
import Interval from "../Interval";
import { neg } from "../modifiers/neg";
import { fromIntervals } from "./intervals";
import { TestInit } from "tests";
import { Interval as DiatonicInterval } from "intervals/diatonic";
import * as DIntervals from "intervals/symbolic/diatonic/constants";
import { neg as DIntervalsNeg } from "intervals/symbolic/diatonic/modifiers/neg";

TestInit.diatonicAltInterval();
const { FIFTH, SECOND, UNISON } = DIntervals;

describe.each([
  [7, FIFTH, PERFECT_FIFTH],
  [1, UNISON, AUGMENTED_UNISON],
  [1, SECOND, MINOR_SECOND],
  [-7, DIntervalsNeg(FIFTH), neg(PERFECT_FIFTH)],
  [-1, DIntervalsNeg(UNISON), neg(AUGMENTED_UNISON)],
])("tests", (chromaticInterval: number, diatonicInterval: DiatonicInterval, expected: Interval) => {
  it(`(${chromaticInterval}, ${diatonicInterval}) => ${expected}`, () => {
    const input = {
      chromaticInterval,
      diatonicInterval,
    };
    const actual = fromIntervals(input);

    expect(actual).toEqual(expected);
  } );
} );
