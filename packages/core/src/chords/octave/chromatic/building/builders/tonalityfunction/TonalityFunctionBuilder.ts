import { HarmonicFunction, Tonality } from '../../../../../../tonalities';
import { ChromaticChord } from '../../../ChromaticChord';

export class TonalityFunctionBuilder {
    private constructor(private _tonality: Tonality, private _harmonicFunction: HarmonicFunction) {
    }

    static from(tonality: Tonality, harmonicFunction: HarmonicFunction): TonalityFunctionBuilder {
        return new TonalityFunctionBuilder(tonality, harmonicFunction);
    }

    build(): ChromaticChord {
        return this._buildChord();
    }

    private _buildChord(): ChromaticChord {
        return this.function.getChord(this.tonality);
    }

    get tonality(): Tonality {
        return this._tonality;
    }

    get function(): HarmonicFunction {
        return this._harmonicFunction;
    }
}
