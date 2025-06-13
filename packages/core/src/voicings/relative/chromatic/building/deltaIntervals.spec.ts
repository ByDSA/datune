import type { Voicing } from "../Voicing";
import { NonEmptyNumberArray } from "datils";
import { Voicings as V } from "..";
import { fromDeltaIntervals } from "./deltaIntervals";

const { TRIAD_MAJOR } = V;

describe.each(<[NonEmptyNumberArray, Voicing][]>[
  [[4, 3], TRIAD_MAJOR],
])("fromDeltaIntervals", (deltaIntervals: NonEmptyNumberArray, expectedVoicing) => {
  it(`${deltaIntervals} => ${expectedVoicing}`, () => {
    const actual = fromDeltaIntervals(...deltaIntervals);

    expect(actual).toBe(expectedVoicing);
  } );
} );
