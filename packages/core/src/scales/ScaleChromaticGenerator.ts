import { Chromatic } from '../degrees/Chromatic';
import { ScaleChromatic } from './ScaleChromatic';

type Interval = number;
export class ScaleChromaticGenerator {
    private constructor(private _interval: Interval, private _length: number) {
    }

    private _unorderedIntervals: Interval[];
    private _orderedIntervals: Interval[];

    static from(interval: Interval, length: number): ScaleChromaticGenerator {
        if (length < 2)
            throw new Error("Length cannot be lower than 2");
        return new ScaleChromaticGenerator(interval, length);
    }

    private calculateUnorderedIntervals() {
        this._unorderedIntervals = [0, this._interval];
        let lastInterval: Interval = this._unorderedIntervals[1];
        for (let i = 2; i < this._length; i++) {
            lastInterval = (lastInterval + this._interval) % Chromatic.NUMBER;
            this._unorderedIntervals.push(lastInterval);
        }
    }

    private sortIntervals() {
        this._orderedIntervals = Array.from(this._unorderedIntervals);
        this._orderedIntervals.sort((a, b) => a - b);
    }

    generate(): ScaleChromatic {
        this.calculateUnorderedIntervals();
        this.sortIntervals();

        return ScaleChromatic.fromIntraIntervals(...this._orderedIntervals);
    }

    get interval(): Interval {
        return this._interval;
    }

    get length(): number {
        return this._length;
    }
}