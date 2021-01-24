import { mod, NonEmptyArray } from '@datune/utils';
import { IntervalDiatonic } from '../../../../intervals';
import { Chromatic } from '../chromatic/Chromatic';
import { SymbolicDegree } from '../DegreeSymbolic';
import { NamingDiatonic } from './building/naming/NamingDiatonic';
import { DiatonicStaticNames } from './building/staticnames/DiatonicStaticNames';

export type DiatonicArray = NonEmptyArray<Diatonic>;
export class Diatonic extends DiatonicStaticNames implements SymbolicDegree {
    // Building

    private constructor(private _intValue: number) {
        super();
    }

    private static _create(i: number): Diatonic {
        return new Diatonic(i);
    }

    static fromInt(intValue: number): Diatonic {
        intValue = mod(intValue, Diatonic.NUMBER);
        switch (intValue) {
            case 0: return Diatonic.C;
            case 1: return Diatonic.D;
            case 2: return Diatonic.E;
            case 3: return Diatonic.F;
            case 4: return Diatonic.G;
            case 5: return Diatonic.A;
            case 6: return Diatonic.B;
        }

        throw new Error();
    }

    static fromString(strValue: string): Diatonic | null {
        strValue = normalizeInputString(strValue);

        switch (strValue) {
            case Diatonic.C.toString(): return Diatonic.C;
            case Diatonic.D.toString(): return Diatonic.D;
            case Diatonic.E.toString(): return Diatonic.E;
            case Diatonic.F.toString(): return Diatonic.F;
            case Diatonic.G.toString(): return Diatonic.G;
            case Diatonic.A.toString(): return Diatonic.A;
            case Diatonic.B.toString(): return Diatonic.B;
        }

        return null;
    }

    // Immutable transformation methods

    withAdd(intervalDiatonic: IntervalDiatonic): Diatonic {
        let intValue = this.valueOf() + intervalDiatonic.valueOf();
        return Diatonic.fromInt(intValue);
    }

    withSub(intervalDiatonic: IntervalDiatonic): Diatonic {
        let intValue = this.valueOf() - intervalDiatonic.valueOf();
        return Diatonic.fromInt(intValue);
    }

    get chromatic(): Chromatic {
        switch (this) {
            case Diatonic.C: return Chromatic.C;
            case Diatonic.D: return Chromatic.D;
            case Diatonic.E: return Chromatic.E;
            case Diatonic.F: return Chromatic.F;
            case Diatonic.G: return Chromatic.G;
            case Diatonic.A: return Chromatic.A;
            case Diatonic.B: return Chromatic.B;
        }

        throw new Error();
    }

    // Sortable methods

    compareTo(diatonic: Diatonic): number {
        if (this._intValue < diatonic._intValue)
            return -1;
        else if (this._intValue > diatonic._intValue)
            return 1;
        else
            return 0;
    }

    // Object methods

    toString() {
        return NamingDiatonic.toString(this);
    }

    valueOf(): number {
        return this._intValue;
    }
}

function normalizeInputString(strValue: string): string {
    strValue = strValue.replace(/ /g, '');
    return strValue;
}