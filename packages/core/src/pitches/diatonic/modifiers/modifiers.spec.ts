import { A, B, C, D } from "../constants";
import { add, sub } from ".";
import { Intervals } from "intervals/diatonic";
import { TestInit } from "tests";

TestInit.diatonicInterval();

describe("add", () => {
  it("should be C+SECOND", () => {
    const base = C;

    expect(base).toBeDefined();

    const interval = Intervals.SECOND;

    expect(interval).toBeDefined();

    const diatonic = add(base, interval);
    const expected = D;

    expect(expected).toBeDefined();

    expect(diatonic).toBe(expected);
  } );

  it("should be C+NINTH", () => {
    const interval = Intervals.NINTH;

    expect(interval).toBeDefined();

    const diatonic = add(C, interval);
    const expected = D;

    expect(diatonic).toBe(expected);
  } );
} );

describe("sub", () => {
  it("should be C-SECOND", () => {
    const diatonic = sub(C, Intervals.SECOND);
    const expected = B;

    expect(diatonic).toBe(expected);
  } );

  it("should be C-TENTH", () => {
    const diatonic = sub(C, Intervals.TENTH);
    const expected = A;

    expect(diatonic).toBe(expected);
  } );
} );
