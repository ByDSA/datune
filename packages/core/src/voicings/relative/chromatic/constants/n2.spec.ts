import type { Voicing } from "../Voicing";
import type { Interval } from "intervals/chromatic";
import { TestInit } from "tests";
import { M2, M3, m2, m3, POWER_CHORD, TRITONE } from "./n2";

TestInit.chromaticVoicing();

describe.each([
  [m2, [0, 1]],
  [M2, [0, 2]],
  [m3, [0, 3]],
  [M3, [0, 4]],
  [TRITONE, [0, 6]],
  [POWER_CHORD, [0, 7]],
])("rootIntervals n=2", (voicing: Voicing, expectedIntervals: Interval[]) => {
  it(`${String(voicing)} rootIntervals=${expectedIntervals}`, () => {
    const actual = voicing.rootIntervals;

    expect(actual).toEqual(expectedIntervals);
  } );
} );
