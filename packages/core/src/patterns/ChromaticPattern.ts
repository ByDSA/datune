import { Chromatic } from '../degrees/Chromatic';
import { NamingChromaticChordPattern } from '../lang/naming/NamingChromaticChordPattern';
import { ChromaticPatternCache } from './ChromaticPatternCache';
import { ChromaticPatternStaticNames } from './ChromaticPatternStaticNames';
import { DegreePattern } from './DegreePattern';

export type I = number;
export class ChromaticPattern extends ChromaticPatternStaticNames implements DegreePattern<Chromatic, I>, Iterable<I> {
    static commonPatterns: () => ChromaticPattern[];

    private static _cache = new ChromaticPatternCache((values: I[]) => new ChromaticPattern(...values));

    private _rootIntervals: I[];
    private _precalcIntraIntervals: I[];
    private _rootIndex: number;

    private constructor(...values: I[]) {
        super();
        this._rootIntervals = values;
        this._rootIndex = 0;
        Object.freeze(this._rootIntervals);
        Object.freeze(this._rootIndex);
    }

    static fromRootIntervals(...rootIntervals: I[]): ChromaticPattern {
        if (!rootIntervals)
            return null;
        if (rootIntervals[0] > 0)
            rootIntervals = this._getStartFromZero(rootIntervals);
        return this._cache.getOrCreate(rootIntervals);
    }

    private static _getStartFromZero(array: number[]) {
        return array.map((ic, i, a) => ic - a[0]);
    }

    static fromIntraIntervals(...intraIntervals: I[]): ChromaticPattern {
        let baseIntervals: I[] = [0];
        for (let i = 0; i < intraIntervals.length; i++) {
            let baseInterval_i = baseIntervals[baseIntervals.length - 1] + intraIntervals[i];
            baseIntervals.push(baseInterval_i);
        }

        let ret = this.fromRootIntervals(...baseIntervals);
        if (!Object.isFrozen(ret._precalcIntraIntervals)) {
            ret._precalcIntraIntervals = Array.from(intraIntervals);
            Object.freeze(ret._precalcIntraIntervals);
        }

        return ret;
    }

    static fromString(strValue: string): ChromaticPattern {
        strValue = this._normalizeInputString(strValue);

        for (let chromaticPattern of this._cache.list) {
            let normalizedString = this._normalizeInputString(chromaticPattern.toString());
            let normalizedShortName = this._normalizeInputString(chromaticPattern.shortName);

            if (strValue == normalizedString || strValue == normalizedShortName)
                return chromaticPattern;
        }

        throw new Error("Can't get " + this.name + " from string '" + strValue + "'.");
    }

    private static _normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ |\(|\)/g, '')
            .replace('♯', '#')
            .replace('♭', 'b')
            .toLowerCase();
        return strValue;
    }

    [Symbol.iterator](): Iterator<I> {
        return this.rootIntervals[Symbol.iterator]();
    }

    get rootIndex(): number {
        return this._rootIndex;
    }

    get rootIntervals(): I[] {
        return this._rootIntervals;
    }

    get length(): number {
        return this._rootIntervals.length;
    }

    withInv(n: number = 1): ChromaticPattern {
        let values = Array.from(this.rootIntervals);
        for (let i = 0; i < n; i++) {
            let firstRootInterval = values.shift();
            let lastRootInterval = values[values.length - 1];
            firstRootInterval = this._getFixedOctaveRootInterval(lastRootInterval, firstRootInterval);
            values.push(firstRootInterval);
            values = values.map((value: number) => value - values[0]);
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
        return NamingChromaticChordPattern.toString(this);
    }

    get shortName(): string {
        return NamingChromaticChordPattern.toStringShort(this);
    }

    get inversionNumber(): number {
        return (this.rootIntervals.length - this.rootIndex) % this.rootIntervals.length;
    }
}