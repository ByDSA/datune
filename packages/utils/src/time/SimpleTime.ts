import { ImmutableTime } from "./ImmutableTime";

export class SimpleTime implements ImmutableTime {
    constructor(private _value: number) {
    }

    withAdd(time: SimpleTime): SimpleTime {
        return new SimpleTime(this._value + time._value);
    }

    withSub(time: SimpleTime): SimpleTime {
        return new SimpleTime(this._value - time._value);
    }

    withMult(factor: number): SimpleTime {
        return new SimpleTime(this._value * factor);
    }

    withDivCell(cellSize: SimpleTime): number {
        return Math.floor(this._value / cellSize._value);
    }

    withDiv(n: number): SimpleTime {
        return new SimpleTime(this._value / n);
    }

    valueOf(): number {
        return this._value;
    }
}