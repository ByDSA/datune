import { Pitches as P } from "..";
import { shift } from "./shift";

const { A, B, C, CC, D } = P;

describe("shift", () => {
  it("c+1", () => {
    const chromatic = shift(C, 1);
    const expected = CC;

    expect(chromatic).toBe(expected);
  } );

  it("c+2", () => {
    const chromatic = shift(C, 2);
    const expected = D;

    expect(chromatic).toBe(expected);
  } );

  it("c-1", () => {
    const chromatic = shift(C, -1);
    const expected = B;

    expect(chromatic).toBe(expected);
  } );

  it("c+14", () => {
    const chromatic = shift(C, 14);
    const expected = D;

    expect(chromatic).toBe(expected);
  } );

  it("c-27", () => {
    const chromatic = shift(C, -27);
    const expected = A;

    expect(chromatic).toBe(expected);
  } );
} );
