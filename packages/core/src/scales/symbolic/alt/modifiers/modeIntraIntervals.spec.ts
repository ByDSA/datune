import { MAJOR } from "../constants";
import { getModeIntraIntervals } from "./modeIntraIntervals";
import { Interval, Intervals } from "intervals/alt";
import { TestInit } from "tests";

TestInit.diatonicAltScale();

describe("tests", () => {
  const { MAJOR_SECOND, MINOR_SECOND } = Intervals;

  it("getModeIntervals - -III  = MINOR.intervals", () => {
    const actual: Interval[] = getModeIntraIntervals(MAJOR, -3);
    const expected: Interval[] = [
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
    const actual: Interval[] = getModeIntraIntervals(MAJOR, 6);
    const expected: Interval[] = [
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
} );
