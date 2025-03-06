import type { Interval } from "../Interval";
import { Intervals as I } from "..";
import { mult } from "./mult";
import { neg } from "./neg";

const { a4, a7, d5, d9, d7, m3, P1 } = I;

describe.each([
  [m3, 1, m3],
  [m3, 2, d5],
  [m3, -2, neg(d5)],
  [m3, -0.5, P1],
  [m3, 0.5, P1],
  [m3, -1.5, neg(m3)],
  [m3, 1.5, m3],
  [a4, 2, a7],
  [m3, 4, d9],
  [m3, 3, d7],
  [m3, 0, P1],
  [neg(m3), 0, P1],
  [P1, 500, P1],
  [P1, -500, P1],
  [neg(P1), 500, P1],
])("tests", (interval: Interval, num: number, expectedInterval: Interval) => {
  it(`${String(interval)} * ${num} = ${String(expectedInterval)}`, () => {
    const actual = mult(interval, num);

    expect(actual).toBe(expectedInterval);
  } );
} );
