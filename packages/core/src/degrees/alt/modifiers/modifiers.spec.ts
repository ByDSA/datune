import type { Interval } from "intervals/alt";
import { Intervals as I } from "intervals/alt";
import { Intervals as DI } from "intervals/diatonic";
import { Degrees as D } from "..";
import { add, sub } from ".";

const { UNISON } = DI;
const { m3, P1 } = I;

describe("add", () => {
  it("bVII + a1 = VII", () => {
    const degree = D.bVII;
    const dInterval = UNISON;
    const interval = I.fromIntervals( {
      chromaticInterval: 1,
      diatonicInterval: dInterval,
    } ) as Interval;
    const sum = add(degree, interval);
    const expected = D.VII;

    expect(sum).toEqual(expected);
  } );

  it("i + m3 = bIII", () => {
    const degree = D.I;
    const interval = m3;
    const sum = add(degree, interval);
    const expected = D.bIII;

    expect(sum).toEqual(expected);
  } );

  it("i + P1 = I", () => {
    const degree = D.I;
    const dInterval = P1;
    const sum = add(degree, dInterval);
    const expected = D.I;

    expect(sum).toBe(expected);
  } );
} );

it("withSub: I - P1 = I", () => {
  const degree = D.I;
  const dInterval = P1;
  const sum = sub(degree, dInterval);
  const expected = D.I;

  expect(sum).toBe(expected);
} );
