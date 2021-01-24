import { NonEmptyArray, NumberArray } from '@datune/utils';
import { IntervalDiatonic, IntervalDiatonicAlt } from '../../../intervals';
import { DegreeAlt } from '../../../scales';
import { normalizeInputString } from '../chromatic/building/ChromaticPatternFromString';
import { ChromaticPattern } from '../chromatic/ChromaticPattern';
import { DiatonicPattern } from '../diatonic/DiatonicPattern';
import { Pattern } from '../Pattern';
import { PatternAltCache } from './DiatonicAltPatternCache';
import { PatternAltStaticNames } from './DiatonicAltPatternStaticNames';
import { NamingDiatonicAltPattern } from './NamingDiatonicAltPattern';

export type Difference = IntervalDiatonicAlt;
type I = Difference;
type D = DegreeAlt;
export type DifferenceArray = NonEmptyArray<Difference>;
export class DiatonicAltPattern extends PatternAltStaticNames implements Pattern<D, I> {
    private static _cache = new PatternAltCache((values: DifferenceArray) => new DiatonicAltPattern(...values));

    private _rootIntervals: DifferenceArray;
    private _rootIndex: number;

    private _diatonicPattern: DiatonicPattern;
    private _chordPattern: ChromaticPattern;

    private constructor(...values: DifferenceArray) {
        super();
        this._rootIntervals = values;
        Object.freeze(this._rootIntervals);
        this._rootIndex = 0;
        Object.freeze(this._rootIndex);

        let arrayPattern: number[] = [];
        let arrayDiatonicChordPattern: number[] = [];
        for (const value of values) {
            arrayPattern.push(value.interval);
            arrayDiatonicChordPattern.push(value.intervalDiatonic.valueOf());
        }

        this._chordPattern = ChromaticPattern.fromRootIntervals(...<NumberArray>arrayPattern);
        this._diatonicPattern = DiatonicPattern.fromRootIntervalInts(...<NumberArray>arrayDiatonicChordPattern);
    }

    static fromPatterns(pattern: ChromaticPattern, diatonicPattern: DiatonicPattern): DiatonicAltPattern {
        let rootIntervals: I[] = [];

        for (let i = 0; i < pattern.length; i++) {
            let semisFromRoot = pattern.rootIntervals[i];
            let intervalDiatonic: IntervalDiatonic = diatonicPattern.rootIntervals[i];
            let rootInterval = IntervalDiatonicAlt.fromIntervals(semisFromRoot, intervalDiatonic);
            rootIntervals.push(rootInterval);
        }

        return <DiatonicAltPattern>this.fromRootIntervals(...<DifferenceArray>rootIntervals);
    }

    static fromRootIntervals(...rootIntervals: DifferenceArray): DiatonicAltPattern {
        return this._cache.getOrCreate(rootIntervals);
    }

    static fromString(strValue: string): DiatonicAltPattern | null {
        strValue = normalizeInputString(strValue);

        for (let diatonicAltPattern of DiatonicAltPattern.all()) {
            let normalizedString = normalizeInputString(diatonicAltPattern.toString());
            let normalizedShortName = normalizeInputString(diatonicAltPattern.shortName);

            if (strValue == normalizedString || strValue == normalizedShortName)
                return diatonicAltPattern;
        }

        return null;
    }

    [Symbol.iterator](): Iterator<Difference> {
        return this.rootIntervals[Symbol.iterator]();
    }

    get diatonicPattern(): DiatonicPattern {
        return this._diatonicPattern;
    }

    get pattern(): ChromaticPattern {
        return this._chordPattern;
    }

    get rootIntervals(): DifferenceArray {
        return this._rootIntervals;
    }

    withInv(n: number = 1): DiatonicAltPattern {
        if (this.rootIntervals.length < 2)
            return this;
        let rootIntervals: DifferenceArray = [...this.rootIntervals];
        for (let i = 0; i < n; i++) {
            let firstValue: Difference = <Difference>rootIntervals.shift();
            while (firstValue.interval < rootIntervals[rootIntervals.length - 1].interval)
                firstValue = firstValue.withAdd(IntervalDiatonicAlt.PERFECT_OCTAVE);
            rootIntervals.push(firstValue);
            firstValue = rootIntervals[0];
            rootIntervals = <DifferenceArray>rootIntervals.map((value: Difference) => value.withSub(firstValue));
        }

        return <DiatonicAltPattern>DiatonicAltPattern.fromRootIntervals(...rootIntervals);
    }

    get shortName(): string {
        return NamingDiatonicAltPattern.toStringShort(this);
    }

    get rootIndex() {
        return this._rootIndex;
    }

    get inversionNumber(): number {
        return (this.length - this.rootIndex) % this.length;
    }

    get length(): number {
        return this.rootIntervals.length;
    }

    toString() {
        return NamingDiatonicAltPattern.toString(this);
    }
}