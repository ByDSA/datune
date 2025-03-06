import type { Interval } from "../Interval";
import { Intervals as I } from "..";
import { neg } from "../modifiers/neg";
import { hash } from "./hashObj";

const { FIFTEENTH, SECOND, THIRD, UNISON } = I;

describe.each([
  [UNISON, "+0"],
  [neg(UNISON), "-0"],
  [SECOND, "+1"],
  [neg(THIRD), "-2"],
  [FIFTEENTH, "+14"],

])("tests", (obj: Interval, hashCode: string) => {
  it(`hash(${obj}) => "${hashCode}"`, () => {
    const actual = hash(obj);

    expect(actual).toBe(hashCode);
  } );
} );
