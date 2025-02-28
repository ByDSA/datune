import { Arrays } from "@datune/utils";
import { TRIAD_MAJOR } from "../constants";
import type { Voicing } from "../Voicing";
import { fromIntraIntervals } from "./intraIntervals";
import { TestInit } from "tests";

TestInit.chromaticVoicing();

describe.each(<[Arrays.Number, Voicing][]>[
  [[4, 3], TRIAD_MAJOR],
])("fromIntraIntervals", (intraIntervals: Arrays.Number, expectedVoicing) => {
  it(`${intraIntervals} => ${expectedVoicing}`, () => {
    const actual = fromIntraIntervals(...intraIntervals);

    expect(actual).toBe(expectedVoicing);
  } );
} );
