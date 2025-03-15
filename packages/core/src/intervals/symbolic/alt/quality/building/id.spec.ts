import type { Quality } from "../Quality";
import { a, d, da, dd, M, m, P } from "../constants";
import { getObjId } from "./id";

describe.each([
  [P, "P"],
  [M, "M"],
  [m, "m"],
  [d, "d"],
  [dd, "dd"],
  [a, "a"],
  [da, "da"],
])("tests", (quality: Quality, id: string) => {
  it(`getObjId(${quality}) => "${id}"`, () => {
    const actual = getObjId(quality);

    expect(actual).toBe(id);
  } );
} );
