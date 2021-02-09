import { ImmutableTime } from '@datune/utils';

export class RealTime implements ImmutableTime {
    private constructor(private _millis: number) {
    }

    static fromMillis(millis: number): RealTime {
        return new RealTime(millis);
    }

    get millis(): number {
        return this._millis;
    }

    withAdd(time: RealTime): RealTime {
        return RealTime.fromMillis(this.millis + time.millis);
    }

    withSub(time: RealTime): ImmutableTime {
        return RealTime.fromMillis(this.millis - time.millis);
    }

    withMult(factor: number): ImmutableTime {
        return RealTime.fromMillis(this.millis * factor);
    }

    withDivCell(cellSize: RealTime): number {
        return Math.floor(this.millis / cellSize.millis);
    }

    withDiv(n: number): RealTime {
        return RealTime.fromMillis(this.millis / n);
    }

    valueOf(): number {
        return this.millis;
    }
}