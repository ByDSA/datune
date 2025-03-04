import { TestInit } from "tests";
import * as DIntervals from "../../diatonic/constants";
import { fromIntervalQuality } from "../building/intervalQuality";
import { M } from "../quality/constants";
import * as C from "./index";

describe("initial state", () => {
  it("should be undefined", () => {
    expect(C.P1).toBeUndefined();
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
    expect(C.P1).toBeDefined();
    expect(C.P1.quality).toBeDefined();
    expect(C.P1.diatonicInterval).toBeDefined();
  } );

  it("cache", () => {
    const expected = C.M3;
    const actual = fromIntervalQuality(DIntervals.THIRD, M);

    expect(actual).toBe(expected);
  } );

  it("cachex", () => {
    expect(C.M3.diatonicInterval).toBe(DIntervals.THIRD);
    expect(C.M3.quality).toBe(M);
  } );
} );
