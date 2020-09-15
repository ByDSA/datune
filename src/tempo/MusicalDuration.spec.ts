import * as init from "../initializer";
import { BPM } from "./BPM";
import { MusicalDuration } from "./MusicalDuration";
init.musicalDurations.default();
init.bpms.default();

test('precalc - QUARTER', () => {
    let value: number = MusicalDuration.QUARTER.value;

    let expected = 0.25;

    expect(value).toEqual(expected);
});

test('precalc - HALF', () => {
    let value: number = MusicalDuration.HALF.value;

    let expected = 0.5;

    expect(value).toEqual(expected);
});

test('precalc - WHOLE', () => {
    let value: number = MusicalDuration.WHOLE.value;

    let expected = 1;

    expect(value).toEqual(expected);
});

test('precalc - ZERO', () => {
    let value: number = MusicalDuration.ZERO.value;

    let expected = 0;

    expect(value).toEqual(expected);
});

test('fromMillisAndBPM - 1000ms in QUARTER_120 = HALF', () => {
    let bpm: BPM = BPM.QUARTER_120;
    let actual: MusicalDuration = MusicalDuration.fromMillisAndBPM(1000, bpm);
    let expected = MusicalDuration.HALF;

    expect(actual).toEqual(expected);
});

test('withAdd - QUARTER + QUARTER = HALF', () => {
    let actual: MusicalDuration = MusicalDuration.QUARTER.withAdd(MusicalDuration.QUARTER);

    let expected = MusicalDuration.HALF;

    expect(actual).toEqual(expected);
});

test('withAdd - QUARTER + ZERO = QUARTER', () => {
    let actual: MusicalDuration = MusicalDuration.QUARTER.withAdd(MusicalDuration.ZERO);

    let expected = MusicalDuration.QUARTER;

    expect(actual).toEqual(expected);
});

test('withSub - HALF - QUARTER = QUARTER', () => {
    let actual: MusicalDuration = MusicalDuration.HALF.withSub(MusicalDuration.QUARTER);

    let expected = MusicalDuration.QUARTER;

    expect(actual).toEqual(expected);
});

test('withSub - QUARTER - QUARTER = ZERO', () => {
    let actual: MusicalDuration = MusicalDuration.QUARTER.withSub(MusicalDuration.QUARTER);

    let expected = MusicalDuration.ZERO;

    expect(actual).toEqual(expected);
});

test('withMult - QUARTER * 3 = WHOLE-QUARTER', () => {
    let actual: MusicalDuration = MusicalDuration.QUARTER.withMult(3);

    let expected = MusicalDuration.WHOLE.withSub(MusicalDuration.QUARTER);

    expect(actual).toEqual(expected);
});

test('withDiv - WHOLE / 4 = QUARTER', () => {
    let actual: MusicalDuration = MusicalDuration.WHOLE.withDiv(4);

    let expected = MusicalDuration.QUARTER;

    expect(actual).toEqual(expected);
});

test('dotted - QUARTER.dotted = QUARTER + EIGHTH', () => {
    let actual: MusicalDuration = MusicalDuration.QUARTER.dotted;

    let expected = MusicalDuration.QUARTER.withAdd(MusicalDuration.EIGHTH);

    expect(actual).toEqual(expected);
});

test('dotted - QUARTER.dotted.dotted = 2*QUARTER + SIXTEENTH', () => {
    let actual: MusicalDuration = MusicalDuration.QUARTER.dotted.dotted;

    let expected = MusicalDuration.QUARTER.withMult(2).withAdd(MusicalDuration.SIXTEENTH);

    expect(actual).toEqual(expected);
});

test('dotted - QUARTER.triplet*3 = 2*QUARTER', () => {
    let actual: MusicalDuration = MusicalDuration.QUARTER.triplet.withMult(3);

    let expected = MusicalDuration.QUARTER.withMult(2);

    expect(actual).toEqual(expected);
});

test('withDivCell - WHOLE div QUARTER.dotted = 2', () => {
    let actual: number = MusicalDuration.WHOLE.withDivCell(MusicalDuration.QUARTER.dotted);

    let expected = 2;

    expect(actual).toEqual(expected);
});

test('withDivCell - WHOLE div ZERO', () => {
    let actual: number = MusicalDuration.WHOLE.withDivCell(MusicalDuration.ZERO);

    let expected = Infinity;

    expect(actual).toEqual(expected);
});


test('interval - QUARTER < QUARTER.dotted', () => {
    let actual: boolean = MusicalDuration.QUARTER < MusicalDuration.QUARTER.dotted;

    let expected = true;

    expect(actual).toEqual(expected);
});

test('interval - QUARTER.dotted < HALF', () => {
    let actual: boolean = MusicalDuration.QUARTER.dotted < MusicalDuration.HALF;

    let expected = true;

    expect(actual).toEqual(expected);
});
