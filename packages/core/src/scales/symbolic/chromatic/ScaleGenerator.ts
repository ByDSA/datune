import { NonEmptyArray } from "@datune/utils";
import { ChromaticInterval } from "../../../intervals";
import { Chromatic } from "../../../pitches";
import { Scale } from "./scale/Scale";

type Interval = ChromaticInterval;
type IntervalArray = NonEmptyArray<Interval>;
export class ScaleGenerator {
    private constructor(private _interval: Interval, private _length: number) {
    }

    private _unorderedIntervals: IntervalArray | undefined;
    private _orderedIntervals: IntervalArray | undefined;

    static from(interval: Interval, length: number): ScaleGenerator {
        if (length < 2)
            throw new Error("Length cannot be lower than 2");
        return new ScaleGenerator(interval, length);
    }

    private calculateUnorderedIntervals(): IntervalArray {
        let unorderedIntervals: IntervalArray = [0, this._interval];
        let lastInterval: Interval = unorderedIntervals[1];
        for (let i = 2; i < this._length; i++) {
            lastInterval = (lastInterval + this._interval) % Chromatic.NUMBER;
            unorderedIntervals.push(lastInterval);
        }

        return unorderedIntervals;
    }

    private sortIntervals(unorderedIntervals: IntervalArray): IntervalArray {
        let orderedIntervals: IntervalArray = [...unorderedIntervals];
        orderedIntervals.sort((a, b) => a - b);
        return orderedIntervals;
    }

    generate(): Scale {
        this._unorderedIntervals = this.calculateUnorderedIntervals();
        this._orderedIntervals = this.sortIntervals(this._unorderedIntervals);

        return <Scale>Scale.fromIntraIntervals(...this._orderedIntervals);
    }

    get interval(): Interval {
        return this._interval;
    }

    get length(): number {
        return this._length;
    }
}