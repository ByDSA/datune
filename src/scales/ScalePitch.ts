import { IntervalPitch } from '../tuning/IntervalPitch';
import { ScaleAbstract } from './ScaleAbstract';
import { ScalePitchCache, HashingObject } from './ScalePitchCache';

export class ScalePitch extends ScaleAbstract<IntervalPitch, number> {
    static MAJOR_ET12: ScalePitch;
    static MAJOR_PYTHAGOREAN: ScalePitch;

    private static _cache = new ScalePitchCache((hashingObject: HashingObject) => new ScalePitch(...hashingObject));

    private constructor(...intervals: IntervalPitch[]) {
        super(...intervals);
    }

    static fromIntervals(...intervals: IntervalPitch[]): ScalePitch {
        return ScalePitch._cache.getOrCreate(intervals);
    }

    getMode(n: number): ScalePitch {
        let intervals = this.getModeIntraIntervals(n);
        return ScalePitch.fromIntervals(...intervals);
    }

    protected calculateDegrees() {
        this._precalcDegrees = [];
        for (let i = 0; i < this._intraIntervals.length - 1; i++) {
            this._precalcDegrees.push(i);
        }
        Object.freeze(this._precalcDegrees);
    }
}