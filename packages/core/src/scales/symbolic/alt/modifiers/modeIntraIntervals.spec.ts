import type { Interval } from "intervals/alt";
import { Intervals as I } from "intervals/alt";
import { Scales as S } from "..";
import { getModeIntraIntervals } from "./modeIntraIntervals";

const { MAJOR } = S;
const { M2, m2 } = I;

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
