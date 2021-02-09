import { Settings } from '../../../../../../config';
import { Diatonic } from '../../Diatonic';

export class NamingDiatonic {
    private constructor() {
    }

    static toString(diatonic: Diatonic): string {
        switch (diatonic) {
            case Diatonic.C: return Settings.lang.diatonic.C;
            case Diatonic.D: return Settings.lang.diatonic.D;
            case Diatonic.E: return Settings.lang.diatonic.E;
            case Diatonic.F: return Settings.lang.diatonic.F;
            case Diatonic.G: return Settings.lang.diatonic.G;
            case Diatonic.A: return Settings.lang.diatonic.A;
            case Diatonic.B: return Settings.lang.diatonic.B;
        }

        throw new Error("Can't get string from '" + diatonic.valueOf() + "'.");
    }

    static get(diatonicStr: string): Diatonic {
        switch (diatonicStr) {
            case NamingDiatonic.toString(Diatonic.C): return Diatonic.C;
            case NamingDiatonic.toString(Diatonic.D): return Diatonic.D;
            case NamingDiatonic.toString(Diatonic.E): return Diatonic.E;
            case NamingDiatonic.toString(Diatonic.F): return Diatonic.F;
            case NamingDiatonic.toString(Diatonic.G): return Diatonic.G;
            case NamingDiatonic.toString(Diatonic.A): return Diatonic.A;
            case NamingDiatonic.toString(Diatonic.B): return Diatonic.B;
        }
        throw new Error("Can't convert '" + diatonicStr + "' to Diatonic.");
    }
}