import type { Interval } from "../Interval";
import { TestInit } from "tests";
import { neg as DIntervalsNeg } from "intervals/symbolic/diatonic/modifiers/neg";
import * as C from "../constants";
import { neg } from "./neg";

TestInit.diatonicAltInterval();

describe.each([
  ()=>C.m2,
  ()=>C.M2,
  ()=>C.m3,
  ()=>C.M3,
  ()=>C.P4,
  ()=>C.a4,
  ()=>C.d5,
  ()=>C.a5,
  ()=>C.m6,
  ()=>C.M6,
  ()=>C.m7,
  ()=>C.M7,
  ()=>C.P8,
])("tests", (getInterval: ()=> Interval) => {
  const interval = getInterval();

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
  it(`same diatonicInterval: ${String(C.P1)}`, () => {
    const interval = C.P1;

    expect(interval).toBeDefined();

    const negative = neg(interval);
    const negativeDiatonicInterval = negative.diatonicInterval;
    const positiveDiatonicInterval = interval.diatonicInterval;

    expect(negativeDiatonicInterval).toBe(positiveDiatonicInterval);
  } );

  const interval = C.P1;

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
