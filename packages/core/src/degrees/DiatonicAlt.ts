import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { NamingDiatonicAlt } from '../lang/naming/NamingDiatonicAlt';
import { Chromatic } from './Chromatic';
import { Degree } from './Degree';
import { Diatonic } from './Diatonic';
import { DiatonicAltCache, HashingObjectType } from './DiatonicAltCache';
import { DiatonicAltStaticNames } from './DiatonicAltStaticNames';

export class DiatonicAlt extends DiatonicAltStaticNames implements Degree {
    private static _cache = new DiatonicAltCache(
        (hashingObject: HashingObjectType) => new DiatonicAlt(hashingObject.diatonic, hashingObject.alts)
    );

    static from(diatonic: Diatonic, alts: number): DiatonicAlt {
        return DiatonicAlt._cache.getOrCreate({ diatonic: diatonic, alts: alts });
    }

    static fromString(str: string): DiatonicAlt {
        return NamingDiatonicAlt.get(str);
    }

    static fromChromatic(chromatic: Chromatic, diatonic?: Diatonic): DiatonicAlt {
        if (!diatonic) {
            switch (chromatic) {
                case Chromatic.C: return DiatonicAlt.C;
                case Chromatic.CC: return DiatonicAlt.CC;
                case Chromatic.D: return DiatonicAlt.D;
                case Chromatic.DD: return DiatonicAlt.DD;
                case Chromatic.E: return DiatonicAlt.E;
                case Chromatic.F: return DiatonicAlt.F;
                case Chromatic.FF: return DiatonicAlt.FF;
                case Chromatic.G: return DiatonicAlt.G;
                case Chromatic.GG: return DiatonicAlt.GG;
                case Chromatic.A: return DiatonicAlt.A;
                case Chromatic.AA: return DiatonicAlt.AA;
                case Chromatic.B: return DiatonicAlt.B;
            }
        }

        let alts = DiatonicAlt.getAltsFromChromaticAndDiatonic(chromatic, diatonic);

        return DiatonicAlt.from(diatonic, alts);
    }

    private static getAltsFromChromaticAndDiatonic(chromatic: Chromatic, diatonic: Diatonic): number {
        let alts = chromatic.valueOf() - diatonic.chromatic.valueOf();
        alts = this.fixAlts(alts);

        return alts;
    }

    private static fixAlts(alts: number): number {
        alts %= Chromatic.NUMBER;
        if (alts < -Chromatic.NUMBER / 2)
            alts += Chromatic.NUMBER;
        else if (alts > Chromatic.NUMBER / 2)
            alts -= Chromatic.NUMBER;

        return alts;
    }

    private constructor(private _diatonic: Diatonic, private _alts: number) {
        super();
    }

    withAdd(intervalDiatonicAlt: IntervalDiatonicAlt) {
        let diatonic: Diatonic = this.diatonic.withAdd(intervalDiatonicAlt.intervalDiatonic);
        let chromatic: Chromatic = this.chromatic.withShift(intervalDiatonicAlt.intervalChromatic);
        return DiatonicAlt.fromChromatic(chromatic, diatonic);
    }

    withSub(intervalDiatonicAlt: IntervalDiatonicAlt) {
        let diatonic: Diatonic = this.diatonic.withSub(intervalDiatonicAlt.intervalDiatonic);
        let chromatic: Chromatic = this.chromatic.withShift(-intervalDiatonicAlt.intervalChromatic);
        return DiatonicAlt.fromChromatic(chromatic, diatonic);
    }

    get chromatic(): Chromatic {
        let chromaticInt = this.diatonic.chromatic.valueOf();
        chromaticInt += this.alts;

        return Chromatic.fromInt(chromaticInt);
    }

    get diatonic(): Diatonic {
        return this._diatonic;
    }

    get alts(): number {
        return this._alts;
    }

    toString(): string {
        return NamingDiatonicAlt.toString(this);
    }

    private hash(): number {
        return this.diatonic.valueOf() * 197 + this.alts * 199;
    }

    valueOf(): number {
        return this.hash();
    }
}