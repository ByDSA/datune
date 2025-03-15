import type { Interval } from "../Interval";
import { Intervals as I } from "..";
import { neg } from "../modifiers/neg";
import { getObjId } from "./key-id";

const { FIFTEENTH, SECOND, THIRD, UNISON } = I;

describe.each([
  [UNISON, "+0"],
  [neg(UNISON), "-0"],
  [SECOND, "+1"],
  [neg(THIRD), "-2"],
  [FIFTEENTH, "+14"],

])("tests", (obj: Interval, hashCode: string) => {
  it(`getObjId(${obj}) => "${hashCode}"`, () => {
    const actual = getObjId(obj);

    expect(actual).toBe(hashCode);
  } );
} );
