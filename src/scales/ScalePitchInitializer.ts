import { IntervalPitch } from '../tuning/IntervalPitch';
import { ScalePitch } from './ScalePitch';
import { intervalPitches } from '../initializer';

export default () => {
    if (ScalePitch.MAJOR_ET12)
        return;

    intervalPitches.default();

    ScalePitch.MAJOR_ET12 = ScalePitch.fromIntervals(
        IntervalPitch.UNISON,
        IntervalPitch.ET12.MAJOR_SECOND,
        IntervalPitch.ET12.MAJOR_THIRD,
        IntervalPitch.ET12.PERFECT_FOURTH,
        IntervalPitch.ET12.PERFECT_FIFTH,
        IntervalPitch.ET12.MAJOR_SIXTH,
        IntervalPitch.ET12.MAJOR_SEVENTH,
    );

    ScalePitch.MAJOR_PYTHAGOREAN = ScalePitch.fromIntervals(
        IntervalPitch.UNISON,
        IntervalPitch.PYTHAGOREAN.MAJOR_SECOND,
        IntervalPitch.PYTHAGOREAN.MAJOR_THIRD,
        IntervalPitch.PYTHAGOREAN.PERFECT_FOURTH,
        IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH,
        IntervalPitch.PYTHAGOREAN.MAJOR_SIXTH,
        IntervalPitch.PYTHAGOREAN.MAJOR_SEVENTH,
    );
}