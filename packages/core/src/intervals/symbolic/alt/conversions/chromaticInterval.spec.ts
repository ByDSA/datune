import { Intervals as CI } from "intervals/chromatic";
import { neg } from "../modifiers/neg";
import { Intervals as I } from "..";
import { toChromaticInterval } from "./chromaticInterval";

const { a4, a8, a7, a1, d8, d7, d1, da4, da7, dd7, M7, m7, P8, P5 } = I;

describe.each([
  [a1, CI.m2],
  [d1, -CI.m2],
  [P5, CI.P5],
  [P8, CI.P8],
  [a7, CI.P8],
  [d8, CI.M7],
  [a8, CI.m9],
  [M7, CI.M7],
  [a7, CI.P8],
  [da7, CI.m9],
  [m7, CI.m7],
  [d7, CI.M6],
  [dd7, CI.m6],
  [a4, CI.d5],
  [da4, CI.P5],
])("tests", (interval, expected) => {
  it(`${String(interval)} => ${expected}`, () => {
    const actual = toChromaticInterval(interval);

    expect(actual).toBe(expected);
  } );

  it(`negative: ${String(neg(interval))} => ${-expected}`, () => {
    const actual = toChromaticInterval(neg(interval));

    expect(actual).toBe(-expected);
  } );
} );
