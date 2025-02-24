import { Quality } from "..";
import { AUGMENTED, DIMINISHED, DOUBLY_AUGMENTED, DOUBLY_DIMINISHED, MAJOR, MINOR, PERFECT } from "../constants";
import { toInt } from "../conversions";
import fromInt from "./int";

describe.each([
  [0, true, PERFECT],
  [1, true, AUGMENTED],
  [-1, true, DIMINISHED],
  [2, true, DOUBLY_AUGMENTED],
  [-2, true, DOUBLY_DIMINISHED],
  [0, false, MAJOR],
  [-1, false, MINOR],
  [1, false, AUGMENTED],
  [-2, false, DIMINISHED],
  [2, false, DOUBLY_AUGMENTED],
  [-3, false, DOUBLY_DIMINISHED],
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
