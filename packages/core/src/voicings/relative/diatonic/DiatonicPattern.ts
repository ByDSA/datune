import { NumberArray } from '@datune/utils';
import { IntervalDiatonic } from '../../../intervals';
import { Diatonic } from '../../../pitches';
import { Pattern } from '../Pattern';
import { DiatonicPatternStaticNames } from './DiatonicPatternStaticNames';

type D = Diatonic;
type I = IntervalDiatonic;
export class DiatonicPattern extends DiatonicPatternStaticNames implements Pattern<D, I> {
    private _rootIndex: number;
    private _rootIntervalInts: NumberArray;

    private constructor(...ints: NumberArray) {
        super();
        this._rootIntervalInts = <NumberArray>Object.freeze(ints);

        this._rootIndex = 0;
        Object.freeze(this._rootIndex);
    }

    static fromRootIntervalInts(...ints: NumberArray): DiatonicPattern {
        return new DiatonicPattern(...ints);
    }

    [Symbol.iterator](): Iterator<I> {
        return this.rootIntervals[Symbol.iterator]();
    }

    get rootIntervalInts(): NumberArray {
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
            let firstValue = <number>rootIntervalInts.shift();
            rootIntervalInts.push(firstValue + Diatonic.NUMBER);
            rootIntervalInts = <NumberArray>rootIntervalInts.map((value: number) => value - rootIntervalInts[0]);
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