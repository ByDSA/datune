import { fromIntervalQuality, MAJOR_TENTH, MAJOR_THIRD } from "intervals/alt";
import { fromInt as intervalDiatonicFromInt } from "intervals/diatonic";
import { MAJOR } from "intervals/symbolic/quality";
import { TestInit } from "tests";
import fromString from ".";

beforeAll(() => {
  TestInit.diatonicAltInterval();
} );
it("M3 ", () => {
  const actual = fromString("M3");
  const expected = MAJOR_THIRD;

  expect(actual).toBe(expected);
} );

it("M10 ", () => {
  const actual = fromString("M10");
  const expected = MAJOR_TENTH;

  expect(actual).toBe(expected);
} );

it("M17 ", () => {
  const actual = fromString("M17");
  const expected = fromIntervalQuality(intervalDiatonicFromInt(17 - 1), MAJOR);

  expect(actual).toBe(expected);
} );
