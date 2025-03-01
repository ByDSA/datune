import { fromIntervalQuality } from "@datune/core/intervals/symbolic/alt/building/intervalQuality";
import { MAJOR_TENTH, MAJOR_THIRD } from "@datune/core/intervals/symbolic/alt/constants";
import { fromInt as intervalDiatonicFromInt } from "@datune/core/intervals/symbolic/diatonic/building";
import { MAJOR } from "@datune/core/intervals/symbolic/quality";
import { parseInterval } from ".";
import { TestInit } from "tests";

beforeAll(() => {
  TestInit.diatonicAltInterval();
} );

it("m3", () => {
  const actual = parseInterval("M3");
  const expected = MAJOR_THIRD;

  expect(actual).toBe(expected);
} );

it("m10", () => {
  const actual = parseInterval("M10");
  const expected = MAJOR_TENTH;

  expect(actual).toBe(expected);
} );

it("m17", () => {
  const actual = parseInterval("M17");
  const expected = fromIntervalQuality(intervalDiatonicFromInt(17 - 1), MAJOR);

  expect(actual).toBe(expected);
} );
