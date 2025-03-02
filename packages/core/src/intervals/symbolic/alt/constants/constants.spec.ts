import * as DIntervals from "../../diatonic/constants";
import { fromIntervalQuality } from "../building/intervalQuality";
import { MAJOR } from "../quality/constants";
import * as C from "./index";
import { TestInit } from "tests";

describe("initial state", () => {
  it("should be undefined", () => {
    expect(C.PERFECT_UNISON).toBeUndefined();
  } );
} );

describe("after initialization", () => {
  beforeAll(() => {
    TestInit.diatonicAltInterval();
  } );

  it("diatonicIntervals constants should be defined", () => {
    expect(DIntervals.UNISON).toBeDefined();
  } );

  it("constants should be defined", () => {
    expect(C.PERFECT_UNISON).toBeDefined();
    expect(C.PERFECT_UNISON.quality).toBeDefined();
    expect(C.PERFECT_UNISON.diatonicInterval).toBeDefined();
  } );

  it("cache", () => {
    const expected = C.MAJOR_THIRD;
    const actual = fromIntervalQuality(DIntervals.THIRD, MAJOR);

    expect(actual).toBe(expected);
  } );

  it("cachex", () => {
    expect(C.MAJOR_THIRD.diatonicInterval).toBe(DIntervals.THIRD);
    expect(C.MAJOR_THIRD.quality).toBe(MAJOR);
  } );
} );
