import { IntervalPitch } from '../tuning/IntervalPitch';
import { Ratio } from '../tuning/ratios/Ratio';
import { RatioFrac } from '../tuning/ratios/RatioFrac';
import { RatioNumber } from '../tuning/ratios/RatioNumber';
import { ScalePitch } from './ScalePitch';

export class ScalePitchGenerator {
    private constructor(private _interval: IntervalPitch, private _length: number) {
    }

    private _unreductedIntervals: IntervalPitch[];
    private _unorderedIntervals: IntervalPitch[];
    private _orderedIntervals: IntervalPitch[];

    static from(interval: IntervalPitch, length: number): ScalePitchGenerator {
        if (length < 2)
            throw new Error("Length cannot be lower than 2");
        return new ScalePitchGenerator(interval, length);
    }

    private calculateUnreductedIntervals() {
        this._unreductedIntervals = [IntervalPitch.UNISON, this._interval];
        let lastInterval: IntervalPitch = this._unreductedIntervals[1];
        for (let i = 2; i < this._length; i++) {
            let newRatio: Ratio = lastInterval.ratio.getMult(this._interval.ratio);
            lastInterval = IntervalPitch.from(newRatio);
            this._unreductedIntervals.push(lastInterval);
        }
    }

    private calculateUnorderedIntervals() {
        this._unorderedIntervals = [];
        for (let i = 0; i < this._length; i++) {
            let unreducted = this._unreductedIntervals[i];
            let oldRatio = unreducted.ratio;
            let newRatio: Ratio = oldRatio;
            while (newRatio.value >= 2) {
                if (unreducted.ratio instanceof RatioFrac) {
                    let fraction = (<any>newRatio).fraction;
                    newRatio = RatioFrac.from(fraction.n, fraction.d * 2);
                } else
                    newRatio = RatioNumber.from(newRatio.value / 2);
            }
            let newInterval: IntervalPitch = IntervalPitch.from(newRatio);
            this._unorderedIntervals.push(newInterval);
        }
    }

    private sortIntervals() {
        this._orderedIntervals = Array.from(this._unorderedIntervals);
        this._orderedIntervals.sort((a, b) => a.ratio.value - b.ratio.value);
    }

    generate(): ScalePitch {
        this.calculateUnreductedIntervals();
        this.calculateUnorderedIntervals();
        this.sortIntervals();

        return ScalePitch.fromIntervals(...this._orderedIntervals);
    }

    get interval(): IntervalPitch {
        return this._interval;
    }

    get length(): number {
        return this._length;
    }
}