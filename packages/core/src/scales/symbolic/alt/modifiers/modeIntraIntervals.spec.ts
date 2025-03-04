import { Interval, Intervals } from "intervals/alt";
import { TestInit } from "tests";
import { MAJOR } from "../constants";
import { getModeIntraIntervals } from "./modeIntraIntervals";

TestInit.diatonicAltScale();

describe("tests", () => {
  const { M2, m2 } = Intervals;

  it("getModeIntervals - -III  = MINOR.intervals", () => {
    const actual: Interval[] = getModeIntraIntervals(MAJOR, -3);
    const expected: Interval[] = [
      M2,
      m2,
      M2,
      M2,
      m2,
      M2,
      M2,
    ];

    expect(actual).toStrictEqual(expected);
  } );

  it("getModeIntervals - VI  = MINOR.intervals", () => {
    const actual: Interval[] = getModeIntraIntervals(MAJOR, 6);
    const expected: Interval[] = [
      M2,
      m2,
      M2,
      M2,
      m2,
      M2,
      M2,
    ];

    expect(actual).toStrictEqual(expected);
  } );
} );
