import { DIMINISHED_FIFTH, MAJOR_SEVENTH, MAJOR_SIXTH, MINOR_SECOND, MINOR_THIRD, PERFECT_OCTAVE, PERFECT_UNISON } from "../constants";
import { between, betweenNext } from ".";
import type { Interval } from "intervals/chromatic";
import { Pitches, Pitch } from "pitches/chromatic";

const { A, B, C, FF } = Pitches;

describe.each([
  [C, A, MAJOR_SIXTH],
  [A, C, MINOR_THIRD],
  [C, B, MAJOR_SEVENTH],
  [B, C, MINOR_SECOND],
  [C, C, PERFECT_OCTAVE],
])("betweenNext", (from: Pitch, to: Pitch, expected: Interval) => {
  it(`between ${from} and ${to} => ${expected}`, () => {
    const actual = betweenNext(from, to);

    expect(actual).toBe(expected);
  } );
} );

describe.each([
  [A, C, MINOR_THIRD],
  [B, C, MINOR_SECOND],
  [C, C, PERFECT_UNISON],
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
  [C, FF, DIMINISHED_FIFTH],
  [FF, C, DIMINISHED_FIFTH],
])("between (non reversible)", (from: Pitch, to: Pitch, expected: Interval) => {
  it(`between ${from} and ${to} => ${expected}`, () => {
    const actual = between(from, to);

    expect(actual).toBe(expected);
  } );
} );
