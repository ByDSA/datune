import { HarmonicFunction } from '../../tonalities/functions/HarmonicFunction';
import { Tonality } from '../../tonalities/Tonality';

export class TonalityFunctionBuilder {
    private _tonality: Tonality;
    private _harmonicFunction: HarmonicFunction;

    private constructor() {
    }

    static create(): TonalityFunctionBuilder {
        return new TonalityFunctionBuilder();
    }

    setTonality(t: Tonality): TonalityFunctionBuilder {
        this._tonality = t;
        return this;
    }

    setFunction(f: HarmonicFunction): TonalityFunctionBuilder {
        this._harmonicFunction = f;
        return this;
    }

    getTonality(): Tonality {
        return this._tonality;
    }

    getFunction(): HarmonicFunction {
        return this._harmonicFunction;
    }

    /* Object */

    toString(): string {
        return this._tonality + " " + this._harmonicFunction;
    }

    hashCode(): string {
        return this._tonality.hashCode() + "|" + this._harmonicFunction.hashCode();
    }
}
