import { Diatonic } from '../../degrees/Diatonic';
import { Immutables } from '../../common/Immutables';
import { rotativeTrim } from '../../common/MathUtils';

export class DiatonicDegree {
    public static I;
    public static II;
    public static III;
    public static IV;
    public static V;
    public static VI;
    public static VII;

    private constructor(private _intValue: number) {
    }

    public static fromInt(n: number): DiatonicDegree {
        n = rotativeTrim(n, Diatonic.NUMBER);

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

    get intValue(): number {
        return this._intValue;
    }

    public hashCode(): string {
        return "dd:" + this._intValue;
    }

    public toString(): string {
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

    private static initialize() {
        DiatonicDegree.I = new DiatonicDegree(0);
        DiatonicDegree.II = new DiatonicDegree(1);
        DiatonicDegree.III = new DiatonicDegree(2);
        DiatonicDegree.IV = new DiatonicDegree(3);
        DiatonicDegree.V = new DiatonicDegree(4);
        DiatonicDegree.VI = new DiatonicDegree(5);
        DiatonicDegree.VII = new DiatonicDegree(6);

        Immutables.lockr(DiatonicDegree);
    }
}