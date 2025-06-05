import { Intervals as I } from "intervals/diatonic";
import { A, B, C, D } from "../constants";
import { shift, shiftDown } from ".";

describe("shift", () => {
  it("should be C+SECOND", () => {
    const base = C;

    expect(base).toBeDefined();

    const interval = I.SECOND;

    expect(interval).toBeDefined();

    const diatonic = shift(base, interval);
    const expected = D;

    expect(expected).toBeDefined();

    expect(diatonic).toBe(expected);
  } );

  it("should be C+NINTH", () => {
    const interval = I.NINTH;

    expect(interval).toBeDefined();

    const diatonic = shift(C, interval);
    const expected = D;

    expect(diatonic).toBe(expected);
  } );
} );

describe("shiftDown", () => {
  it("should be C-SECOND", () => {
    const diatonic = shiftDown(C, I.SECOND);
    const expected = B;

    expect(diatonic).toBe(expected);
  } );

  it("should be C-TENTH", () => {
    const diatonic = shiftDown(C, I.TENTH);
    const expected = A;

    expect(diatonic).toBe(expected);
  } );
} );
