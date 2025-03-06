import { fromIntervalQuality } from "@datune/core/intervals/symbolic/alt/building/intervalQuality";
import { fromInt as intervalDiatonicFromInt } from "@datune/core/intervals/symbolic/diatonic/building";
import { IntervalQualities } from "@datune/core";
import { Intervals as I } from "@datune/core/alt";
import { parseInterval } from "./interval";

const { M } = IntervalQualities;
const { M10, M3 } = I;

it("m3", () => {
  const actual = parseInterval("M3");
  const expected = M3;

  expect(actual).toBe(expected);
} );

it("m10", () => {
  const actual = parseInterval("M10");
  const expected = M10;

  expect(actual).toBe(expected);
} );

it("m17", () => {
  const actual = parseInterval("M17");
  const expected = fromIntervalQuality(intervalDiatonicFromInt(17 - 1), M);

  expect(actual).toBe(expected);
} );
