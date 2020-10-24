import { Tonality } from '../../tonalities/Tonality';
import { HarmonicFunction } from '../../tonalities/functions/HarmonicFunction';

export class FunctionalChord {
    private constructor(public tonality: Tonality, public harmonicFunction: HarmonicFunction) {
    }

    static from(tonality: Tonality, harmonicFunction: HarmonicFunction): FunctionalChord {
        return new FunctionalChord(tonality, harmonicFunction);
    }

    /* Object */

    toString(): string {
        return this.tonality + " " + this.harmonicFunction;
    }

    hashCode(): string {
        return this.tonality.hashCode() + "|" + this.harmonicFunction.hashCode();
    }
}
