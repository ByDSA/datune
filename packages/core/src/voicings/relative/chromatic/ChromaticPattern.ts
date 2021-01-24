import { NonEmptyArray } from '@datune/utils';
import { ChromaticInterval, ChromaticIntervalArray } from '../../../intervals';
import { Chromatic } from '../../../pitches';
import { Pattern } from '../Pattern';
import { chromaticPatternFromString } from './building/ChromaticPatternFromString';
import { ChromaticPatternCache } from './ChromaticPatternCache';
import { ChromaticPatternStaticNames } from './ChromaticPatternStaticNames';
import { NamingChordPattern } from './NamingChordPattern';

export type ChromaticPatternArray = NonEmptyArray<ChromaticPattern>;
export class ChromaticPattern extends ChromaticPatternStaticNames implements Pattern<Chromatic, ChromaticInterval> {
    private static _cache = new ChromaticPatternCache((values: ChromaticIntervalArray) => new ChromaticPattern(...values));

    private _rootIntervals: ChromaticIntervalArray;
    private _precalcIntraIntervals: ChromaticIntervalArray | undefined;
    private _rootIndex: number;

    private constructor(...values: ChromaticIntervalArray) {
        super();
        this._rootIntervals = values;
        this._rootIndex = 0;
        Object.freeze(this._rootIntervals);
        Object.freeze(this._rootIndex);
    }

    static fromRootIntervals(...rootIntervals: ChromaticIntervalArray): ChromaticPattern {
        if (rootIntervals[0] > 0)
            rootIntervals = this._getStartFromZero(rootIntervals);
        return this._cache.getOrCreate(rootIntervals);
    }

    private static _getStartFromZero(array: ChromaticIntervalArray): ChromaticIntervalArray {
        return <ChromaticIntervalArray>array.map((ic: ChromaticInterval, i: number, a: ChromaticInterval[]) => ic - a[0]);
    }

    static fromIntraIntervals(...intraIntervals: ChromaticIntervalArray): ChromaticPattern {
        let baseIntervals: ChromaticIntervalArray = [0];
        for (let i = 0; i < intraIntervals.length; i++) {
            let baseInterval_i = baseIntervals[baseIntervals.length - 1] + intraIntervals[i];
            baseIntervals.push(baseInterval_i);
        }

        let ret = this.fromRootIntervals(...baseIntervals);
        if (!Object.isFrozen(ret._precalcIntraIntervals)) {
            ret._precalcIntraIntervals = [...intraIntervals];
            Object.freeze(ret._precalcIntraIntervals);
        }

        return ret;
    }

    static fromString(strValue: string): ChromaticPattern | null {
        return chromaticPatternFromString(strValue);
    }

    [Symbol.iterator](): Iterator<ChromaticInterval> {
        return this.rootIntervals[Symbol.iterator]();
    }

    get rootIndex(): number {
        return this._rootIndex;
    }

    get rootIntervals(): ChromaticIntervalArray {
        return this._rootIntervals;
    }

    get length(): number {
        return this._rootIntervals.length;
    }

    getAllInversions(): ChromaticPatternArray {
        let ret: ChromaticPatternArray = [this];
        let last: ChromaticPattern = this;
        for (let i = 1; i < this.length; i++) {
            last = last.withInv();
            ret.push(last);
        }
        return ret;
    }

    withInv(n: number = 1): ChromaticPattern {
        let values: ChromaticIntervalArray = [...this.rootIntervals];
        for (let i = 0; i < n; i++) {
            let firstRootInterval = <number>values.shift();
            let lastRootInterval = values[values.length - 1];
            firstRootInterval = this._getFixedOctaveRootInterval(lastRootInterval, firstRootInterval);
            values.push(firstRootInterval);
            values = <ChromaticIntervalArray>values.map((value: ChromaticInterval) => value - values[0]);
        }

        return ChromaticPattern.fromRootIntervals(...values);
    }

    private _getFixedOctaveRootInterval(lastRootInterval: number, rootInterval: number): number {
        let rootIntervalInOneOctave = rootInterval % Chromatic.NUMBER;
        let lastRootIntervalOctave = Math.floor(lastRootInterval / Chromatic.NUMBER);
        let ret = lastRootIntervalOctave * Chromatic.NUMBER + rootIntervalInOneOctave;
        if (ret < lastRootInterval)
            ret += Chromatic.NUMBER;

        return ret;
    }

    toString() {
        return NamingChordPattern.toString(this);
    }

    get shortName(): string {
        return NamingChordPattern.toStringShort(this);
    }

    get inversionNumber(): number {
        return (this.rootIntervals.length - this.rootIndex) % this.rootIntervals.length;
    }
}