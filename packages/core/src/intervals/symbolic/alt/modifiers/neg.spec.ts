import { neg as DNeg } from "intervals/diatonic";
import { TestInit } from "tests";
import { AUGMENTED_FIFTH, AUGMENTED_FOURTH, DIMINISHED_FIFTH, MAJOR_SECOND, MAJOR_SEVENTH, MAJOR_SIXTH, MAJOR_THIRD, MINOR_SECOND, MINOR_SEVENTH, MINOR_SIXTH, MINOR_THIRD, PERFECT_FOURTH, PERFECT_OCTAVE, PERFECT_UNISON } from "../constants";
import Interval from "../Interval";
import neg from "./neg";

TestInit.diatonicAltInterval();
describe.each([
  MINOR_SECOND,
  MAJOR_SECOND,
  MINOR_THIRD,
  MAJOR_THIRD,
  PERFECT_FOURTH,
  AUGMENTED_FOURTH,
  DIMINISHED_FIFTH,
  AUGMENTED_FIFTH,
  MINOR_SIXTH,
  MAJOR_SIXTH,
  MINOR_SEVENTH,
  MAJOR_SEVENTH,
  PERFECT_OCTAVE,
])("tests", (interval: Interval) => {
  it(`same diatonicInterval but negative: ${String(interval)}`, () => {
    const negative = neg(interval);
    const negativeDiatonicInterval = negative.diatonicInterval;
    const positiveDiatonicInterval = interval.diatonicInterval;

    expect(DNeg(negativeDiatonicInterval)).toBe(positiveDiatonicInterval);
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

describe("P1", () => {
  const interval = PERFECT_UNISON;

  it(`same diatonicInterval: ${String(interval)}`, () => {
    const negative = neg(interval);
    const negativeDiatonicInterval = negative.diatonicInterval;
    const positiveDiatonicInterval = interval.diatonicInterval;

    expect(negativeDiatonicInterval).toBe(positiveDiatonicInterval);
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
