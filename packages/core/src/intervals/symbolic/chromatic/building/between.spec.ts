import type { Interval } from "intervals/chromatic";
import type { Pitch } from "pitches/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { Degree, Degrees as D } from "chromatic";
import { Intervals as I } from "..";
import { between, betweenNext } from ".";

const { A, B, C, FF } = P;
const { d5, M7, M6, m2, m3, P8, P1 } = I;

describe.each([
  [C, A, M6],
  [A, C, m3],
  [C, B, M7],
  [B, C, m2],
  [C, C, P8],
])("betweenNext pitches", (from: Pitch, to: Pitch, expected: Interval) => {
  it(`between ${from} and ${to} => ${expected}`, () => {
    const actual = betweenNext(from, to);

    expect(actual).toBe(expected);
  } );
} );

describe.each([
  [D.I, D.VI, M6],
  [D.VI, D.I, m3],
  [D.I, D.VII, M7],
  [D.VII, D.I, m2],
  [D.I, D.I, P8],
])("betweenNext degrees", (from: Degree, to: Degree, expected: Interval) => {
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
