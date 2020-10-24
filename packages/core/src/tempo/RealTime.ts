import { Time } from './Time';

export class RealTime implements Time {
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

    withSub(time: RealTime): Time {
        return RealTime.fromMillis(this.millis - time.millis);
    }

    withMult(factor: number): Time {
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