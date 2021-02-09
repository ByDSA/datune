import { IntervalDiatonicAlt } from '../../../../intervals';
import { Diatonic } from '../../../../pitches';
import { DiatonicAlt } from '../../octave/alt/DiatonicAlt';
import { AbsolutePitch } from '../AbsolutePitch';
import { HashingObject, SPNCache } from './building/cache/SPNAltCache';
import { SPNStaticNames } from './building/staticnames/SPNAltStaticNames';

export class SPNAlt extends SPNStaticNames implements AbsolutePitch<DiatonicAlt> {
    private static _cache = new SPNCache(
        (hashingObject: HashingObject) => new SPNAlt(hashingObject.diatonicAlt, hashingObject.octave)
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

    withAdd(interval: IntervalDiatonicAlt): SPNAlt | null {
        if (interval == null)
            return null;
        const diatonicAlt = this._diatonicAlt.withAdd(interval);
        const diatonicValue = this._diatonicAlt.diatonic.valueOf() + interval.intervalDiatonic.valueOf();
        const octaveShift = Math.floor(diatonicValue / Diatonic.NUMBER);
        return SPNAlt.from(diatonicAlt, this._octave + octaveShift);
    }

    withSub(interval: IntervalDiatonicAlt): SPNAlt | null {
        if (interval == null)
            return null;
        const diatonicAlt = this._diatonicAlt.withSub(interval);
        const diatonicValue = this._diatonicAlt.diatonic.valueOf() - interval.intervalDiatonic.valueOf();
        const octaveShift = Math.floor(diatonicValue / Diatonic.NUMBER);
        return SPNAlt.from(diatonicAlt, this._octave + octaveShift);
    }

    toString() {
        return this.degree.toString() + this.octave;
    }
}