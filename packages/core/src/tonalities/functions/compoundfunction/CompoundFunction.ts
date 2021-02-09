import { DegreeAltArray } from "../../../scales";
import { Chord, ChordAlt } from "../../../chords";
import { DegreeAlt } from "../../../scales";
import { TonalityAlt } from "../../alt/TonalityAlt";
import { Tonality } from "../../chromatic/Tonality";
import { DegreeFunction } from "../degreefunction/DegreeFunction";
import { FunctionsFacade } from "../FunctionsFacade";
import { HarmonicFunction } from "../HarmonicFunction";

export class CompoundFunction extends HarmonicFunction {
    private constructor(private _function: DegreeFunction, private _chain: DegreeAltArray) {
        super();
    }

    static from(func: DegreeFunction, ...chain: DegreeAltArray): CompoundFunction {
        return new CompoundFunction(func, chain);
    }

    protected calculateChordAlt(tonality: TonalityAlt): ChordAlt {
        let baseChord = this._function.getChordAlt(tonality);
        let chord = baseChord;
        if (this._chain)
            for (let degreeAlt of this._chain) {
                let interval = degreeAlt.intervalDiatonicAlt;
                chord = chord.withAdd(interval);
            }

        return chord;
    }

    protected calculateChord(tonality: Tonality): Chord {
        let baseChord = this._function.getChord(tonality);
        let chord = baseChord;
        if (this._chain)
            for (let degreeAlt of this._chain) {
                let interval = degreeAlt.degree;
                chord = chord.withShift(interval);
            }

        return chord;
    }

    get degreeFunction(): DegreeFunction {
        return this._function;
    }

    get degreeAltChain(): DegreeAlt[] {
        return this._chain;
    }

    toString() {
        switch (this) {
            case FunctionsFacade.V_II: return "V/II";
            case FunctionsFacade.V_III: return "V/III";
            case FunctionsFacade.V_IV: return "V/IV";
            case FunctionsFacade.V_V: return "V/V";
            case FunctionsFacade.V_VI: return "V/VI";
            case FunctionsFacade.V7_II: return "V7/II";
            case FunctionsFacade.V7_III: return "V7/III";
            case FunctionsFacade.V7_IV: return "V7/IV";
            case FunctionsFacade.V7_V: return "V7/V";
            case FunctionsFacade.V7_VI: return "V7/VI";
        }

        return defaultToString(this);
    }
}

function defaultToString(func: CompoundFunction): string {
    let str = func.degreeFunction.toString();
    for (let degreeAlt of func.degreeAltChain) {
        str += "/" + degreeAlt.toString();
    }

    return str;
}