import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { Scale } from './Scale';

type Interval = IntervalDiatonicAlt;
export class ScaleGenerator {
    private constructor(private _interval: Interval, private _length: number) {
    }

    private _unorderedIntervals: Interval[];
    private _orderedIntervals: Interval[];

    static from(interval: Interval, length: number): ScaleGenerator {
        if (length < 2)
            throw new Error("Length cannot be lower than 2");
        return new ScaleGenerator(interval, length);
    }

    private calculateUnorderedIntervals() {
        this._unorderedIntervals = [IntervalDiatonicAlt.PERFECT_UNISON, this._interval];
        let lastInterval: Interval = this._unorderedIntervals[1];
        for (let i = 2; i < this._length; i++) {
            lastInterval = lastInterval.withAdd(this._interval);
            this._unorderedIntervals.push(lastInterval);
        }
    }

    private sortIntervals() {
        this._orderedIntervals = Array.from(this._unorderedIntervals);
        this._orderedIntervals.sort((a, b) => a.intervalChromatic - b.intervalChromatic);
    }

    generate(): Scale {
        this.calculateUnorderedIntervals();
        this.sortIntervals();

        return Scale.fromIntraIntervals(...this._orderedIntervals);
    }

    get interval(): Interval {
        return this._interval;
    }

    get length(): number {
        return this._length;
    }
}