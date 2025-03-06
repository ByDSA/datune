import { Intervals as I } from "intervals/diatonic";
import { A, B, C, D } from "../constants";
import { add, sub } from ".";

describe("add", () => {
  it("should be C+SECOND", () => {
    const base = C;

    expect(base).toBeDefined();

    const interval = I.SECOND;

    expect(interval).toBeDefined();

    const diatonic = add(base, interval);
    const expected = D;

    expect(expected).toBeDefined();

    expect(diatonic).toBe(expected);
  } );

  it("should be C+NINTH", () => {
    const interval = I.NINTH;

    expect(interval).toBeDefined();

    const diatonic = add(C, interval);
    const expected = D;

    expect(diatonic).toBe(expected);
  } );
} );

describe("sub", () => {
  it("should be C-SECOND", () => {
    const diatonic = sub(C, I.SECOND);
    const expected = B;

    expect(diatonic).toBe(expected);
  } );

  it("should be C-TENTH", () => {
    const diatonic = sub(C, I.TENTH);
    const expected = A;

    expect(diatonic).toBe(expected);
  } );
} );
