import type { Interval } from "../Interval";
import { TestInit } from "tests";
import { d15, M3, m7, P1, P5 } from "../constants";
import { neg } from "../modifiers/neg";
import { hash } from "./hashObj";

TestInit.diatonicAltInterval();

describe.each([
  [P5, "+4P"],
  [P1, "+0P"],
  [neg(P1), "+0P"],
  [m7, "+6m"],
  [d15, "+14d"],
  [neg(M3), "-2M"],
])("tests", (interval: Interval, hashCode: string) => {
  it(`hash(${interval}) => "${hashCode}"`, () => {
    const actual = hash(interval);

    expect(actual).toBe(hashCode);
  } );
} );
