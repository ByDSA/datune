import { NonEmptyArray } from '@datune/utils';
import { Ratio } from '@datune/utils/math/ratios/Ratio';
import { RatioFrac } from '@datune/utils/math/ratios/RatioFrac';
import { RatioNumber } from '@datune/utils/math/ratios/RatioNumber';
import { IntervalPitch } from '../../../../intervals';
import { ScalePitch } from '../../ScalePitch';

type IntervalPitchArray = NonEmptyArray<IntervalPitch>;
export class ScalePitchGenerator {
    private constructor(private _interval: IntervalPitch, private _length: number) {
    }

    private _unreductedIntervals: IntervalPitchArray | undefined;
    private _unorderedIntervals: IntervalPitchArray | undefined;
    private _orderedIntervals: IntervalPitchArray | undefined;

    static from(interval: IntervalPitch, length: number): ScalePitchGenerator {
        if (length < 2)
            throw new Error("Length cannot be lower than 2");
        return new ScalePitchGenerator(interval, length);
    }

    private calculateUnreductedIntervals(): IntervalPitchArray {
        this._unreductedIntervals = [IntervalPitch.UNISON, this._interval];
        let lastInterval: IntervalPitch = this._unreductedIntervals[1];
        for (let i = 2; i < this._length; i++) {
            let newRatio: Ratio = lastInterval.ratio.getMult(this._interval.ratio);
            lastInterval = IntervalPitch.from(newRatio);
            this._unreductedIntervals.push(lastInterval);
        }

        return this._unreductedIntervals;
    }

    private calculateUnorderedIntervals(unreductedIntervals: IntervalPitchArray): IntervalPitchArray {
        let unorderedIntervals = [];
        for (let i = 0; i < this._length; i++) {
            let unreducted = unreductedIntervals[i];
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
            unorderedIntervals.push(newInterval);
        }

        return <IntervalPitchArray>unorderedIntervals;
    }

    private sortIntervals(unorderedIntervals: IntervalPitchArray): IntervalPitchArray {
        let orderedIntervals: IntervalPitchArray = [...unorderedIntervals];
        orderedIntervals.sort((a, b) => a.ratio.value - b.ratio.value);

        return orderedIntervals;
    }

    generate(): ScalePitch {
        this._unreductedIntervals = this.calculateUnreductedIntervals();
        this._unorderedIntervals = this.calculateUnorderedIntervals(this._unreductedIntervals);
        this._orderedIntervals = this.sortIntervals(this._unorderedIntervals);

        return ScalePitch.fromIntervals(...this._orderedIntervals);
    }

    get interval(): IntervalPitch {
        return this._interval;
    }

    get length(): number {
        return this._length;
    }
}