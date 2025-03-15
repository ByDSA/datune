import type { Interval } from "../Interval";
import { neg } from "../modifiers/neg";
import { Intervals as I } from "..";
import { getObjId } from "./cache";

const { d15, M3, m7, P1, P5 } = I;

describe.each([
  [P5, "+4P"],
  [P1, "+0P"],
  [neg(P1), "+0P"],
  [m7, "+6m"],
  [d15, "+14d"],
  [neg(M3), "-2M"],
])("tests", (interval: Interval, id: string) => {
  it(`getObjId(${interval}) => "${id}"`, () => {
    const actual = getObjId(interval);

    expect(actual).toBe(id);
  } );
} );
