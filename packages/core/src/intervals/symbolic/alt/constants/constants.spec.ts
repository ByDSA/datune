import { Intervals as DI } from "../../diatonic";
import { fromIntervalQuality } from "../building/intervalQuality";
import { M } from "../quality/constants";
import { Intervals as I } from "..";
import * as Constants from "./index";

describe("initial state", () => {
  it("should be undefined", () => {
    expect(Constants.P1).toBeUndefined();
  } );
} );

describe("after initialization", () => {
  beforeAll(() => {
    I.P1;
  } );

  it("diatonicIntervals constants should be defined", () => {
    expect(I.P1).toBeDefined();
  } );

  it("constants should be defined", () => {
    expect(Constants.P1).toBeDefined();
    expect(Constants.P1.quality).toBeDefined();
    expect(Constants.P1.diatonicInterval).toBeDefined();
  } );

  it("cache", () => {
    const expected = Constants.M3;
    const actual = fromIntervalQuality(DI.THIRD, M);

    expect(actual).toBe(expected);
  } );

  it("cachex", () => {
    expect(Constants.M3.diatonicInterval).toBe(DI.THIRD);
    expect(Constants.M3.quality).toBe(M);
  } );
} );
