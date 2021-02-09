import { ChromaticInterval } from '../../../../intervals';
import { Chromatic } from '../../octave/chromatic/Chromatic';
import { AbsolutePitch } from '../AbsolutePitch';
import { fromChromaticOctave } from './building/builders/SPNFromChromaticOctave';
import { SPNStaticNames } from './building/staticnames/SPNStaticNames';

export class SPN extends SPNStaticNames implements AbsolutePitch<Chromatic> {
    private constructor(private _chromatic: Chromatic, private _octave: number) {
        super();
        Object.freeze(this._chromatic);
        Object.freeze(this._octave);
    }

    private static _create(chromatic: Chromatic, octave: number) {
        return new SPN(chromatic, octave);
    }

    static from(chromatic: Chromatic, octave: number): SPN | null {
        return fromChromaticOctave(chromatic, octave);
    }

    get degree(): Chromatic {
        return this._chromatic;
    }

    get octave(): number {
        return this._octave;
    }

    withShift(interval: ChromaticInterval): SPN | null {
        if (interval == null)
            return null;
        const newValue = this.valueOf() + interval.valueOf();
        const chromatic: Chromatic = Chromatic.fromInt(newValue);
        const octave = Math.floor(newValue / Chromatic.NUMBER);
        return SPN.from(chromatic, octave);
    }

    toString() {
        return this.degree.toString() + this.octave;
    }

    valueOf(): number {
        return this.degree.valueOf() + this.octave * Chromatic.NUMBER;
    }
}