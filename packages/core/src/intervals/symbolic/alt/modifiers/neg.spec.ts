import * as C from "../constants";
import type { Interval } from "../Interval";
import { neg } from "./neg";
import { TestInit } from "tests";
import { neg as DIntervalsNeg } from "intervals/symbolic/diatonic/modifiers/neg";
TestInit.diatonicAltInterval();

describe.each([
  ()=>C.MINOR_SECOND,
  ()=>C.MAJOR_SECOND,
  ()=>C.MINOR_THIRD,
  ()=>C.MAJOR_THIRD,
  ()=>C.PERFECT_FOURTH,
  ()=>C.AUGMENTED_FOURTH,
  ()=>C.DIMINISHED_FIFTH,
  ()=>C.AUGMENTED_FIFTH,
  ()=>C.MINOR_SIXTH,
  ()=>C.MAJOR_SIXTH,
  ()=>C.MINOR_SEVENTH,
  ()=>C.MAJOR_SEVENTH,
  ()=>C.PERFECT_OCTAVE,
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
  it(`same diatonicInterval: ${String(C.PERFECT_UNISON)}`, () => {
    const interval = C.PERFECT_UNISON;

    expect(interval).toBeDefined();

    const negative = neg(interval);
    const negativeDiatonicInterval = negative.diatonicInterval;
    const positiveDiatonicInterval = interval.diatonicInterval;

    expect(negativeDiatonicInterval).toBe(positiveDiatonicInterval);
  } );

  const interval = C.PERFECT_UNISON;

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
