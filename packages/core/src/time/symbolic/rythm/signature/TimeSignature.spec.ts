import { MusicalDuration } from "../../../../time";
import { RhythmPattern } from "../pattern/RhythmPattern";
import { TimeSignature } from "./TimeSignature";

it(`from numerator (implicit denominator)`, () => {
    const expectedDenominator = 4;
    const actual = TimeSignature.fromFrac(4);

    expect(actual.denominator).toBe(expectedDenominator);
});

it(`from numerator 3/4`, () => {
    const expectedNumerator = 3;
    const expectedDenominator = 4;
    const actual = TimeSignature.fromFrac(3, 4);

    expect(actual.numerator).toBe(expectedNumerator);
    expect(actual.denominator).toBe(expectedDenominator);
});

it(`from numerator 3+2/8`, () => {
    const expectedNumerator = 5;
    const expectedNumerators = [3, 2];
    const expectedDenominator = 8;
    const actual = TimeSignature.fromAdditive([3, 2], MusicalDuration.EIGHTH);

    expect(actual.numerators).toStrictEqual(expectedNumerators);
    expect(actual.numerator).toBe(expectedNumerator);
    expect(actual.denominator).toBe(expectedDenominator);
});

it(`from numerator 3+2 (implicit denominator)`, () => {
    const expectedDenominator = 4;
    const actual = TimeSignature.fromAdditive([3, 2]);

    expect(actual.denominator).toBe(expectedDenominator);
});

it(`from pattern RUMBA/8`, () => {
    const expectedNumerator = 12;
    const expectedNumerators = [2, 3, 2, 2, 3];
    const expectedDenominator = 8;
    const actual = TimeSignature.fromPattern(RhythmPattern.RUMBA, MusicalDuration.EIGHTH);

    expect(actual.numerators).toStrictEqual(expectedNumerators);
    expect(actual.numerator).toBe(expectedNumerator);
    expect(actual.denominator).toBe(expectedDenominator);
});

it(`from pattern QUARTER (implicit denominator)`, () => {
    const expectedDenominator = 4;
    const actual = TimeSignature.fromPattern(RhythmPattern.QUARTER);

    expect(actual.denominator).toBe(expectedDenominator);
});

it(`from array (3+3)/8`, () => {
    const expectedNumerator = 6;
    const expectedNumerators = [3, 3];
    const expectedDenominator = 8;
    const actual = TimeSignature.fromRhythmArray([1,0,0,1,0,0], MusicalDuration.EIGHTH);

    expect(actual.numerators).toStrictEqual(expectedNumerators);
    expect(actual.numerator).toBe(expectedNumerator);
    expect(actual.denominator).toBe(expectedDenominator);
});

it(`from array (implicit denominator)`, () => {
    const expectedDenominator = 4;
    const actual = TimeSignature.fromRhythmArray([1,0,0]);

    expect(actual.denominator).toBe(expectedDenominator);
});