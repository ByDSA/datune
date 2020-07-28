import { Immutables } from '../common/Immutables';
import { rotativeTrim } from '../common/MathUtils';
import { IntervalDiatonic } from '../interval/IntervalDiatonic';
import { NamingDiatonic } from '../lang/naming/NamingDiatonic';
import { Chromatic } from './Chromatic';
import { Degree } from './Degree';

export class Diatonic implements Degree {
    static C: Diatonic;
    static D: Diatonic;
    static E: Diatonic;
    static F: Diatonic;
    static G: Diatonic;
    static A: Diatonic;
    static B: Diatonic;

    public static NUMBER = 7;

    public getAdd(intervalDiatonic: IntervalDiatonic): Diatonic {
        let intValue = this.intValue + intervalDiatonic.intValue;
        return Diatonic.fromInt(intValue);
    }

    public getSub(intervalDiatonic: IntervalDiatonic): Diatonic {
        let intValue = this.intValue - intervalDiatonic.intValue;
        return Diatonic.fromInt(intValue);
    }

    static fromInt(intValue: number): Diatonic {
        intValue = rotativeTrim(intValue, Diatonic.NUMBER);
        switch (intValue) {
            case 0: return Diatonic.C;
            case 1: return Diatonic.D;
            case 2: return Diatonic.E;
            case 3: return Diatonic.F;
            case 4: return Diatonic.G;
            case 5: return Diatonic.A;
            case 6: return Diatonic.B;
        }

        return null;
    }

    static fromString(strValue: string): Diatonic {
        strValue = this.normalizeInputString(strValue);

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

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '');
        return strValue;
    }

    private constructor(private _intValue: number) {
    }

    get intValue() {
        return this._intValue;
    }

    toString() {
        return NamingDiatonic.toString(this);
    }

    valueOf(): number {
        return this.intValue;
    }

    get chromatic() {
        switch (this) {
            case Diatonic.C: return Chromatic.C;
            case Diatonic.D: return Chromatic.D;
            case Diatonic.E: return Chromatic.E;
            case Diatonic.F: return Chromatic.F;
            case Diatonic.G: return Chromatic.G;
            case Diatonic.A: return Chromatic.A;
            case Diatonic.B: return Chromatic.B;
        }
    }

    private static initialize() {
        Diatonic.C = new Diatonic(0);
        Diatonic.D = new Diatonic(1);
        Diatonic.E = new Diatonic(2);
        Diatonic.F = new Diatonic(3);
        Diatonic.G = new Diatonic(4);
        Diatonic.A = new Diatonic(5);
        Diatonic.B = new Diatonic(6);

        Immutables.lock(Diatonic);
    }
}