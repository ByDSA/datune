import { Diatonic } from '../degrees/Diatonic';
import { DegreePattern } from './DegreePattern';
import { IntervalDiatonic } from '../intervals/IntervalDiatonic';

type D = Diatonic;
type I = IntervalDiatonic;
export class DiatonicPattern implements DegreePattern<D, I> {
    static FIFTH;
    static TRIAD;
    static QUARTAL;
    static SIXTH;
    static SIXTH_ADD9;
    static SEVENTH;
    static SEVENTH_ADD11;
    static SEVENTH_ADD13;
    static NINTH;
    static NINTH_SUS4;
    static NINTH_ADD6;
    static ELEVENTH;
    static THIRTEENTH;
    static THIRTEENTH_SUS4;
    static SUS4;
    static SEVENTH_SUS4;

    private _rootIndex: number;
    private _rootIntervalInts: number[];

    private constructor(first?: number | number[], ...rest: number[]) {
        this._rootIntervalInts =
            first === undefined
                ? []
                : first instanceof Array
                    ? [...first, ...rest]
                    : [first, ...rest];

        this._rootIndex = 0;
        Object.freeze(this._rootIntervalInts);
        Object.freeze(this._rootIndex);
    }

    static fromRootIntervalInts(first?: number | number[], ...rest: number[]): DiatonicPattern {
        let patternArray =
            first === undefined
                ? []
                : first instanceof Array
                    ? [...first, ...rest]
                    : [first, ...rest];

        return new DiatonicPattern(patternArray);
    }

    get rootIntervalInts(): number[] {
        return this._rootIntervalInts;
    }

    get rootIntervals(): I[] {
        return this._rootIntervalInts.map(ic => IntervalDiatonic.from(ic));
    }

    get intraIntervals(): I[] {
        return this._rootIntervalInts.map((ic, i, a) => IntervalDiatonic.from(ic - i > 0 ? a[i - 1] : 0));
    }

    get inversionNumber(): number {
        return (this.rootIntervalInts.length - this.rootIndex) % this.rootIntervalInts.length;
    }

    get rootIndex(): number {
        return this._rootIndex;
    }

    get length(): number {
        return this._rootIntervalInts.length;
    }

    withInv(n: number = 1): DiatonicPattern {
        let rootIntervalInts = this.rootIntervalInts;
        for (let i = 0; i < n; i++) {
            let firstValue = rootIntervalInts.shift();
            rootIntervalInts.push(firstValue + Diatonic.NUMBER);
            rootIntervalInts = rootIntervalInts.map((value: number) => value - rootIntervalInts[0]);
        }

        return DiatonicPattern.fromRootIntervalInts(...rootIntervalInts);
    }

    get shortName(): string {
        return this.toString();
    }

    toString(): string {
        return this._rootIntervalInts.toString();
    }
}