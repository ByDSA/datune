/* eslint-disable camelcase */
import { TestInit } from "tests";
import { IntervalArray } from "intervals/chromatic";
import { fromIntraIntervals } from "../building";
import { BEBOP_DOMINANT, BLUES_a4, BLUES_b5, BLUES_MAJOR, BLUES_MINOR, EGYPCIAN, MAJOR, PENTATONIC, PENTATONIC_MINOR } from "../constants";
import { Scale } from "../Scale";
import { calcIntraIntervals } from "./intraIntervals";
import { mode } from ".";

TestInit.chromaticScale();

describe.each(<[Scale, IntervalArray][]>[
  [mode(BLUES_b5, 2), [2, 1, 1, 3, 2, 3]],
  [mode(BLUES_b5, 3), [1, 1, 3, 2, 3, 2]],
  [mode(BLUES_b5, 4), [1, 3, 2, 3, 2, 1]],
])("intraIntervals modes", (scale, intraIntervals: IntervalArray) => {
  it(`${String(scale)} => ${intraIntervals}`, () => {
    const degrees = calcIntraIntervals(scale);

    expect(degrees).toStrictEqual(intraIntervals);
  } );

  it(`${intraIntervals} => ${String(scale)}`, () => {
    const actual = fromIntraIntervals(...intraIntervals);

    expect(actual).toBe(scale);
  } );
} );

describe.each(<[Scale, IntervalArray][]>[
  [MAJOR, [2, 2, 1, 2, 2, 2, 1]],
  [BLUES_b5, [3, 2, 1, 1, 3, 2]],
  [BLUES_a4, [3, 2, 1, 1, 3, 2]],
  [PENTATONIC_MINOR, [3, 2, 2, 3, 2]],
  [PENTATONIC, [2, 2, 3, 2, 3]],
  [EGYPCIAN, [2, 3, 2, 3, 2]],
  [BLUES_MINOR, [3, 2, 3, 2, 2]],
  [BLUES_MAJOR, [2, 3, 2, 2, 3]],
  [BEBOP_DOMINANT, [2, 2, 1, 2, 2, 1, 1, 1]],
])("intraIntervals source scales", (scale, intraIntervals: IntervalArray) => {
  it(`${String(scale)} => ${intraIntervals}`, () => {
    const degrees = calcIntraIntervals(scale);

    expect(degrees).toStrictEqual(intraIntervals);
  } );

  it(`${intraIntervals} => ${String(scale)}`, () => {
    const actual = fromIntraIntervals(...intraIntervals);

    expect(actual).toBe(scale);
  } );
} );
