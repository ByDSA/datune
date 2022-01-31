import { Interval as DiatonicInterval, neg as DNeg } from "intervals/diatonic";
import { FIFTH, SECOND, UNISON } from "intervals/symbolic/diatonic";
import { TestInit } from "tests";
import { AUGMENTED_UNISON, MINOR_SECOND, PERFECT_FIFTH } from "../constants";
import Interval from "../Interval";
import { neg } from "../modifiers";
import fromIntervals from "./intervals";

TestInit.diatonicAltInterval();

describe.each([
  [7, FIFTH, PERFECT_FIFTH],
  [1, UNISON, AUGMENTED_UNISON],
  [1, SECOND, MINOR_SECOND],
  [-7, DNeg(FIFTH), neg(PERFECT_FIFTH)],
  [-1, DNeg(UNISON), neg(AUGMENTED_UNISON)],
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
