import { arrayRotateLeft, arrayRotateRight } from '@datune/utils/Utils';

export abstract class ScaleAbstract<I, D> {
    protected _intraIntervals: I[];
    protected _precalcDegrees: D[] = null;
    protected _precalcModes: ScaleAbstract<I, D>[] = null;

    protected constructor(...intraIntervals: I[]) {
        this._intraIntervals = intraIntervals;
        Object.freeze(this._intraIntervals);
    }

    // Modes

    get modes(): ScaleAbstract<I, D>[] {
        if (!this._precalcModes)
            this.calculateModes();

        return this._precalcModes;
    }

    private calculateModes(): void {
        let scaleTmp: ScaleAbstract<I, D> = this;
        this._precalcModes = [this];
        while (true) {
            scaleTmp = scaleTmp.getMode(2);
            if (scaleTmp == this)
                break;
            this._precalcModes.push(scaleTmp);
        }
    }

    abstract getMode(n: number): any;

    protected getModeIntraIntervals(n: number): I[] {
        let intervals: I[] = this.intraIntervals;
        if (n > 0)
            arrayRotateLeft(intervals, n - 1);
        else if (n < 0)
            arrayRotateRight(intervals, -n - 1);

        return intervals;
    }

    // Absolute Intervals

    get degrees(): D[] {
        if (this._precalcDegrees == null)
            this.calculateDegrees();
        return this._precalcDegrees;
    }

    protected abstract calculateDegrees();

    get intraIntervals(): I[] {
        return Array.from(this._intraIntervals);
    }

    get length(): number {
        return this._intraIntervals.length;
    }

    hasDegrees(...degrees: D[]): boolean {
        for (let degree of degrees) {
            if (!this.degrees.includes(degree))
                return false;
        }

        return true;
    }
}