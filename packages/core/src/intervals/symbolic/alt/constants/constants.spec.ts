import { MAJOR } from "intervals/symbolic/quality";
import { TestInit } from "tests";
import { THIRD } from "../../diatonic";
import { fromIntervalQuality } from "../building";
import { MAJOR_THIRD, PERFECT_UNISON } from "./index";

beforeAll(() => {
  TestInit.diatonicAltInterval();
} );
it("precald defined", () => {
  expect(PERFECT_UNISON).toBeDefined();
} );

it("cache", () => {
  const expected = MAJOR_THIRD;
  const actual = fromIntervalQuality(THIRD, MAJOR);

  expect(actual).toBe(expected);
} );

it("cachex", () => {
  expect(MAJOR_THIRD.diatonicInterval).toBe(THIRD);
  expect(MAJOR_THIRD.quality).toBe(MAJOR);
} );
