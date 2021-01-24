import { mod } from '@datune/utils';
import { Diatonic } from '../../../pitches';
import { DiatonicDegreeStaticNames } from './DiatonicDegreeStaticNames';

export class DiatonicDegree extends DiatonicDegreeStaticNames {
    private constructor(private _intValue: number) {
        super();
    }

    private static _initializerConstructor(intValue: number): DiatonicDegree {
        return new DiatonicDegree(intValue);
    }

    static fromInt(n: number): DiatonicDegree {
        n = mod(n, Diatonic.NUMBER);

        switch (n) {
            case 0: return DiatonicDegree.I;
            case 1: return DiatonicDegree.II;
            case 2: return DiatonicDegree.III;
            case 3: return DiatonicDegree.IV;
            case 4: return DiatonicDegree.V;
            case 5: return DiatonicDegree.VI;
            case 6: return DiatonicDegree.VII;
        }

        throw new Error("Cannot get DiatonicDegree from int: " + n);
    }

    valueOf(): number {
        return this._intValue;
    }

    hashCode(): string {
        return "dd:" + this._intValue;
    }

    toString(): string {
        switch (this) {
            case DiatonicDegree.I: return "I";
            case DiatonicDegree.II: return "II";
            case DiatonicDegree.III: return "III";
            case DiatonicDegree.IV: return "IV";
            case DiatonicDegree.V: return "V";
            case DiatonicDegree.VI: return "VI";
            case DiatonicDegree.VII: return "VII";
        }

        throw new Error();
    }
}