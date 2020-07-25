import { Diatonic } from '../degrees/Diatonic';
import { DegreePattern } from './DegreePattern';
import { IntervalDiatonic } from '../interval/IntervalDiatonic';

type D = Diatonic;
type I = IntervalDiatonic;
export class DiatonicPattern implements DegreePattern<D, I> {
    public static FIFTH;
    public static TRIAD;
    public static QUARTAL;
    public static SIXTH;
    public static SIXTH_ADD9;
    public static SEVENTH;
    public static SEVENTH_ADD11;
    public static SEVENTH_ADD13;
    public static NINTH;
    public static NINTH_SUS4;
    public static NINTH_ADD6;
    public static ELEVENTH;
    public static THIRTEENTH;
    public static THIRTEENTH_SUS4;
    public static SUS4;
    public static SEVENTH_SUS4;

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

    public static fromRootIntervalInts(first?: number | number[], ...rest: number[]): DiatonicPattern {
        let patternArray =
            first === undefined
                ? []
                : first instanceof Array
                    ? [...first, ...rest]
                    : [first, ...rest];

        return new DiatonicPattern(patternArray);
    }

    public get rootIntervalInts(): number[] {
        return this._rootIntervalInts;
    }

    public get rootIntervals(): I[] {
        return this._rootIntervalInts.map(ic => IntervalDiatonic.from(ic));
    }

    public get intraIntervals(): I[] {
        return this._rootIntervalInts.map((ic, i, a) => IntervalDiatonic.from(ic - i > 0 ? a[i - 1] : 0));
    }

    public get inversionNumber(): number {
        return (this.rootIntervalInts.length - this.rootIndex) % this.rootIntervalInts.length;
    }

    public get rootIndex(): number {
        return this._rootIndex;
    }

    get length(): number {
        return this._rootIntervalInts.length;
    }

    public withInv(n: number = 1): DiatonicPattern {
        let rootIntervalInts = this.rootIntervalInts;
        for (let i = 0; i < n; i++) {
            let firstValue = rootIntervalInts.shift();
            rootIntervalInts.push(firstValue + Diatonic.NUMBER);
            rootIntervalInts = rootIntervalInts.map((value: number) => value - rootIntervalInts[0]);
        }

        return DiatonicPattern.fromRootIntervalInts(...rootIntervalInts);
    }

    public get shortName(): string {
        return this.toString();
    }

    public toString(): string {
        return this._rootIntervalInts.toString();
    }

    private static initialize() {
        this.FIFTH = DiatonicPattern.fromRootIntervalInts(0, 4);
        this.TRIAD = DiatonicPattern.fromRootIntervalInts(0, 2, 4);
        this.QUARTAL = DiatonicPattern.fromRootIntervalInts(0, 3, 6);
        this.SIXTH = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 5);
        this.SIXTH_ADD9 = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 5, 8);
        this.SEVENTH = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6);
        this.SEVENTH_ADD11 = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 10);
        this.SEVENTH_ADD13 = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 12);
        this.NINTH = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 8);
        this.NINTH_SUS4 = DiatonicPattern.fromRootIntervalInts(0, 3, 4, 6, 8);
        this.NINTH_ADD6 = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 5, 6, 8);
        this.ELEVENTH = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 8, 10);
        this.THIRTEENTH = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 8, 10, 12);
        this.THIRTEENTH_SUS4 = DiatonicPattern.fromRootIntervalInts(0, 3, 4, 6, 8, 10, 12);
        this.SUS4 = DiatonicPattern.fromRootIntervalInts(0, 3, 4);
        this.SEVENTH_SUS4 = DiatonicPattern.fromRootIntervalInts(0, 3, 4, 6);
    }
}