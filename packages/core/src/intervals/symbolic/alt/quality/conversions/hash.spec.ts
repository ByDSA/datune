import type { Quality } from "../Quality";
import { a, d, da, dd, M, m, P } from "../constants";
import { hash } from "./hash";

describe.each([
  [P, "P"],
  [M, "M"],
  [m, "m"],
  [d, "d"],
  [dd, "dd"],
  [a, "a"],
  [da, "da"],
])("tests", (quality: Quality, hashCode: string) => {
  it(`hash(${quality}) => "${hashCode}"`, () => {
    const actual = hash(quality);

    expect(actual).toBe(hashCode);
  } );
} );
