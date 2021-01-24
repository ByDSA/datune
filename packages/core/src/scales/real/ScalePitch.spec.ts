import { IntervalPitch } from "../../intervals";
import { ScalePitch } from "./ScalePitch";

test('precalc - MAJOR 12-ET', () => {
    let scale = ScalePitch.MAJOR_ET12;

    expect(scale).toBe(ScalePitch.MAJOR_ET12);
});

test('intervals: MAJOR ET-12', () => {
    let scale = ScalePitch.MAJOR_ET12;
    let intraIntervals = scale.intraIntervals;
    expect(intraIntervals).toStrictEqual([
        IntervalPitch.UNISON,
        IntervalPitch.ET12.MAJOR_SECOND,
        IntervalPitch.ET12.MAJOR_THIRD,
        IntervalPitch.ET12.PERFECT_FOURTH,
        IntervalPitch.ET12.PERFECT_FIFTH,
        IntervalPitch.ET12.MAJOR_SIXTH,
        IntervalPitch.ET12.MAJOR_SEVENTH,
    ]);
});

test('intervals: MAJOR PYTHAGOREAN', () => {
    let scale = ScalePitch.MAJOR_PYTHAGOREAN;
    let intraIntervals = scale.intraIntervals;
    expect(intraIntervals).toStrictEqual([
        IntervalPitch.UNISON,
        IntervalPitch.PYTHAGOREAN.MAJOR_SECOND,
        IntervalPitch.PYTHAGOREAN.MAJOR_THIRD,
        IntervalPitch.PYTHAGOREAN.PERFECT_FOURTH,
        IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH,
        IntervalPitch.PYTHAGOREAN.MAJOR_SIXTH,
        IntervalPitch.PYTHAGOREAN.MAJOR_SEVENTH,
    ]);
});