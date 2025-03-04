import { fromIntervalQuality } from "@datune/core/intervals/symbolic/alt/building/intervalQuality";
import { M10, M3 } from "@datune/core/intervals/symbolic/alt/constants";
import { fromInt as intervalDiatonicFromInt } from "@datune/core/intervals/symbolic/diatonic/building";
import { M as MAJOR } from "@datune/core/intervals/symbolic/alt/quality/constants";
import { TestInit } from "tests";
import { parseInterval } from "./interval";

beforeAll(() => {
  TestInit.diatonicAltInterval();
} );

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
  const expected = fromIntervalQuality(intervalDiatonicFromInt(17 - 1), MAJOR);

  expect(actual).toBe(expected);
} );
