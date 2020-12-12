import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { Chromatic, getVarStringFrom as getVarStringFromChromatic } from '../../degrees/Chromatic';
import { HashingObject, SPNCache } from './SPNCache';
import { SPNStaticNames } from './SPNStaticNames';
import { SymbolicPitch } from './SymbolicPitch';

export class SPN extends SPNStaticNames implements SymbolicPitch {
    private static _cache = new SPNCache(
        (hashingObject: HashingObject) => new SPN(hashingObject.diatonicAlt, hashingObject.octave)
    );

    private constructor(private _diatonicAlt: DiatonicAlt, private _octave: number) {
        super();
    }

    static from(diatonicAlt: DiatonicAlt, octave: number) {
        return this._cache.getOrCreate({ diatonicAlt, octave });
    }

    get degree(): DiatonicAlt {
        return this._diatonicAlt;
    }

    get octave(): number {
        return this._octave;
    }

    toString() {
        return this.degree.toString() + this.octave;
    }

    valueOf(): number {
        return this.degree.chromatic.valueOf() + this.octave * Chromatic.NUMBER;
    }
}

/** @internal */ 
export function getVarStringFromSPN(diatonicAlt: DiatonicAlt, octave: number): string {
    let varSPN = getVarStringFromChromatic(diatonicAlt.chromatic);
    if (octave > 0)
        varSPN += octave - 1;
    else
        varSPN += "_S" + (-(octave - 1));

    return varSPN;
}