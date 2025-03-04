import type { Interval } from "../Interval";
import type { Interval as DiatonicInterval } from "intervals/diatonic";
import { TestInit } from "tests";
import * as DIntervals from "intervals/symbolic/diatonic/constants";
import { neg as DIntervalsNeg } from "intervals/symbolic/diatonic/modifiers/neg";
import { a1, m2, P5 } from "../constants";
import { neg } from "../modifiers/neg";
import { expectInterval } from "../tests/interval";
import { fromIntervals } from "./intervals";

TestInit.diatonicAltInterval();
const { FIFTH, SECOND, UNISON } = DIntervals;

describe.each([
  [7, FIFTH, P5],
  [1, UNISON, a1],
  [1, SECOND, m2],
  [-7, DIntervalsNeg(FIFTH), neg(P5)],
  [-1, DIntervalsNeg(UNISON), neg(a1)],
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
