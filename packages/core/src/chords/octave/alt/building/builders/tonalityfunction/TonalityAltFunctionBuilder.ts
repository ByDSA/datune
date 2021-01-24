import { HarmonicFunction, TonalityAlt } from "../../../../../../tonalities";
import { ChordAlt } from '../../../ChordAlt';

export class TonalityAltFunctionBuilder {
    private constructor(private _tonality: TonalityAlt, private _harmonicFunction: HarmonicFunction) {
    }

    static from(tonality: TonalityAlt, harmonicFunction: HarmonicFunction): TonalityAltFunctionBuilder {
        return new TonalityAltFunctionBuilder(tonality, harmonicFunction);
    }

    build(): ChordAlt {
        return this._buildChord();
    }

    private _buildChord(): ChordAlt {
        return this.function.getChordAlt(this.tonality);
    }

    get tonality(): TonalityAlt {
        return this._tonality;
    }

    get function(): HarmonicFunction {
        return this._harmonicFunction;
    }
}
