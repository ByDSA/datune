import type { Arrays } from "@datune/utils";
import type { Voicing } from "../Voicing";
import { Voicings as V } from "..";
import { fromIntraIntervals } from "./intraIntervals";

const { TRIAD_MAJOR } = V;

describe.each(<[Arrays.Number, Voicing][]>[
  [[4, 3], TRIAD_MAJOR],
])("fromIntraIntervals", (intraIntervals: Arrays.Number, expectedVoicing) => {
  it(`${intraIntervals} => ${expectedVoicing}`, () => {
    const actual = fromIntraIntervals(...intraIntervals);

    expect(actual).toBe(expectedVoicing);
  } );
} );
