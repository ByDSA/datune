import { Chord, ChordAlt } from "../../chords";
import { IntervalDiatonicAlt } from "../../intervals";
import { DegreeAlt, DegreeAltArray } from "../../scales";
import { ChromaticPattern, DiatonicAltPattern } from "../../voicings";
import { TonalityAlt } from "../alt/TonalityAlt";
import { Tonality } from "../chromatic/Tonality";
import { CompoundFunction } from "./compoundfunction/CompoundFunction";
import { DegreeFunction } from "./degreefunction/DegreeFunction";
import { HarmonicFunction } from "./HarmonicFunction";

export class FunctionsFacade {
    static fromDegree(degree: DegreeAlt, pattern: DiatonicAltPattern): DegreeFunction {
        return DegreeFunction.from(degree, pattern);
    }

    static fromCompound(func: DegreeFunction, ...chain: DegreeAltArray): CompoundFunction {
        return CompoundFunction.from(func, ...chain);
    }

    /**** SETS */

    static get I5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _I5;
    }
    static get bII5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bII5;
    }
    static get II5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _II5;
    }
    static get bIII5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIII5;
    }
    static get III5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _III5;
    }
    static get IV5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IV5;
    }
    static get bV5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bV5;
    }
    static get V5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _V5;
    }
    static get bVI5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVI5;
    }
    static get VI5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VI5;
    }
    static get bVII5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVII5;
    }
    static get VII5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VII5;
    }

    static get I(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _I;
    }
    static get bII(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bII;
    }
    static get N6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bII;
    }
    static get II(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _II;
    }
    static get bIII(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIII;
    }
    static get III(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _III;
    }
    static get IV(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IV;
    }
    static get bV(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bV;
    }
    static get V(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _V;
    }
    static get bVI(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVI;
    }
    static get VI(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VI;
    }
    static get bVII(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVII;
    }
    static get VII(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VII;
    }

    static get ISUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _ISUS4;
    }
    static get bIISUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIISUS4;
    }
    static get IISUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IISUS4;
    }
    static get bIIISUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIISUS4;
    }
    static get IIISUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIISUS4;
    }
    static get IVSUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IVSUS4;
    }
    static get bVSUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVSUS4;
    }
    static get VSUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VSUS4;
    }
    static get bVISUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVISUS4;
    }
    static get VISUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VISUS4;
    }
    static get bVIISUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIISUS4;
    }
    static get VIISUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIISUS4;
    }

    static get i(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _i;
    }
    static get bii(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bii;
    }
    static get ii(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _ii;
    }
    static get biii(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _biii;
    }
    static get iii(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _iii;
    }
    static get iv(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _iv;
    }
    static get bv(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bv;
    }
    static get v(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _v;
    }
    static get bvi(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bvi;
    }
    static get vi(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _vi;
    }
    static get bvii(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bvii;
    }
    static get vii(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _vii;
    }

    static get I0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _I0;
    }
    static get bII0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bII0;
    }
    static get II0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _II0;
    }
    static get bIII0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIII0;
    }
    static get III0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _III0;
    }
    static get IV0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IV0;
    }
    static get bV0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bV0;
    }
    static get V0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _V0;
    }
    static get bVI0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVI0;
    }
    static get VI0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VI0;
    }
    static get bVII0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVII0;
    }
    static get VII0(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VII0;
    }

    static get Iaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _Iaug;
    }
    static get bIIaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIaug;
    }
    static get IIaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIaug;
    }
    static get bIIIaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIIaug;
    }
    static get IIIaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIIaug;
    }
    static get IVaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IVaug;
    }
    static get bVaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVaug;
    }
    static get Vaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _Vaug;
    }
    static get bVIaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIaug;
    }
    static get VIaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIaug;
    }
    static get bVIIaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIIaug;
    }
    static get VIIaug(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIIaug;
    }

    /* Seventh */

    static get I7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _I7;
    }
    static get bII7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bII7;
    }
    static get II7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _II7;
    }
    static get bIII7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIII7;
    }
    static get III7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _III7;
    }
    static get IV7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IV7;
    }
    static get bV7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bV7;
    }
    static get V7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _V7;
    }
    static get bVI7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVI7;
    }
    static get VI7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VI7;
    }
    static get bVII7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVII7;
    }
    static get VII7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VII7;
    }

    static get I7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _I7SUS4;
    }
    static get bII7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bII7SUS4;
    }
    static get II7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _II7SUS4;
    }
    static get bIII7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIII7SUS4;
    }
    static get III7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _III7SUS4;
    }
    static get IV7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IV7SUS4;
    }
    static get bV7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bV7SUS4;
    }
    static get V7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _V7SUS4;
    }
    static get bVI7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVI7SUS4;
    }
    static get VI7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VI7SUS4;
    }
    static get bVII7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVII7SUS4;
    }
    static get VII7SUS4(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VII7SUS4;
    }

    static get I7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _I7SUS4b9;
    }
    static get bII7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bII7SUS4b9;
    }
    static get II7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _II7SUS4b9;
    }
    static get bIII7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIII7SUS4b9;
    }
    static get III7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _III7SUS4b9;
    }
    static get IV7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IV7SUS4b9;
    }
    static get bV7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bV7SUS4b9;
    }
    static get V7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _V7SUS4b9;
    }
    static get bVI7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVI7SUS4b9;
    }
    static get VI7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VI7SUS4b9;
    }
    static get bVII7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVII7SUS4b9;
    }
    static get VII7SUS4b9(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VII7SUS4b9;
    }

    static get I6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _I6;
    }
    static get bII6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bII6;
    }
    static get II6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _II6;
    }
    static get bIII6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIII6;
    }
    static get III6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _III6;
    }
    static get IV6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IV6;
    }
    static get bV6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bV6;
    }
    static get V6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _V6;
    }
    static get bVI6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVI6;
    }
    static get VI6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VI6;
    }
    static get bVII6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVII6;
    }
    static get VII6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VII6;
    }

    static get Im6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _Im6;
    }
    static get bIIm6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIm6;
    }
    static get IIm6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIm6;
    }
    static get bIIIm6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIIm6;
    }
    static get IIIm6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIIm6;
    }
    static get IVm6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IVm6;
    }
    static get bVm6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVm6;
    }
    static get Vm6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _Vm6;
    }
    static get bVIm6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIm6;
    }
    static get VIm6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIm6;
    }
    static get bVIIm6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIIm6;
    }
    static get VIIm6(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIIm6;
    }

    static get IMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IMaj7;
    }
    static get bIIMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIMaj7;
    }
    static get IIMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIMaj7;
    }
    static get bIIIMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIIMaj7;
    }
    static get IIIMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIIMaj7;
    }
    static get IVMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IVMaj7;
    }
    static get bVMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVMaj7;
    }
    static get VMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VMaj7;
    }
    static get bVIMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIMaj7;
    }
    static get VIMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIMaj7;
    }
    static get bVIIMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIIMaj7;
    }
    static get VIIMaj7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIIMaj7;
    }

    static get IMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IMaj7b5;
    }
    static get bIIMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIMaj7b5;
    }
    static get IIMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIMaj7b5;
    }
    static get bIIIMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIIMaj7b5;
    }
    static get IIIMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIIMaj7b5;
    }
    static get IVMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IVMaj7b5;
    }
    static get bVMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVMaj7b5;
    }
    static get VMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VMaj7b5;
    }
    static get bVIMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIMaj7b5;
    }
    static get VIMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIMaj7b5;
    }
    static get bVIIMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIIMaj7b5;
    }
    static get VIIMaj7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIIMaj7b5;
    }

    static get Im7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _Im7;
    }
    static get bIIm7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIm7;
    }
    static get IIm7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIm7;
    }
    static get bIIIm7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIIm7;
    }
    static get IIIm7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIIm7;
    }
    static get IVm7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IVm7;
    }
    static get bVm7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVm7;
    }
    static get Vm7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _Vm7;
    }
    static get bVIm7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIm7;
    }
    static get VIm7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIm7;
    }
    static get bVIIm7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIIm7;
    }
    static get VIIm7(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIIm7;
    }

    static get Im7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _Im7b5;
    }
    static get bIIm7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIm7b5;
    }
    static get IIm7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIm7b5;
    }
    static get bIIIm7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bIIIm7b5;
    }
    static get IIIm7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IIIm7b5;
    }
    static get IVm7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _IVm7b5;
    }
    static get bVm7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVm7b5;
    }
    static get Vm7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _Vm7b5;
    }
    static get bVIm7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIm7b5;
    }
    static get VIm7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIm7b5;
    }
    static get bVIIm7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _bVIIm7b5;
    }
    static get VIIm7b5(): DegreeFunction {
        if (!_I5)
            initializeAll();
        return _VIIm7b5;
    }

    /* Dominant */
    static get V_II(): CompoundFunction {
        if (!_V_II)
            _V_II = CompoundFunction.from(this.V, DegreeAlt.II);

        return _V_II;
    }
    static get V_III(): CompoundFunction {
        if (!_V_III)
            _V_III = CompoundFunction.from(this.V, DegreeAlt.III);

        return _V_III;
    }
    static get V_IV(): CompoundFunction {
        if (!_V_IV)
            _V_IV = CompoundFunction.from(this.V, DegreeAlt.IV);

        return _V_IV;
    }
    static get V_V(): CompoundFunction {
        if (!_V_V)
            _V_V = CompoundFunction.from(this.V, DegreeAlt.V);

        return _V_V;
    }
    static get V_VI(): CompoundFunction {
        if (!_V_VI)
            _V_VI = CompoundFunction.from(this.V, DegreeAlt.VI);

        return _V_VI;
    }

    static get V7_II(): CompoundFunction {
        if (!_V7_II)
            _V7_II = CompoundFunction.from(this.V7, DegreeAlt.II);

        return _V7_II;
    }
    static get V7_III(): CompoundFunction {
        if (!_V7_III)
            _V7_III = CompoundFunction.from(this.V7, DegreeAlt.III);

        return _V7_III;
    }
    static get V7_IV(): CompoundFunction {
        if (!_V7_IV)
            _V7_IV = CompoundFunction.from(this.V7, DegreeAlt.IV);

        return _V7_IV;
    }
    static get V7_V(): CompoundFunction {
        if (!_V7_V)
            _V7_V = CompoundFunction.from(this.V7, DegreeAlt.V);

        return _V7_V;
    }
    static get V7_VI(): CompoundFunction {
        if (!_V7_VI)
            _V7_VI = CompoundFunction.from(this.V7, DegreeAlt.VI);

        return _V7_VI;
    }
    static get SUBV7(): DegreeFunction {
        if (!_SUBV7)
            _SUBV7 = this.bII7;

        return _SUBV7;
    }
    static get SUBV7_II(): CompoundFunction {
        if (!_SUBV7_II)
            _SUBV7_II = CompoundFunction.from(this.SUBV7, DegreeAlt.II);

        return _SUBV7_II;
    }
    static get SUBV7_III(): CompoundFunction {
        if (!_SUBV7_III)
            _SUBV7_III = CompoundFunction.from(this.SUBV7, DegreeAlt.III);

        return _SUBV7_III;
    }
    static get SUBV7_IV(): CompoundFunction {
        if (!_SUBV7_IV)
            _SUBV7_IV = CompoundFunction.from(this.SUBV7, DegreeAlt.IV);

        return _SUBV7_IV;
    }
    static get SUBV7_V(): CompoundFunction {
        if (!_SUBV7_V)
            _SUBV7_V = CompoundFunction.from(this.SUBV7, DegreeAlt.V);

        return _SUBV7_V;
    }
    static get SUBV7_VI(): CompoundFunction {
        if (!_SUBV7_VI)
            _SUBV7_VI = CompoundFunction.from(this.SUBV7, DegreeAlt.VI);

        return _SUBV7_VI;
    }
    static get V7Alt(): HarmonicFunction {
        if (!_V7ALT)
            _V7ALT = new (class A extends HarmonicFunction {
                protected calculateChordAlt(tonality: TonalityAlt): ChordAlt {
                    const V = tonality.root.withAdd(IntervalDiatonicAlt.PERFECT_FIFTH);
                    return ChordAlt.fromRootPattern(V, DiatonicAltPattern.SEVENTH_b5);
                }

                protected calculateChord(tonality: Tonality): Chord {
                    const V = tonality.root.withShift(IntervalDiatonicAlt.PERFECT_FIFTH.interval);
                    return Chord.fromRootPattern(V, ChromaticPattern.SEVENTH_b5);
                }

                toString() {
                    return "V7Alt";
                }
            });

        return _V7ALT;
    }
}

let _I5: DegreeFunction, _bII5: DegreeFunction, _II5: DegreeFunction, _bIII5: DegreeFunction, _III5: DegreeFunction, _IV5: DegreeFunction, _bV5: DegreeFunction, _V5: DegreeFunction, _bVI5: DegreeFunction, _VI5: DegreeFunction, _bVII5: DegreeFunction, _VII5: DegreeFunction;
let _I: DegreeFunction, _bII: DegreeFunction, _II: DegreeFunction, _bIII: DegreeFunction, _III: DegreeFunction, _IV: DegreeFunction, _bV: DegreeFunction, _V: DegreeFunction, _bVI: DegreeFunction, _VI: DegreeFunction, _bVII: DegreeFunction, _VII: DegreeFunction;
let _ISUS4: DegreeFunction, _bIISUS4: DegreeFunction, _IISUS4: DegreeFunction, _bIIISUS4: DegreeFunction, _IIISUS4: DegreeFunction, _IVSUS4: DegreeFunction, _bVSUS4: DegreeFunction, _VSUS4: DegreeFunction, _bVISUS4: DegreeFunction, _VISUS4: DegreeFunction, _bVIISUS4: DegreeFunction, _VIISUS4: DegreeFunction;
let _i: DegreeFunction, _bii: DegreeFunction, _ii: DegreeFunction, _biii: DegreeFunction, _iii: DegreeFunction, _iv: DegreeFunction, _bv: DegreeFunction, _v: DegreeFunction, _bvi: DegreeFunction, _vi: DegreeFunction, _bvii: DegreeFunction, _vii: DegreeFunction;
let _I0: DegreeFunction, _bII0: DegreeFunction, _II0: DegreeFunction, _bIII0: DegreeFunction, _III0: DegreeFunction, _IV0: DegreeFunction, _bV0: DegreeFunction, _V0: DegreeFunction, _bVI0: DegreeFunction, _VI0: DegreeFunction, _bVII0: DegreeFunction, _VII0: DegreeFunction;
let _Iaug: DegreeFunction, _bIIaug: DegreeFunction, _IIaug: DegreeFunction, _bIIIaug: DegreeFunction, _IIIaug: DegreeFunction, _IVaug: DegreeFunction, _bVaug: DegreeFunction, _Vaug: DegreeFunction, _bVIaug: DegreeFunction, _VIaug: DegreeFunction, _bVIIaug: DegreeFunction, _VIIaug: DegreeFunction;
let _I7: DegreeFunction, _bII7: DegreeFunction, _II7: DegreeFunction, _bIII7: DegreeFunction, _III7: DegreeFunction, _IV7: DegreeFunction, _bV7: DegreeFunction, _V7: DegreeFunction, _bVI7: DegreeFunction, _VI7: DegreeFunction, _bVII7: DegreeFunction, _VII7: DegreeFunction;
let _I7SUS4: DegreeFunction, _bII7SUS4: DegreeFunction, _II7SUS4: DegreeFunction, _bIII7SUS4: DegreeFunction, _III7SUS4: DegreeFunction, _IV7SUS4: DegreeFunction, _bV7SUS4: DegreeFunction, _V7SUS4: DegreeFunction, _bVI7SUS4: DegreeFunction, _VI7SUS4: DegreeFunction, _bVII7SUS4: DegreeFunction, _VII7SUS4: DegreeFunction;
let _I7SUS4b9: DegreeFunction, _bII7SUS4b9: DegreeFunction, _II7SUS4b9: DegreeFunction, _bIII7SUS4b9: DegreeFunction, _III7SUS4b9: DegreeFunction, _IV7SUS4b9: DegreeFunction, _bV7SUS4b9: DegreeFunction, _V7SUS4b9: DegreeFunction, _bVI7SUS4b9: DegreeFunction, _VI7SUS4b9: DegreeFunction, _bVII7SUS4b9: DegreeFunction, _VII7SUS4b9: DegreeFunction;
let _I6: DegreeFunction, _bII6: DegreeFunction, _II6: DegreeFunction, _bIII6: DegreeFunction, _III6: DegreeFunction, _IV6: DegreeFunction, _bV6: DegreeFunction, _V6: DegreeFunction, _bVI6: DegreeFunction, _VI6: DegreeFunction, _bVII6: DegreeFunction, _VII6: DegreeFunction;
let _Im6: DegreeFunction, _bIIm6: DegreeFunction, _IIm6: DegreeFunction, _bIIIm6: DegreeFunction, _IIIm6: DegreeFunction, _IVm6: DegreeFunction, _bVm6: DegreeFunction, _Vm6: DegreeFunction, _bVIm6: DegreeFunction, _VIm6: DegreeFunction, _bVIIm6: DegreeFunction, _VIIm6: DegreeFunction;
let _IMaj7: DegreeFunction, _bIIMaj7: DegreeFunction, _IIMaj7: DegreeFunction, _bIIIMaj7: DegreeFunction, _IIIMaj7: DegreeFunction, _IVMaj7: DegreeFunction, _bVMaj7: DegreeFunction, _VMaj7: DegreeFunction, _bVIMaj7: DegreeFunction, _VIMaj7: DegreeFunction, _bVIIMaj7: DegreeFunction, _VIIMaj7: DegreeFunction;
let _IMaj7b5: DegreeFunction, _bIIMaj7b5: DegreeFunction, _IIMaj7b5: DegreeFunction, _bIIIMaj7b5: DegreeFunction, _IIIMaj7b5: DegreeFunction, _IVMaj7b5: DegreeFunction, _bVMaj7b5: DegreeFunction, _VMaj7b5: DegreeFunction, _bVIMaj7b5: DegreeFunction, _VIMaj7b5: DegreeFunction, _bVIIMaj7b5: DegreeFunction, _VIIMaj7b5: DegreeFunction;
let _Im7: DegreeFunction, _bIIm7: DegreeFunction, _IIm7: DegreeFunction, _bIIIm7: DegreeFunction, _IIIm7: DegreeFunction, _IVm7: DegreeFunction, _bVm7: DegreeFunction, _Vm7: DegreeFunction, _bVIm7: DegreeFunction, _VIm7: DegreeFunction, _bVIIm7: DegreeFunction, _VIIm7: DegreeFunction;
let _Im7b5: DegreeFunction, _bIIm7b5: DegreeFunction, _IIm7b5: DegreeFunction, _bIIIm7b5: DegreeFunction, _IIIm7b5: DegreeFunction, _IVm7b5: DegreeFunction, _bVm7b5: DegreeFunction, _Vm7b5: DegreeFunction, _bVIm7b5: DegreeFunction, _VIm7b5: DegreeFunction, _bVIIm7b5: DegreeFunction, _VIIm7b5: DegreeFunction;

let _V_II: CompoundFunction, _V_III: CompoundFunction, _V_IV: CompoundFunction, _V_V: CompoundFunction, _V_VI: CompoundFunction;
let _V7_II: CompoundFunction, _V7_III: CompoundFunction, _V7_IV: CompoundFunction, _V7_V: CompoundFunction, _V7_VI: CompoundFunction;
let _SUBV7: DegreeFunction, _SUBV7_II: CompoundFunction, _SUBV7_III: CompoundFunction, _SUBV7_IV: CompoundFunction, _SUBV7_V: CompoundFunction, _SUBV7_VI: CompoundFunction;
let _V7ALT: HarmonicFunction;

function initializeAll() {
    _I5 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.POWER_CHORD);
    _bII5 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.POWER_CHORD);
    _II5 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.POWER_CHORD);
    _bIII5 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.POWER_CHORD);
    _III5 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.POWER_CHORD);
    _IV5 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.POWER_CHORD);
    _bV5 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.POWER_CHORD);
    _V5 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.POWER_CHORD);
    _bVI5 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.POWER_CHORD);
    _VI5 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.POWER_CHORD);
    _bVII5 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.POWER_CHORD);
    _VII5 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.POWER_CHORD);

    _I = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.TRIAD_MAJOR);
    _bII = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.TRIAD_MAJOR);
    _II = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.TRIAD_MAJOR);
    _bIII = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.TRIAD_MAJOR);
    _III = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.TRIAD_MAJOR);
    _IV = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.TRIAD_MAJOR);
    _bV = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.TRIAD_MAJOR);
    _V = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.TRIAD_MAJOR);
    _bVI = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.TRIAD_MAJOR);
    _VI = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.TRIAD_MAJOR);
    _bVII = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.TRIAD_MAJOR);
    _VII = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.TRIAD_MAJOR);

    _ISUS4 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.TRIAD_SUS4);
    _bIISUS4 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.TRIAD_SUS4);
    _IISUS4 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.TRIAD_SUS4);
    _bIIISUS4 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.TRIAD_SUS4);
    _IIISUS4 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.TRIAD_SUS4);
    _IVSUS4 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.TRIAD_SUS4);
    _bVSUS4 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.TRIAD_SUS4);
    _VSUS4 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.TRIAD_SUS4);
    _bVISUS4 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.TRIAD_SUS4);
    _VISUS4 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.TRIAD_SUS4);
    _bVIISUS4 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.TRIAD_SUS4);
    _VIISUS4 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.TRIAD_SUS4);

    _i = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.TRIAD_MINOR);
    _bii = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.TRIAD_MINOR);
    _ii = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.TRIAD_MINOR);
    _biii = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.TRIAD_MINOR);
    _iii = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.TRIAD_MINOR);
    _iv = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.TRIAD_MINOR);
    _bv = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.TRIAD_MINOR);
    _v = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.TRIAD_MINOR);
    _bvi = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.TRIAD_MINOR);
    _vi = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.TRIAD_MINOR);
    _bvii = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.TRIAD_MINOR);
    _vii = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.TRIAD_MINOR);

    _I0 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.TRIAD_DIMINISHED);
    _bII0 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.TRIAD_DIMINISHED);
    _II0 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.TRIAD_DIMINISHED);
    _bIII0 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.TRIAD_DIMINISHED);
    _III0 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.TRIAD_DIMINISHED);
    _IV0 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.TRIAD_DIMINISHED);
    _bV0 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.TRIAD_DIMINISHED);
    _V0 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.TRIAD_DIMINISHED);
    _bVI0 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.TRIAD_DIMINISHED);
    _VI0 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.TRIAD_DIMINISHED);
    _bVII0 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.TRIAD_DIMINISHED);
    _VII0 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.TRIAD_DIMINISHED);


    _Iaug = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.TRIAD_AUGMENTED);
    _bIIaug = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.TRIAD_AUGMENTED);
    _IIaug = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.TRIAD_AUGMENTED);
    _bIIIaug = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.TRIAD_AUGMENTED);
    _IIIaug = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.TRIAD_AUGMENTED);
    _IVaug = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.TRIAD_AUGMENTED);
    _bVaug = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.TRIAD_AUGMENTED);
    _Vaug = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.TRIAD_AUGMENTED);
    _bVIaug = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.TRIAD_AUGMENTED);
    _VIaug = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.TRIAD_AUGMENTED);
    _bVIIaug = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.TRIAD_AUGMENTED);
    _VIIaug = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.TRIAD_AUGMENTED);

    /* Seventh */

    _I7 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.SEVENTH);
    _bII7 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.SEVENTH);
    _II7 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.SEVENTH);
    _bIII7 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.SEVENTH);
    _III7 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.SEVENTH);
    _IV7 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.SEVENTH);
    _bV7 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.SEVENTH);
    _V7 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.SEVENTH);
    _bVI7 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.SEVENTH);
    _VI7 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.SEVENTH);
    _bVII7 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.SEVENTH);
    _VII7 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.SEVENTH);

    _I7SUS4 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.SEVENTH_SUS4);
    _bII7SUS4 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.SEVENTH_SUS4);
    _II7SUS4 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.SEVENTH_SUS4);
    _bIII7SUS4 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.SEVENTH_SUS4);
    _III7SUS4 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.SEVENTH_SUS4);
    _IV7SUS4 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.SEVENTH_SUS4);
    _bV7SUS4 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.SEVENTH_SUS4);
    _V7SUS4 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.SEVENTH_SUS4);
    _bVI7SUS4 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.SEVENTH_SUS4);
    _VI7SUS4 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.SEVENTH_SUS4);
    _bVII7SUS4 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.SEVENTH_SUS4);
    _VII7SUS4 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.SEVENTH_SUS4);

    _I7SUS4b9 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.SEVENTH_SUS4_b9);
    _bII7SUS4b9 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.SEVENTH_SUS4_b9);
    _II7SUS4b9 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.SEVENTH_SUS4_b9);
    _bIII7SUS4b9 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.SEVENTH_SUS4_b9);
    _III7SUS4b9 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.SEVENTH_SUS4_b9);
    _IV7SUS4b9 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.SEVENTH_SUS4_b9);
    _bV7SUS4b9 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.SEVENTH_SUS4_b9);
    _V7SUS4b9 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.SEVENTH_SUS4_b9);
    _bVI7SUS4b9 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.SEVENTH_SUS4_b9);
    _VI7SUS4b9 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.SEVENTH_SUS4_b9);
    _bVII7SUS4b9 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.SEVENTH_SUS4_b9);
    _VII7SUS4b9 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.SEVENTH_SUS4_b9);

    _I6 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.SIXTH);
    _bII6 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.SIXTH);
    _II6 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.SIXTH);
    _bIII6 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.SIXTH);
    _III6 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.SIXTH);
    _IV6 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.SIXTH);
    _bV6 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.SIXTH);
    _V6 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.SIXTH);
    _bVI6 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.SIXTH);
    _VI6 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.SIXTH);
    _bVII6 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.SIXTH);
    _VII6 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.SIXTH);

    _Im6 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.SIXTH_MINOR);
    _bIIm6 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.SIXTH_MINOR);
    _IIm6 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.SIXTH_MINOR);
    _bIIIm6 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.SIXTH_MINOR);
    _IIIm6 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.SIXTH_MINOR);
    _IVm6 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.SIXTH_MINOR);
    _bVm6 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.SIXTH_MINOR);
    _Vm6 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.SIXTH_MINOR);
    _bVIm6 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.SIXTH_MINOR);
    _VIm6 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.SIXTH_MINOR);
    _bVIIm6 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.SIXTH_MINOR);
    _VIIm6 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.SIXTH_MINOR);

    _IMaj7 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.SEVENTH_MAJ7);
    _bIIMaj7 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.SEVENTH_MAJ7);
    _IIMaj7 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.SEVENTH_MAJ7);
    _bIIIMaj7 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.SEVENTH_MAJ7);
    _IIIMaj7 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.SEVENTH_MAJ7);
    _IVMaj7 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.SEVENTH_MAJ7);
    _bVMaj7 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.SEVENTH_MAJ7);
    _VMaj7 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.SEVENTH_MAJ7);
    _bVIMaj7 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.SEVENTH_MAJ7);
    _VIMaj7 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.SEVENTH_MAJ7);
    _bVIIMaj7 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.SEVENTH_MAJ7);
    _VIIMaj7 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.SEVENTH_MAJ7);

    _IMaj7b5 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    _bIIMaj7b5 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    _IIMaj7b5 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    _bIIIMaj7b5 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    _IIIMaj7b5 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    _IVMaj7b5 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    _bVMaj7b5 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    _VMaj7b5 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    _bVIMaj7b5 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    _VIMaj7b5 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    _bVIIMaj7b5 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    _VIIMaj7b5 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.SEVENTH_MAJ7_b5);

    _Im7 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.SEVENTH_MINOR);
    _bIIm7 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.SEVENTH_MINOR);
    _IIm7 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.SEVENTH_MINOR);
    _bIIIm7 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.SEVENTH_MINOR);
    _IIIm7 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.SEVENTH_MINOR);
    _IVm7 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.SEVENTH_MINOR);
    _bVm7 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.SEVENTH_MINOR);
    _Vm7 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.SEVENTH_MINOR);
    _bVIm7 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.SEVENTH_MINOR);
    _VIm7 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.SEVENTH_MINOR);
    _bVIIm7 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.SEVENTH_MINOR);
    _VIIm7 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.SEVENTH_MINOR);

    _Im7b5 = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.SEVENTH_MINOR_b5);
    _bIIm7b5 = DegreeFunction.from(DegreeAlt.bII, DiatonicAltPattern.SEVENTH_MINOR_b5);
    _IIm7b5 = DegreeFunction.from(DegreeAlt.II, DiatonicAltPattern.SEVENTH_MINOR_b5);
    _bIIIm7b5 = DegreeFunction.from(DegreeAlt.bIII, DiatonicAltPattern.SEVENTH_MINOR_b5);
    _IIIm7b5 = DegreeFunction.from(DegreeAlt.III, DiatonicAltPattern.SEVENTH_MINOR_b5);
    _IVm7b5 = DegreeFunction.from(DegreeAlt.IV, DiatonicAltPattern.SEVENTH_MINOR_b5);
    _bVm7b5 = DegreeFunction.from(DegreeAlt.bV, DiatonicAltPattern.SEVENTH_MINOR_b5);
    _Vm7b5 = DegreeFunction.from(DegreeAlt.V, DiatonicAltPattern.SEVENTH_MINOR_b5);
    _bVIm7b5 = DegreeFunction.from(DegreeAlt.bVI, DiatonicAltPattern.SEVENTH_MINOR_b5);
    _VIm7b5 = DegreeFunction.from(DegreeAlt.VI, DiatonicAltPattern.SEVENTH_MINOR_b5);
    _bVIIm7b5 = DegreeFunction.from(DegreeAlt.bVII, DiatonicAltPattern.SEVENTH_MINOR_b5);
    _VIIm7b5 = DegreeFunction.from(DegreeAlt.VII, DiatonicAltPattern.SEVENTH_MINOR_b5);

}