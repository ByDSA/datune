import { Diatonic } from "../../Diatonic";
import { DiatonicCache } from "./DiatonicCache";


export class DiatonicStaticNames {
    static NUMBER = 7;

    static get C(): Diatonic {
        return <Diatonic>(DiatonicCache.singleton.C || DiatonicCache.singleton.precalcC());
    }

    static get D(): Diatonic {
        return <Diatonic>(DiatonicCache.singleton.D || DiatonicCache.singleton.precalcD());
    }

    static get E(): Diatonic {
        return <Diatonic>(DiatonicCache.singleton.E || DiatonicCache.singleton.precalcE());
    }

    static get F(): Diatonic {
        return <Diatonic>(DiatonicCache.singleton.F || DiatonicCache.singleton.precalcF());
    }

    static get G(): Diatonic {
        return <Diatonic>(DiatonicCache.singleton.G || DiatonicCache.singleton.precalcG());
    }

    static get A(): Diatonic {
        return <Diatonic>(DiatonicCache.singleton.A || DiatonicCache.singleton.precalcA());
    }

    static get B(): Diatonic {
        return <Diatonic>(DiatonicCache.singleton.B || DiatonicCache.singleton.precalcB());
    }

    static get all(): readonly Diatonic[] {
        return <Diatonic[]>(DiatonicCache.singleton.all || DiatonicCache.singleton.precalcAll());
    }
}