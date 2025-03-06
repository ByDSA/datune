import type { Interval } from "../Interval";
import { neg } from "../modifiers/neg";
import { Intervals as I } from "..";
import { hash } from "./hashObj";

const { d15, M3, m7, P1, P5 } = I;

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
