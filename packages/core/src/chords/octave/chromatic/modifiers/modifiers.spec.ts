/* eslint-disable camelcase */
import { TestInit } from "tests";
import { add } from ".";
import { B7, C7, D7 } from "../constants";

TestInit.chromaticChord();

describe("withShift", () => {
  it("C7 + 2 = D7", () => {
    const actual = add(C7, 2);
    const expected = D7;

    expect(actual).toBe(expected);
  } );

  it("C7 - 1 = B7", () => {
    const actual = add(C7, -1);
    const expected = B7;

    expect(actual).toBe(expected);
  } );
} );
