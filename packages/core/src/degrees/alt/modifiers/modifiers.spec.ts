import type { Interval } from "intervals/alt";
import { Intervals as I } from "intervals/alt";
import { Intervals as DI } from "intervals/diatonic";
import { Degrees as D } from "..";
import { shift, shiftDown } from ".";

const { UNISON } = DI;
const { m3, P1 } = I;

describe("shift", () => {
  it("bVII + a1 = VII", () => {
    const degree = D.bVII;
    const dInterval = UNISON;
    const interval = I.fromIntervals( {
      chromaticInterval: 1,
      diatonicInterval: dInterval,
    } ) as Interval;
    const sum = shift(degree, interval);
    const expected = D.VII;

    expect(sum).toEqual(expected);
  } );

  it("i + m3 = bIII", () => {
    const degree = D.I;
    const interval = m3;
    const sum = shift(degree, interval);
    const expected = D.bIII;

    expect(sum).toEqual(expected);
  } );

  it("i + P1 = I", () => {
    const degree = D.I;
    const dInterval = P1;
    const sum = shift(degree, dInterval);
    const expected = D.I;

    expect(sum).toBe(expected);
  } );
} );

it("shiftDown: I - P1 = I", () => {
  const degree = D.I;
  const dInterval = P1;
  const sum = shiftDown(degree, dInterval);
  const expected = D.I;

  expect(sum).toBe(expected);
} );
