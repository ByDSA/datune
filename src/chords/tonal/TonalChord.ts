import { HarmonicFunction } from '../../function/HarmonicFunction';
import { Tonality } from '../../tonality/Tonality';

export class TonalChord {
    private constructor(public tonality: Tonality, public harmonicFunction: HarmonicFunction) {
    }

    public static from(tonality: Tonality, harmonicFunction: HarmonicFunction): TonalChord {
        return new TonalChord(tonality, harmonicFunction);
    }

    /* Object */

    public toString(): string {
        return this.tonality + " " + this.harmonicFunction;
    }

    public hashCode(): string {
        return this.tonality.hashCode() + "|" + this.harmonicFunction.hashCode();
    }
}
