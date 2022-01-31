import { AUGMENTED, DIMINISHED, DOUBLY_AUGMENTED, DOUBLY_DIMINISHED, MAJOR, MINOR, PERFECT } from "../constants";
import Quality from "../Quality";
import toInt from "./int";

describe.each([
  [PERFECT, true, 0],
  [MAJOR, false, 0],
  [MINOR, false, -1],
  [DIMINISHED, true, -1],
  [DIMINISHED, false, -2],
  [DOUBLY_DIMINISHED, true, -2],
  [DOUBLY_DIMINISHED, false, -3],
  [AUGMENTED, true, 1],
  [AUGMENTED, false, 1],
  [DOUBLY_AUGMENTED, true, 2],
  [DOUBLY_AUGMENTED, false, 2],
  // invalids
  [PERFECT, false, null],
  [MAJOR, true, null],
  [MINOR, true, null],
])("tests", (quality: Quality, isMain: boolean, expected: number | null) => {
  it(`int(${quality}, isMain=${isMain}) => "${expected}"`, () => {
    const actual = toInt(quality, isMain);

    expect(actual).toBe(expected);
  } );
} );
