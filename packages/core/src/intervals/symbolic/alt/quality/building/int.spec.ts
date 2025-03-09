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

describe.each([
  [3, true, "(+3)", 3],
  [6, true, "(+6)", 6],
  [7, true, "(-5)", -5],
  [-3, true, "(-3)", -3],
  [-5, true, "(-5)", -5],
  [-6, true, "(-6)", -6],
  [3, false, "(+3)", 3],
  [6, false, "(+6)", 6],
  [7, false, "(-5)", -5],
  [-4, false, "(-4)", -4],
  [-5, false, "(-5)", -5],
  [-6, false, "(-6)", -6],
  [-7, false, "(+5)", +5],
])("tests out of range", (int: number, isMain: boolean, expectedStr: string, expectedReversedInt: number) => {
  it(`int=${int} isMain=${isMain} => quality=${expectedStr} `, () => {
    const actual = fromInt(int, isMain);

    expect(actual?.toString()).toBe(expectedStr);
  } );

  it(`${String(expectedStr)} isMain=${isMain} => ${expectedReversedInt}`, () => {
    const quality = fromInt(int, isMain);
    const actual = toInt(quality, isMain);

    expect(actual).toBe(expectedReversedInt);
  } );
} );
