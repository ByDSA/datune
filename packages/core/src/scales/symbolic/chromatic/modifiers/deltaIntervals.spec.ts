/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { Scale } from "../Scale";
import type { IntervalArray } from "intervals/chromatic";
import type { DegreeArray } from "chromatic";
import { fromDeltaIntervals } from "../building";
import { Scales as S } from "..";
import { scaleToDeltaIntervals } from "./deltaIntervals";
import { mode } from ".";

const { BEBOP_DOMINANT, BLUES_a4, BLUES_b5,
  BLUES_MAJOR, BLUES_MINOR, EGYPCIAN, MAJOR, PENTATONIC, PENTATONIC_MINOR } = S;

  type TestCase = [Scale, DegreeArray];

describe.each([
  [mode(BLUES_b5, 2), [2, 1, 1, 3, 2, 3]],
  [mode(BLUES_b5, 3), [1, 1, 3, 2, 3, 2]],
  [mode(BLUES_b5, 4), [1, 3, 2, 3, 2, 1]],
] as TestCase[])("intraIntervals modes", (scale, intraIntervals: DegreeArray) => {
  it(`${String(scale)} => ${intraIntervals}`, () => {
    const degrees = scaleToDeltaIntervals(scale);

    expect(degrees).toStrictEqual(intraIntervals);
  } );

  it(`${intraIntervals} => ${String(scale)}`, () => {
    const actual = fromDeltaIntervals(...intraIntervals);

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
] as TestCase[])("deltaIntervals source scales", (scale, deltaIntervals: DegreeArray) => {
  it(`${String(scale)} => ${deltaIntervals}`, () => {
    const degrees = scaleToDeltaIntervals(scale);

    expect(degrees).toStrictEqual(deltaIntervals);
  } );

  it(`${deltaIntervals} => ${String(scale)}`, () => {
    const actual = fromDeltaIntervals(...deltaIntervals);

    expect(actual).toBe(scale);
  } );
} );
