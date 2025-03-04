import { Quality } from "../Quality";
import { a, d, da, dd, M, m, P } from "../constants";
import { toInt } from "../conversions";
import { fromInt } from "./int";

describe.each([
  [0, true, P],
  [1, true, a],
  [-1, true, d],
  [2, true, da],
  [-2, true, dd],
  [0, false, M],
  [-1, false, m],
  [1, false, a],
  [-2, false, d],
  [2, false, da],
  [-3, false, dd],
])("tests", (int: number, isMain: boolean, quality: Quality) => {
  it(`int=${int} isMain=${isMain} => quality=${String(quality)} `, () => {
    const actual = fromInt(int, isMain);

    expect(actual).toBe(quality);
  } );

  it(`${String(quality)} isMain=${isMain} => ${int}`, () => {
    const actual = toInt(quality, isMain);

    expect(actual).toBe(int);
  } );
} );
