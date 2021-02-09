import { DiatonicDegree } from "./DiatonicDegree";

export class DiatonicDegreeStaticNames {
    static get I(): DiatonicDegree {
        if (!_I)
            _I = (<any>DiatonicDegree)._initializerConstructor(0);

        return _I;
    }
    static get II(): DiatonicDegree {
        if (!_II)
            _II = (<any>DiatonicDegree)._initializerConstructor(1);

        return _II;
    }
    static get III(): DiatonicDegree {
        if (!_III)
            _III = (<any>DiatonicDegree)._initializerConstructor(2);

        return _III;
    }
    static get IV(): DiatonicDegree {
        if (!_IV)
            _IV = (<any>DiatonicDegree)._initializerConstructor(3);

        return _IV;
    }
    static get V(): DiatonicDegree {
        if (!_V)
            _V = (<any>DiatonicDegree)._initializerConstructor(4);

        return _V;
    }
    static get VI(): DiatonicDegree {
        if (!_VI)
            _VI = (<any>DiatonicDegree)._initializerConstructor(5);

        return _VI;
    }
    static get VII(): DiatonicDegree {
        if (!_VII)
            _VII = (<any>DiatonicDegree)._initializerConstructor(6);

        return _VII;
    }

    static all() {
        if (!_all)
            _all = [
                DiatonicDegree.I,
                DiatonicDegree.II,
                DiatonicDegree.III,
                DiatonicDegree.IV,
                DiatonicDegree.V,
                DiatonicDegree.VI,
                DiatonicDegree.VII,
            ];
        return _all;
    }
}

let _I: DiatonicDegree, _II: DiatonicDegree, _III: DiatonicDegree, _IV: DiatonicDegree, _V: DiatonicDegree, _VI: DiatonicDegree, _VII: DiatonicDegree;
let _all: DiatonicDegree[];