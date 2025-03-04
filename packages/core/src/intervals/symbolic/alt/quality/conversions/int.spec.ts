import type { Quality } from "../Quality";
import { a, d, da, dd, M, m, P } from "../constants";
import { toInt } from "./int";

describe.each([
  [P, true, 0],
  [M, false, 0],
  [m, false, -1],
  [d, true, -1],
  [d, false, -2],
  [dd, true, -2],
  [dd, false, -3],
  [a, true, 1],
  [a, false, 1],
  [da, true, 2],
  [da, false, 2],
  // invalids
  [P, false, null],
  [M, true, null],
  [m, true, null],
])("tests", (quality: Quality, isMain: boolean, expected: number | null) => {
  it(`int(${quality}, isMain=${isMain}) => "${expected}"`, () => {
    const actual = toInt(quality, isMain);

    expect(actual).toBe(expected);
  } );
} );
