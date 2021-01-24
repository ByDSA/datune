import { NonEmptyArray } from "@datune/utils";
import { IntervalDiatonicAlt } from "../../../../../../../intervals";
import { Chromatic } from "../../../../../../../pitches";
import { ScaleAlt } from "../../../ScaleAlt";

type IntervalAlt = IntervalDiatonicAlt;
type IntervalAltArray = NonEmptyArray<IntervalAlt>;
export class ScaleAltGeneratorByInterval {
    private constructor(private _interval: IntervalAlt, private _length: number, private _startIndex: number) {
    }

    private _unorderedIntervals: IntervalAltArray | undefined;
    private _rootIntervals: IntervalAltArray | undefined;
    private _intraIntervals: IntervalAltArray | undefined;

    static from(interval: IntervalAlt, length: number, startIndex = 0): ScaleAltGeneratorByInterval {
        if (length < 2)
            throw new Error("Length cannot be lower than 2");
        return new ScaleAltGeneratorByInterval(interval, length, startIndex);
    }

    private calculateUnorderedIntervals(): IntervalAltArray {
        let lastInterval: IntervalAlt = this.fixInitialInterval();
        let unorderedIntervals: IntervalAltArray = [lastInterval];
        for (let i = 1; i < this._length; i++) {
            lastInterval = lastInterval.withAdd(this._interval);
            lastInterval = this.fixGreaterOctaveInterval(lastInterval);
            unorderedIntervals.push(lastInterval);
        }

        return unorderedIntervals;
    }

    private fixGreaterOctaveInterval(interval: IntervalDiatonicAlt): IntervalDiatonicAlt {
        while (interval.interval >= Chromatic.NUMBER)
            interval = interval.withSub(IntervalDiatonicAlt.PERFECT_OCTAVE);

        return interval;
    }

    private fixInitialInterval(): IntervalDiatonicAlt {
        let initialInterval = IntervalDiatonicAlt.PERFECT_UNISON;
        if (this._startIndex > 0)
            for (let i = 0; i < this._startIndex; i++)
                initialInterval = initialInterval.withAdd(this._interval);
        else if (this._startIndex < 0)
            for (let i = this._startIndex; i < 0; i++)
                initialInterval = initialInterval.withSub(this._interval);

        return initialInterval;
    }

    private sortIntervals(unorderedIntervals: IntervalAltArray): IntervalAltArray {
        let rootIntervals = [...unorderedIntervals];
        rootIntervals.sort((a, b) => a.interval - b.interval);
        return <IntervalAltArray>rootIntervals;
    }

    private calculateIntraIntervals(rootIntervals: IntervalAltArray): IntervalAltArray {
        let intraIntervals = [];
        let accumulated = IntervalDiatonicAlt.PERFECT_UNISON;
        for (let i = 1; i < rootIntervals.length; i++) {
            let lastRootInterval = rootIntervals[i - 1];
            let currentRootInterval = rootIntervals[i];
            let interval = currentRootInterval.withSub(lastRootInterval);
            accumulated = accumulated.withAdd(interval);
            intraIntervals.push(interval);
        }

        let remainingInterval = IntervalDiatonicAlt.PERFECT_OCTAVE.withSub(accumulated);
        intraIntervals.push(remainingInterval);

        return <IntervalAltArray>intraIntervals;
    }

    generate(): ScaleAlt {
        this._unorderedIntervals = this.calculateUnorderedIntervals();
        this._rootIntervals = this.sortIntervals(this._unorderedIntervals);
        this._intraIntervals = this.calculateIntraIntervals(this._rootIntervals);

        return ScaleAlt.fromIntraIntervals(...this._intraIntervals);
    }

    get interval(): IntervalAlt {
        return this._interval;
    }

    get length(): number {
        return this._length;
    }
}