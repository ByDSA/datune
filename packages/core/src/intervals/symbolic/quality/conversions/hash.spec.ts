import { AUGMENTED, DIMINISHED, DOUBLY_AUGMENTED, DOUBLY_DIMINISHED, MAJOR, MINOR, PERFECT } from "../constants";
import type { Quality } from "../Quality";
import { hash } from "./hash";

describe.each([
  [PERFECT, "P"],
  [MAJOR, "M"],
  [MINOR, "m"],
  [DIMINISHED, "d"],
  [DOUBLY_DIMINISHED, "dd"],
  [AUGMENTED, "a"],
  [DOUBLY_AUGMENTED, "da"],
])("tests", (quality: Quality, hashCode: string) => {
  it(`hash(${quality}) => "${hashCode}"`, () => {
    const actual = hash(quality);

    expect(actual).toBe(hashCode);
  } );
} );
