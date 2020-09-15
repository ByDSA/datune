import { Chromatic, getVarStringFrom as getVarStringFromChromatic } from '../../degrees/Chromatic';
import { HashingObject, SPNCache } from './SPNCache';
import { SPNStaticNames } from './SPNStaticNames';
import { SymbolicPitch } from './SymbolicPitch';

export class SPN extends SPNStaticNames implements SymbolicPitch {
    private static _cache = new SPNCache(
        (hashingObject: HashingObject) => new SPN(hashingObject.chromatic, hashingObject.octave)
    );

    private constructor(private _chromatic: Chromatic, private _octave: number) {
        super();
    }

    static from(chromatic: Chromatic, octave: number) {
        return this._cache.getOrCreate({ chromatic: chromatic, octave: octave });
    }

    get chromatic(): Chromatic {
        return this._chromatic;
    }

    get degree(): Chromatic {
        return this.chromatic;
    }

    get octave(): number {
        return this._octave;
    }

    toString() {
        return this.chromatic.toString() + this.octave;
    }

    valueOf(): number {
        return this.chromatic.valueOf() + this.octave * Chromatic.NUMBER;
    }

    get next(): SPN {
        let chromatic = this.chromatic.withShift(1);
        let octave = this.octave;
        if (chromatic.compareTo(this._chromatic) < 0)
            octave++;

        return SPN.from(chromatic, octave);
    }

    get previous(): SPN {
        let chromatic = this.chromatic.withShift(-1);
        let octave = this.octave;
        if (chromatic.compareTo(this._chromatic) > 0)
            octave--;

        return SPN.from(chromatic, octave);
    }
}

export function getVarStringFromSPN(chromatic: Chromatic, octave: number): string {
    let varSPN = getVarStringFromChromatic(chromatic);
    if (octave > 0)
        varSPN += octave - 1;
    else
        varSPN += "_S" + (-(octave - 1));

    return varSPN;
}