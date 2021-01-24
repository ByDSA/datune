import { NonEmptyArray } from '@datune/utils';
import { IntervalPitch } from '../../intervals';
import { Degree } from '../../scales';
import { ScaleAbstract } from '../ScaleAbstract';
import { HashingObject, ScalePitchCache } from './building/cache/ScalePitchCache';

type IntervalPitchArray = NonEmptyArray<IntervalPitch>;
export class ScalePitch extends ScaleAbstract<IntervalPitch, number> {
    private static _cache = new ScalePitchCache((hashingObject: HashingObject) => new ScalePitch(...hashingObject));

    private constructor(...intervals: IntervalPitchArray) {
        super(...intervals);
    }

    static fromIntervals(...intervals: IntervalPitchArray): ScalePitch {
        return ScalePitch._cache.getOrCreate(intervals);
    }

    getMode(n: number): ScalePitch {
        let intervals = this.getModeIntraIntervals(n);
        return ScalePitch.fromIntervals(...intervals);
    }

    protected calcDegrees(): NonEmptyArray<Degree> { // TODO: ????
        let ret = [];
        for (let i = 0; i < this._intraIntervals.length - 1; i++) {
            ret.push(i);
        }

        return <NonEmptyArray<Degree>>ret;
    }

    // SETS
    static get MAJOR_ET12(): ScalePitch {
        if (!_MAJOR_ET12)
            _MAJOR_ET12 = ScalePitch.fromIntervals(
                IntervalPitch.UNISON,
                IntervalPitch.ET12.MAJOR_SECOND,
                IntervalPitch.ET12.MAJOR_THIRD,
                IntervalPitch.ET12.PERFECT_FOURTH,
                IntervalPitch.ET12.PERFECT_FIFTH,
                IntervalPitch.ET12.MAJOR_SIXTH,
                IntervalPitch.ET12.MAJOR_SEVENTH,
            );
        return _MAJOR_ET12;
    }

    static get MAJOR_PYTHAGOREAN(): ScalePitch {
        if (!_MAJOR_PYTHAGOREAN)
            _MAJOR_PYTHAGOREAN = ScalePitch.fromIntervals(
                IntervalPitch.UNISON,
                IntervalPitch.PYTHAGOREAN.MAJOR_SECOND,
                IntervalPitch.PYTHAGOREAN.MAJOR_THIRD,
                IntervalPitch.PYTHAGOREAN.PERFECT_FOURTH,
                IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH,
                IntervalPitch.PYTHAGOREAN.MAJOR_SIXTH,
                IntervalPitch.PYTHAGOREAN.MAJOR_SEVENTH,
            );
        return _MAJOR_PYTHAGOREAN;
    }

    hashCode(): string {
        throw new Error('Method not implemented.');
    }
}
let _MAJOR_ET12: ScalePitch, _MAJOR_PYTHAGOREAN: ScalePitch;