import type { Interval } from "../Interval";
import { Intervals as DI, type Interval as DiatonicInterval } from "intervals/diatonic";
import { neg as DIntervalsNeg } from "intervals/symbolic/diatonic/modifiers/neg";
import { neg } from "../modifiers/neg";
import { expectInterval } from "../tests/interval";
import { Intervals as I } from "..";
import { fromIntervals } from "./intervals";

const { FIFTH, SECOND, UNISON } = DI;

describe.each([
  [7, FIFTH, I.P5],
  [1, UNISON, I.a1],
  [1, SECOND, I.m2],
  [-7, DIntervalsNeg(FIFTH), neg(I.P5)],
  [-1, DIntervalsNeg(UNISON), neg(I.a1)],
])("tests", (chromaticInterval: number, diatonicInterval: DiatonicInterval, expected: Interval) => {
  it(`(${chromaticInterval}, ${diatonicInterval}) => ${expected}`, () => {
    const input = {
      chromaticInterval,
      diatonicInterval,
    };
    const actual = fromIntervals(input);

    expectInterval(actual, expected);
  } );
} );
