import type { Voicing } from "../Voicing";
import { MAJOR_SECOND, MAJOR_THIRD, MINOR_SECOND, MINOR_THIRD, POWER_CHORD, TRITONE } from "./n2";
import type { Interval } from "intervals/chromatic";
import { TestInit } from "tests";

TestInit.chromaticVoicing();

describe.each([
  [MINOR_SECOND, [0, 1]],
  [MAJOR_SECOND, [0, 2]],
  [MINOR_THIRD, [0, 3]],
  [MAJOR_THIRD, [0, 4]],
  [TRITONE, [0, 6]],
  [POWER_CHORD, [0, 7]],
])("rootIntervals n=2", (voicing: Voicing, expectedIntervals: Interval[]) => {
  it(`${String(voicing)} rootIntervals=${expectedIntervals}`, () => {
    const actual = voicing.rootIntervals;

    expect(actual).toEqual(expectedIntervals);
  } );
} );
