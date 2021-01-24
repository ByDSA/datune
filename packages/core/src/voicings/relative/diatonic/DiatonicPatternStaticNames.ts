import { DiatonicPattern } from "./DiatonicPattern";

 
export class DiatonicPatternStaticNames {
    static get FIFTH(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 4);
    }
    static get TRIAD(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 2, 4);
    }
    static get QUARTAL(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 3, 6);
    }
    static get SIXTH(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 2, 4, 5);
    }
    static get SIXTH_ADD9(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 2, 4, 5, 8);
    }
    static get SEVENTH(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6);
    }
    static get SEVENTH_ADD11(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 10);
    }
    static get SEVENTH_ADD13(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 12);
    }
    static get NINTH(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 8);
    }
    static get NINTH_SUS4(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 3, 4, 6, 8);
    }
    static get NINTH_ADD6(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 2, 4, 5, 6, 8);
    }
    static get ELEVENTH(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 8, 10);
    }
    static get THIRTEENTH(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 8, 10, 12);
    }
    static get THIRTEENTH_SUS4(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 3, 4, 6, 8, 10, 12);
    }
    static get SUS4(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 3, 4);
    }
    static get SEVENTH_SUS4(): DiatonicPattern {
        return DiatonicPattern.fromRootIntervalInts(0, 3, 4, 6);
    }
}