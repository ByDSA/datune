import { PrecalcCache } from '../common/PrecalcCache';
import { IntervalPitch } from '../tuning/IntervalPitch';
import { ScaleAbstract } from './ScaleAbstract';

type HashingObject = IntervalPitch[];
export class ScalePitch extends ScaleAbstract<IntervalPitch, number> {
    static MAJOR_ET12: ScalePitch;
    static MAJOR_PYTHAGOREAN: ScalePitch;

    private static immutablesCache = new PrecalcCache<ScalePitch, HashingObject>(
        function (hashingObject: HashingObject): string {
            let ret = "";
            for (const interval of hashingObject)
                ret += interval.hashCode() + "|";
            return ret;
        },
        function (scale: ScalePitch): HashingObject {
            return scale.intraIntervals;
        },
        function (hashingObject: HashingObject): ScalePitch {
            return new ScalePitch(...hashingObject);
        }
    );

    private constructor(...intervals: IntervalPitch[]) {
        super(...intervals);
    }

    public static fromIntervals(...intervals: IntervalPitch[]): ScalePitch {
        return ScalePitch.immutablesCache.getOrCreate(intervals);
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

    private static initialize() {
        this.MAJOR_ET12 = ScalePitch.fromIntervals(
            IntervalPitch.UNISON,
            IntervalPitch.ET12.MAJOR_SECOND,
            IntervalPitch.ET12.MAJOR_THIRD,
            IntervalPitch.ET12.PERFECT_FOURTH,
            IntervalPitch.ET12.PERFECT_FIFTH,
            IntervalPitch.ET12.MAJOR_SIXTH,
            IntervalPitch.ET12.MAJOR_SEVENTH,
        );

        this.MAJOR_PYTHAGOREAN = ScalePitch.fromIntervals(
            IntervalPitch.UNISON,
            IntervalPitch.PYTHAGOREAN.MAJOR_SECOND,
            IntervalPitch.PYTHAGOREAN.MAJOR_THIRD,
            IntervalPitch.PYTHAGOREAN.PERFECT_FOURTH,
            IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH,
            IntervalPitch.PYTHAGOREAN.MAJOR_SIXTH,
            IntervalPitch.PYTHAGOREAN.MAJOR_SEVENTH,
        );
    }
}