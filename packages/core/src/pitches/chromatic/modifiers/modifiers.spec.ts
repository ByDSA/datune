import { A, B, C, CC, D } from "../constants";
import { add } from "./add";

describe("shift", () => {
  it("c+1", () => {
    const chromatic = add(C, 1);
    const expected = CC;

    expect(chromatic).toBe(expected);
  } );

  it("c+2", () => {
    const chromatic = add(C, 2);
    const expected = D;

    expect(chromatic).toBe(expected);
  } );

  it("c-1", () => {
    const chromatic = add(C, -1);
    const expected = B;

    expect(chromatic).toBe(expected);
  } );

  it("c+14", () => {
    const chromatic = add(C, 14);
    const expected = D;

    expect(chromatic).toBe(expected);
  } );

  it("c-27", () => {
    const chromatic = add(C, -27);
    const expected = A;

    expect(chromatic).toBe(expected);
  } );
} );
