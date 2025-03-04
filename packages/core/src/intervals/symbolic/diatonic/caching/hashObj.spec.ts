import type { Interval } from "../Interval";
import { TestInit } from "tests";
import { FIFTEENTH, SECOND, THIRD, UNISON } from "../constants";
import { neg } from "../modifiers/neg";
import { hash } from "./hashObj";

TestInit.diatonicInterval();

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
