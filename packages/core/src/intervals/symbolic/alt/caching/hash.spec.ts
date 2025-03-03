import { DIMINISHED_FIFTEENTH, MAJOR_THIRD, MINOR_SEVENTH, PERFECT_FIFTH, PERFECT_UNISON } from "../constants";
import type { Interval } from "../Interval";
import { neg } from "../modifiers/neg";
import { hash } from "./hashObj";
import { TestInit } from "tests";

TestInit.diatonicAltInterval();

describe.each([
  [PERFECT_FIFTH, "+4P"],
  [PERFECT_UNISON, "+0P"],
  [neg(PERFECT_UNISON), "+0P"],
  [MINOR_SEVENTH, "+6m"],
  [DIMINISHED_FIFTEENTH, "+14d"],
  [neg(MAJOR_THIRD), "-2M"],
])("tests", (interval: Interval, hashCode: string) => {
  it(`hash(${interval}) => "${hashCode}"`, () => {
    const actual = hash(interval);

    expect(actual).toBe(hashCode);
  } );
} );
