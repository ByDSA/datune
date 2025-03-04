import type { Arrays } from "@datune/utils";
import type { Voicing } from "../Voicing";
import { TestInit } from "tests";
import { TRIAD_MAJOR } from "../constants";
import { fromIntraIntervals } from "./intraIntervals";

TestInit.chromaticVoicing();

describe.each(<[Arrays.Number, Voicing][]>[
  [[4, 3], TRIAD_MAJOR],
])("fromIntraIntervals", (intraIntervals: Arrays.Number, expectedVoicing) => {
  it(`${intraIntervals} => ${expectedVoicing}`, () => {
    const actual = fromIntraIntervals(...intraIntervals);

    expect(actual).toBe(expectedVoicing);
  } );
} );
