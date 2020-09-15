import * as init from "../initializer";
import { IntervalPitch } from '../tuning/IntervalPitch';
import { Ratio } from '../tuning/ratios/Ratio';
import { RatioFrac } from '../tuning/ratios/RatioFrac';
import { ScalePitchGenerator } from './ScalePitchGenerator';
init.intervalPitches.default();

test('from', () => {
    let generator = ScalePitchGenerator.from(IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH, 7);
    expect(generator.interval).toBe(IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH);
    expect(generator.length).toBe(7);
});

test('generate - unreducted intervals', () => {
    let generator = ScalePitchGenerator.from(IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH, 7);
    let scale = generator.generate();
    let unreducted = (<any>generator)._unreductedIntervals;

    let r: Ratio = RatioFrac.from(3, 2);
    let expected = [
        IntervalPitch.UNISON,
        IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH,
        IntervalPitch.from(r.getMult(r)),
        IntervalPitch.from(r.getMult(r).getMult(r)),
        IntervalPitch.from(r.getMult(r).getMult(r).getMult(r)),
        IntervalPitch.from(r.getMult(r).getMult(r).getMult(r).getMult(r)),
        IntervalPitch.from(r.getMult(r).getMult(r).getMult(r).getMult(r).getMult(r)),
    ];
    expect(unreducted).toStrictEqual(expected);
});

test('generate - unordered intervals', () => {
    let generator = ScalePitchGenerator.from(IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH, 7);
    let scale = generator.generate();
    let unordered = (<any>generator)._unorderedIntervals;

    let expected = [
        IntervalPitch.UNISON,
        IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH,
        IntervalPitch.PYTHAGOREAN.MAJOR_SECOND,
        IntervalPitch.PYTHAGOREAN.MAJOR_SIXTH,
        IntervalPitch.PYTHAGOREAN.MAJOR_THIRD,
        IntervalPitch.PYTHAGOREAN.MAJOR_SEVENTH,
        IntervalPitch.PYTHAGOREAN.AUGMENTED_FOURTH,
    ];
    expect(unordered[0]).toEqual(expected[0]);
    expect(unordered[1]).toEqual(expected[1]);
    expect(unordered[2]).toEqual(expected[2]);
    expect(unordered[3]).toEqual(expected[3]);
    expect(unordered[4]).toEqual(expected[4]);
    expect(unordered[5]).toEqual(expected[5]);
    expect(unordered[6]).toEqual(expected[6]);
    expect(unordered).toStrictEqual(expected);
});

test('generate - ordered intervals', () => {
    let generator = ScalePitchGenerator.from(IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH, 7);
    let scale = generator.generate();
    let ordered = (<any>generator)._orderedIntervals;

    let expected = [
        IntervalPitch.UNISON,
        IntervalPitch.PYTHAGOREAN.MAJOR_SECOND,
        IntervalPitch.PYTHAGOREAN.MAJOR_THIRD,
        IntervalPitch.PYTHAGOREAN.AUGMENTED_FOURTH,
        IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH,
        IntervalPitch.PYTHAGOREAN.MAJOR_SIXTH,
        IntervalPitch.PYTHAGOREAN.MAJOR_SEVENTH,
    ];
    expect(ordered[0]).toEqual(expected[0]);
    expect(ordered[1]).toEqual(expected[1]);
    expect(ordered[2]).toEqual(expected[2]);
    expect(ordered[3]).toEqual(expected[3]);
    expect(ordered[4]).toEqual(expected[4]);
    expect(ordered[5]).toEqual(expected[5]);
    expect(ordered[6]).toEqual(expected[6]);
    expect(ordered).toStrictEqual(expected);
});