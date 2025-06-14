import type { IntervalSet } from "../IntervalSet";
import { NonEmptyNumberArray } from "datils";
import { IntervalSets as IS } from "..";
import { fromDeltaIntervals } from "./deltaIntervals";

const { TRIAD_MAJOR } = IS;

describe.each(<[NonEmptyNumberArray, IntervalSet][]>[
  [[4, 3], TRIAD_MAJOR],
])("fromDeltaIntervals", (deltaIntervals: NonEmptyNumberArray, expectedIntervalSet) => {
  it(`${deltaIntervals} => ${expectedIntervalSet}`, () => {
    const actual = fromDeltaIntervals(...deltaIntervals);

    expect(actual).toBe(expectedIntervalSet);
  } );
} );
