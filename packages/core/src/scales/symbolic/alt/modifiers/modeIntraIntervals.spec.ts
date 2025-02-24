/* eslint-disable camelcase */
import { Interval as IntervalDiatonicAlt, MAJOR_SECOND, MINOR_SECOND } from "intervals/alt";
import { TestInit } from "tests";
import { MAJOR } from "../constants";
import getModeIntraIntervals from "./modeIntraIntervals";

TestInit.diatonicAltScale();
it("getModeIntervals - -III  = MINOR.intervals", () => {
  const actual: IntervalDiatonicAlt[] = getModeIntraIntervals(MAJOR, -3);
  const expected: IntervalDiatonicAlt[] = [
    MAJOR_SECOND,
    MINOR_SECOND,
    MAJOR_SECOND,
    MAJOR_SECOND,
    MINOR_SECOND,
    MAJOR_SECOND,
    MAJOR_SECOND,
  ];

  expect(actual).toStrictEqual(expected);
} );

it("getModeIntervals - VI  = MINOR.intervals", () => {
  const actual: IntervalDiatonicAlt[] = getModeIntraIntervals(MAJOR, 6);
  const expected: IntervalDiatonicAlt[] = [
    MAJOR_SECOND,
    MINOR_SECOND,
    MAJOR_SECOND,
    MAJOR_SECOND,
    MINOR_SECOND,
    MAJOR_SECOND,
    MAJOR_SECOND,
  ];

  expect(actual).toStrictEqual(expected);
} );
