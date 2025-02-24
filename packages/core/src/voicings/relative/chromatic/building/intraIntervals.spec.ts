/* eslint-disable camelcase */
import { Arrays } from "@datune/utils";
import { TestInit } from "tests";
import { TRIAD_MAJOR } from "../constants";
import Voicing from "../Voicing";
import fromIntraIntervals from "./intraIntervals";

TestInit.chromaticVoicing();

describe.each(<[Arrays.Number, Voicing][]>[
  [[4, 3], TRIAD_MAJOR],
])("fromIntraIntervals", (intraIntervals: Arrays.Number, expectedVoicing) => {
  it(`${intraIntervals} => ${expectedVoicing}`, () => {
    const actual = fromIntraIntervals(...intraIntervals);

    expect(actual).toBe(expectedVoicing);
  } );
} );
