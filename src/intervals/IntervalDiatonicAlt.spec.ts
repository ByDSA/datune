import { DiatonicAlt } from '../degrees/DiatonicAlt';
import * as init from "../initializer";
import { IntervalDiatonic } from './IntervalDiatonic';
import { IntervalDiatonicAlt } from './IntervalDiatonicAlt';
import { Quality } from './Quality';
init.settings.default();
init.chromatics.default();
init.diatonicAlts.default();
init.intervalDiatonics.default();
init.intervalDiatonicAlts.default();

test('precald defined', () => {
    expect(IntervalDiatonicAlt.PERFECT_UNISON).toBeDefined();
});
test('fromRootNotes: get from ImmutableCache', () => {
    let intervalDiatonicAlt = IntervalDiatonicAlt.between(DiatonicAlt.C, DiatonicAlt.E)
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

test('intervalChromatic - AUGMENTED UNISON = 1 ', () => {
    let actual = IntervalDiatonicAlt.AUGMENTED_UNISON.intervalChromatic
    let expected = 1;
    expect(actual).toBe(expected);
});

test('intervalChromatic - AUGMENTED FIFTH = 7 ', () => {
    let actual = IntervalDiatonicAlt.PERFECT_FIFTH.intervalChromatic
    let expected = 7;
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