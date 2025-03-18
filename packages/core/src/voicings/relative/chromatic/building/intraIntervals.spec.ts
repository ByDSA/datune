import type { Voicing } from "../Voicing";
import { NonEmptyNumberArray } from "datils";
import { Voicings as V } from "..";
import { fromIntraIntervals } from "./intraIntervals";

const { TRIAD_MAJOR } = V;

describe.each(<[NonEmptyNumberArray, Voicing][]>[
  [[4, 3], TRIAD_MAJOR],
])("fromIntraIntervals", (intraIntervals: NonEmptyNumberArray, expectedVoicing) => {
  it(`${intraIntervals} => ${expectedVoicing}`, () => {
    const actual = fromIntraIntervals(...intraIntervals);

    expect(actual).toBe(expectedVoicing);
  } );
} );
