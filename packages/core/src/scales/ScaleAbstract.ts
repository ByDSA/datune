import { Arrays, NonEmptyArray } from '@datune/utils';

export abstract class ScaleAbstract<INTERVAL, DEGREE> {
    protected _intraIntervals: NonEmptyArray<INTERVAL>;
    protected _precalcDegrees: NonEmptyArray<DEGREE> | undefined;
    protected _precalcModes: ScaleAbstract<INTERVAL, DEGREE>[] | undefined;

    protected constructor(...intraIntervals: NonEmptyArray<INTERVAL>) {
        this._intraIntervals = intraIntervals;
        Object.freeze(this._intraIntervals);
    }

    // Modes

    get modes(): ScaleAbstract<INTERVAL, DEGREE>[] {
        if (!this._precalcModes) {
            this._precalcModes = this.calcModes();
            Object.freeze(this._precalcModes);
        }

        return this._precalcModes;
    }

    private calcModes(): ScaleAbstract<INTERVAL, DEGREE>[] {
        let scaleTmp: ScaleAbstract<INTERVAL, DEGREE> = this;
        let ret: ScaleAbstract<INTERVAL, DEGREE>[] = [this];
        while (true) {
            scaleTmp = scaleTmp.getMode(2);
            if (scaleTmp == this)
                break;
            ret.push(scaleTmp);
        }

        return ret;
    }

    abstract getMode(n: number): any;

    protected getModeIntraIntervals(n: number): NonEmptyArray<INTERVAL> {
        let intervals: NonEmptyArray<INTERVAL> = this.intraIntervals;
        if (n > 0)
            Arrays.rotateLeft(intervals, n - 1);
        else if (n < 0)
            Arrays.rotateRight(intervals, -n - 1);

        return intervals;
    }

    // Absolute Intervals

    get degrees(): NonEmptyArray<DEGREE> {
        if (!this._precalcDegrees) {
            this._precalcDegrees = this.calcDegrees();
            Object.freeze(this._precalcDegrees);
        }
        return this._precalcDegrees;
    }

    protected abstract calcDegrees(): NonEmptyArray<DEGREE>;

    get intraIntervals(): NonEmptyArray<INTERVAL> {
        return [...this._intraIntervals];
    }

    get length(): number {
        return this._intraIntervals.length;
    }

    hasDegrees(...degrees: NonEmptyArray<DEGREE>): boolean {
        for (let degree of degrees) {
            if (!this.degrees.includes(degree))
                return false;
        }

        return true;
    }

    /** @interal */
    abstract hashCode(): string;
}