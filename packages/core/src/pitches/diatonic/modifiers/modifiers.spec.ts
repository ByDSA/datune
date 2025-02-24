import { NINTH, SECOND, TENTH } from "intervals/diatonic";
import { TestInit } from "tests";
import { add, sub } from ".";
import { A, B, C, D } from "../constants";

TestInit.diatonicInterval();

describe("add", () => {
  it("C+SECOND", () => {
    const diatonic = add(C, SECOND);
    const expected = D;

    expect(diatonic).toBe(expected);
  } );

  it("C+NINTH", () => {
    const diatonic = add(C, NINTH);
    const expected = D;

    expect(diatonic).toBe(expected);
  } );
} );

describe("sub", () => {
  it("C-SECOND", () => {
    const diatonic = sub(C, SECOND);
    const expected = B;

    expect(diatonic).toBe(expected);
  } );

  it("C-TENTH", () => {
    const diatonic = sub(C, TENTH);
    const expected = A;

    expect(diatonic).toBe(expected);
  } );
} );
