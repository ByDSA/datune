import * as init from "../initializer";
import { IntervalDiatonic } from "./IntervalDiatonic";
import { Settings } from "../settings/Settings";
import { Language } from "../lang/Language";
init.intervalDiatonics.default();

test('precalc - defined', () => {
    expect(IntervalDiatonic.UNISON).toBeDefined();
});

test('from - cached', () => {
    let actual: IntervalDiatonic = IntervalDiatonic.from(0);
    let expected = IntervalDiatonic.UNISON;

    expect(actual).toEqual(expected);
});

test('valueOf() - UNISON', () => {
    let actual: number = IntervalDiatonic.UNISON.valueOf();
    let expected = 0;

    expect(actual).toEqual(expected);
});

test('valueOf() - OCTAVE', () => {
    let actual: number = IntervalDiatonic.OCTAVE.valueOf();
    let expected = 7;

    expect(actual).toEqual(expected);
});

test('from - uncached', () => {
    let actual: IntervalDiatonic = IntervalDiatonic.from(1234);
    let expected = IntervalDiatonic.from(1234);

    expect(actual).toEqual(expected);
});

test('from - uncached 17', () => {
    let actual: IntervalDiatonic = IntervalDiatonic.from(17);
    let expected = IntervalDiatonic.from(17);

    expect(actual).toEqual(expected);
});

test('toString() - ENG', () => {
    Settings.lang = Language.ENG;

    let actual: string = IntervalDiatonic.UNISON.toString();
    let expected = "UNISON";

    expect(actual).toEqual(expected);
});