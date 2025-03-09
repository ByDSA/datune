import { Intervals as I } from "intervals/chromatic";
import { Intervals as AI } from "intervals/alt";
import { neg } from "intervals/symbolic/alt/modifiers/neg";
import { fromAltInterval } from "./altInterval";

const { a4, a8, a7, a1, d8, d7, d1, da4, da7, dd7, M7, m7, P8, P5 } = AI;

describe.each([
  [a1, I.m2],
  [d1, -I.m2],
  [P5, I.P5],
  [P8, I.P8],
  [a7, I.P8],
  [d8, I.M7],
  [a8, I.m9],
  [M7, I.M7],
  [a7, I.P8],
  [da7, I.m9],
  [m7, I.m7],
  [d7, I.M6],
  [dd7, I.m6],
  [a4, I.d5],
  [da4, I.P5],
])("tests", (interval, expected) => {
  it(`${String(interval)} => ${expected}`, () => {
    const actual = fromAltInterval(interval);

    expect(actual).toBe(expected);
  } );

  it(`negative: ${String(neg(interval))} => ${-expected}`, () => {
    const actual = fromAltInterval(neg(interval));

    expect(actual).toBe(-expected);
  } );
} );
