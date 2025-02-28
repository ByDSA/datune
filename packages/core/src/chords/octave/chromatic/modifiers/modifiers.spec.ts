import { B7, C7, D7 } from "../constants";
import { add } from ".";
import { TestInit } from "tests";

TestInit.chromaticChord();

describe("withShift", () => {
  it("c7 + 2 = D7", () => {
    const actual = add(C7, 2);
    const expected = D7;

    expect(actual).toBe(expected);
  } );

  it("c7 - 1 = B7", () => {
    const actual = add(C7, -1);
    const expected = B7;

    expect(actual).toBe(expected);
  } );
} );
