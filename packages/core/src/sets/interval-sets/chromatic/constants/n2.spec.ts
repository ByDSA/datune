import type { IntervalSet } from "../IntervalSet";
import type { Interval } from "intervals/chromatic";
import { IntervalSets as IS } from "..";

const { M2, M3, m2, m3, POWER_CHORD, TRITONE } = IS;

describe.each([
  [m2, [0, 1]],
  [M2, [0, 2]],
  [m3, [0, 3]],
  [M3, [0, 4]],
  [TRITONE, [0, 6]],
  [POWER_CHORD, [0, 7]],
])("rootIntervals n=2", (intervalSet: IntervalSet, expectedIntervals: Interval[]) => {
  it(`${String(intervalSet)} rootIntervals=${expectedIntervals}`, () => {
    const actual = intervalSet.rootIntervals;

    expect(actual).toEqual(expectedIntervals);
  } );
} );
