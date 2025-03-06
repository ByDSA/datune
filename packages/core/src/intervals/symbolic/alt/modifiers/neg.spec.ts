import type { Interval } from "../Interval";
import { neg as DIntervalsNeg } from "intervals/symbolic/diatonic/modifiers/neg";
import { Intervals as I } from "..";
import { neg } from "./neg";

describe.each([
  I.m2,
  I.M2,
  I.m3,
  I.M3,
  I.P4,
  I.a4,
  I.d5,
  I.a5,
  I.m6,
  I.M6,
  I.m7,
  I.M7,
  I.P8,
])("tests", (interval: Interval) => {
  it(`same diatonicInterval but negative: ${String(interval)}`, () => {
    const negative = neg(interval);
    const negativeDiatonicInterval = negative.diatonicInterval;
    const positiveDiatonicInterval = interval.diatonicInterval;

    expect(DIntervalsNeg(negativeDiatonicInterval)).toBe(positiveDiatonicInterval);
  } );

  it(`same quality: ${String(interval)}`, () => {
    const negative = neg(interval);
    const negativeQuality = negative.quality;
    const positiveQuality = interval.quality;

    expect(negativeQuality).toBe(positiveQuality);
  } );

  it(`reversible ${String(interval)}`, () => {
    const negative = neg(interval);
    const doubleNegative = neg(negative);

    expect(doubleNegative).toBe(interval);
  } );
} );

describe("p1", () => {
  it(`same diatonicInterval: ${String(I.P1)}`, () => {
    const interval = I.P1;

    expect(interval).toBeDefined();

    const negative = neg(interval);
    const negativeDiatonicInterval = negative.diatonicInterval;
    const positiveDiatonicInterval = interval.diatonicInterval;

    expect(negativeDiatonicInterval).toBe(positiveDiatonicInterval);
  } );

  const interval = I.P1;

  it(`same quality: ${String(interval)}`, () => {
    const negative = neg(interval);
    const negativeQuality = negative.quality;
    const positiveQuality = interval.quality;

    expect(negativeQuality).toBe(positiveQuality);
  } );

  it(`reversible ${String(interval)}`, () => {
    const negative = neg(interval);
    const doubleNegative = neg(negative);

    expect(doubleNegative).toBe(interval);
  } );
} );
