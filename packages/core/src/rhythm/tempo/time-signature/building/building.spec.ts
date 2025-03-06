import { MusicalDurations } from "rhythm";
import { RhythmPatterns } from "../../../pattern";
import { fromAdditive, fromFrac, fromPattern, fromRhythmArray } from ".";

it("imported constants should be defined", () => {
  expect(MusicalDurations.EIGHTH).toBeDefined();
} );

describe("fromFrac", () => {
  it("from numerator (implicit denominator)", () => {
    const expectedDenominator = 4;
    const actual = fromFrac(4);

    expect(actual.denominator).toBe(expectedDenominator);
  } );

  it("from numerator 3/4", () => {
    const expectedNumerator = 3;
    const expectedDenominator = 4;
    const actual = fromFrac(3, 4);

    expect(actual.numerator).toBe(expectedNumerator);
    expect(actual.denominator).toBe(expectedDenominator);
  } );
} );

describe("fromAdditive", () => {
  it("from numerator 3+2/8", () => {
    const expectedNumerator = 5;
    const expectedNumerators = [3, 2];
    const expectedDenominator = 8;
    const actual = fromAdditive([3, 2], MusicalDurations.EIGHTH);

    expect(actual.numerators).toStrictEqual(expectedNumerators);
    expect(actual.numerator).toBe(expectedNumerator);
    expect(actual.denominator).toBe(expectedDenominator);
  } );

  it("from numerator 3+2 (implicit denominator)", () => {
    const expectedDenominator = 4;
    const actual = fromAdditive([3, 2]);

    expect(actual.denominator).toBe(expectedDenominator);
  } );
} );

describe("fromPattern", () => {
  it("from pattern RUMBA/8", () => {
    const expectedNumerator = 12;
    const expectedNumerators = [2, 3, 2, 2, 3];
    const expectedDenominator = 8;
    const actual = fromPattern(RhythmPatterns.RUMBA, MusicalDurations.EIGHTH);

    expect(actual.numerators).toStrictEqual(expectedNumerators);
    expect(actual.numerator).toBe(expectedNumerator);
    expect(actual.denominator).toBe(expectedDenominator);
  } );

  it("from pattern QUARTER (implicit denominator)", () => {
    const expectedDenominator = 4;
    const actual = fromPattern(RhythmPatterns.QUARTER);

    expect(actual.denominator).toBe(expectedDenominator);
  } );
} );

it("from array (3+3)/8", () => {
  const expectedNumerator = 6;
  const expectedNumerators = [3, 3];
  const expectedDenominator = 8;
  const actual = fromRhythmArray([1, 0, 0, 1, 0, 0], MusicalDurations.EIGHTH);

  expect(actual.numerators).toStrictEqual(expectedNumerators);
  expect(actual.numerator).toBe(expectedNumerator);
  expect(actual.denominator).toBe(expectedDenominator);
} );

it("from array (implicit denominator)", () => {
  const expectedDenominator = 4;
  const actual = fromRhythmArray([1, 0, 0]);

  expect(actual.denominator).toBe(expectedDenominator);
} );
