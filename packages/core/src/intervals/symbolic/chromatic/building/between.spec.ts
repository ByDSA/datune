import type { Interval } from "intervals/chromatic";
import { Pitches, Pitch } from "pitches/chromatic";
import { d5, M7, M6, m2, m3, P8, P1 } from "../constants";
import { between, betweenNext } from ".";

const { A, B, C, FF } = Pitches;

describe.each([
  [C, A, M6],
  [A, C, m3],
  [C, B, M7],
  [B, C, m2],
  [C, C, P8],
])("betweenNext", (from: Pitch, to: Pitch, expected: Interval) => {
  it(`between ${from} and ${to} => ${expected}`, () => {
    const actual = betweenNext(from, to);

    expect(actual).toBe(expected);
  } );
} );

describe.each([
  [A, C, m3],
  [B, C, m2],
  [C, C, P1],
])("between", (from: Pitch, to: Pitch, expected: Interval) => {
  it(`between ${from} and ${to} => ${expected}`, () => {
    const actual = between(from, to);

    expect(actual).toBe(expected);
  } );

  it(`between ${to} and ${from} == - between ${from} and ${to}`, () => {
    const expectedInterval = -between(from, to);
    const actual = between(to, from);

    expect(actual === expectedInterval).toBeTruthy(); // 0 === -0
  } );
} );

describe.each([
  [C, FF, d5],
  [FF, C, d5],
])("between (non reversible)", (from: Pitch, to: Pitch, expected: Interval) => {
  it(`between ${from} and ${to} => ${expected}`, () => {
    const actual = between(from, to);

    expect(actual).toBe(expected);
  } );
} );
