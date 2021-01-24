import { DiatonicAlt } from '../../../pitches';
import { IntervalDiatonic } from '../diatonic/IntervalDiatonic';
import { Quality } from '../quality/Quality';
import { IntervalDiatonicAlt } from './IntervalDiatonicAlt';

test('precald defined', () => {
    expect(IntervalDiatonicAlt.PERFECT_UNISON).toBeDefined();
});

it(`cache`, () => {
    const expected = IntervalDiatonicAlt.MAJOR_THIRD;
    const actual = IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.MAJOR);

    expect(actual).toBe(expected);
});

test('fromRootNotes: get from ImmutableCache', () => {
    let intervalDiatonicAlt = IntervalDiatonicAlt.between(DiatonicAlt.C, DiatonicAlt.E);
    let expected = IntervalDiatonicAlt.MAJOR_THIRD;
    expect(intervalDiatonicAlt).toBe(expected);
});

test('Gb to D#: DOUBLY DIMINISHED FIFTH', () => {
    let a = DiatonicAlt.Gb;
    let b = DiatonicAlt.DD;
    let intervalDiatonicAlt = IntervalDiatonicAlt.between(a, b);
    let expected = IntervalDiatonicAlt.DOUBLY_AUGMENTED_FIFTH;
    expect(intervalDiatonicAlt).toBe(expected);
});

test('D# to Gb: DOUBLY DIMINISHED FIFTH', () => {
    let a = DiatonicAlt.DD;
    let b = DiatonicAlt.Gb;
    let intervalDiatonicAlt = IntervalDiatonicAlt.between(a, b);
    let expected = IntervalDiatonicAlt.DOUBLY_DIMINISHED_FOURTH;
    expect(intervalDiatonicAlt).toBe(expected);
});

test('A to A#: ', () => {
    let a = DiatonicAlt.A;
    let b = DiatonicAlt.AA;
    let intervalDiatonicAlt = IntervalDiatonicAlt.between(a, b);
    let expected = IntervalDiatonicAlt.AUGMENTED_UNISON;
    expect(intervalDiatonicAlt).toBe(expected);
});

test('A to G#: ', () => {
    let a = DiatonicAlt.A;
    let b = DiatonicAlt.GG;
    let intervalDiatonicAlt = IntervalDiatonicAlt.between(a, b);
    let expected = IntervalDiatonicAlt.MAJOR_SEVENTH;
    expect(intervalDiatonicAlt).toBe(expected);
});

test('fromIntervalQuality - M3 ', () => {
    let actual = IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.MAJOR);
    let expected = IntervalDiatonicAlt.MAJOR_THIRD;
    expect(actual).toBe(expected);
});

test('fromIntervals - 7 FIFTH = P5 ', () => {
    let actual = IntervalDiatonicAlt.fromIntervals(7, IntervalDiatonic.FIFTH);
    let expected = IntervalDiatonicAlt.PERFECT_FIFTH;
    expect(actual).toBe(expected);
});

test('fromIntervals - 1 UNISON = a1 ', () => {
    let actual = IntervalDiatonicAlt.fromIntervals(1, IntervalDiatonic.UNISON);
    let expected = IntervalDiatonicAlt.AUGMENTED_UNISON;
    expect(actual).toBe(expected);
});

test('interval - AUGMENTED UNISON = 1 ', () => {
    let actual = IntervalDiatonicAlt.AUGMENTED_UNISON.interval
    let expected = 1;
    expect(actual).toBe(expected);
});

test('interval - AUGMENTED FIFTH = 7 ', () => {
    let actual = IntervalDiatonicAlt.PERFECT_FIFTH.interval
    let expected = 7;
    expect(actual).toBe(expected);
});

test('interval - PERFECT OCTAVE = 12 ', () => {
    let actual = IntervalDiatonicAlt.PERFECT_OCTAVE.interval
    let expected = 12;
    expect(actual).toBe(expected);
});

test('fromIntervalQuality - M10 ', () => {
    let actual = IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.MAJOR);
    let expected = IntervalDiatonicAlt.MAJOR_TENTH;
    expect(actual).toBe(expected);
});

test('fromString - M3 ', () => {
    let actual = IntervalDiatonicAlt.fromString("M3");
    let expected = IntervalDiatonicAlt.MAJOR_THIRD;
    expect(actual).toBe(expected);
});

test('fromString - M10 ', () => {
    let actual = IntervalDiatonicAlt.fromString("M10");
    let expected = IntervalDiatonicAlt.MAJOR_TENTH;
    expect(actual).toBe(expected);
});

test('fromString - M17 ', () => {
    let actual = IntervalDiatonicAlt.fromString("M17");
    let expected = IntervalDiatonicAlt.from(IntervalDiatonic.from(17 - 1), Quality.MAJOR);
    expect(actual).toBe(expected);
});

it("withSub", () => {
    let actual = IntervalDiatonicAlt.PERFECT_UNISON.withSub(IntervalDiatonicAlt.MAJOR_THIRD);
    let expected = IntervalDiatonicAlt.MINOR_SIXTH;
    expect(actual).toBe(expected);
})

it("withSub", () => {
    let actual = IntervalDiatonicAlt.PERFECT_UNISON.withSub(IntervalDiatonicAlt.PERFECT_TWELFTH);
    let expected = IntervalDiatonicAlt.PERFECT_FOURTH;
    expect(actual).toBe(expected);
})