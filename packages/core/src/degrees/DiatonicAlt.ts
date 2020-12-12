import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { NamingDiatonicAlt } from '../lang/naming/NamingDiatonicAlt';
import { Chromatic } from './Chromatic';
import { Degree } from './Degree';
import { Diatonic } from './Diatonic';
import { DiatonicAltCache, HashingObjectType } from './DiatonicAltCache';
import { DiatonicAltStaticNames } from './DiatonicAltStaticNames';
import { DiatonicAltBuilder } from './DiatoniCaltBuilder';
import { DiatonicAltFinder } from './DiatonicAltFinder';

export class DiatonicAlt extends DiatonicAltStaticNames implements Degree {
    private static _cache = new DiatonicAltCache(
        (hashingObject: HashingObjectType) => new DiatonicAlt(hashingObject.diatonic, hashingObject.alts)
    );

    private static _chromaticCache = new Map<DiatonicAlt, Chromatic>();

    // Building

    static from(diatonic: Diatonic, alts: number): DiatonicAlt {
        return DiatonicAlt._cache.getOrCreate({ diatonic: diatonic, alts: alts });
    }

    static fromString(str: string): DiatonicAlt {
        return NamingDiatonicAlt.get(str);
    }

    static fromChromatic(c: Chromatic): DiatonicAlt {
        return DiatonicAlt.builder().setChromatic(c).build();
    }

    private constructor(private _diatonic: Diatonic, private _alts: number) {
        super();
    }

    static builder(): DiatonicAltBuilder {
        return DiatonicAltBuilder.create();
    }

    static finder(): DiatonicAltFinder {
        return DiatonicAltFinder.create();
    }

    // Immutable methods

    withAdd(intervalDiatonicAlt: IntervalDiatonicAlt) {
        let diatonic: Diatonic = this.diatonic.withAdd(intervalDiatonicAlt.intervalDiatonic);
        let chromatic: Chromatic = this.chromatic.withShift(intervalDiatonicAlt.intervalChromatic);
        return DiatonicAlt.builder().setChromatic(chromatic).setDiatonic(diatonic).build();
    }

    withSub(intervalDiatonicAlt: IntervalDiatonicAlt) {
        let diatonic: Diatonic = this.diatonic.withSub(intervalDiatonicAlt.intervalDiatonic);
        let chromatic: Chromatic = this.chromatic.withShift(-intervalDiatonicAlt.intervalChromatic);
        return DiatonicAlt.builder().setChromatic(chromatic).setDiatonic(diatonic).build();
    }

    get chromatic(): Chromatic {
        if (!DiatonicAlt._chromaticCache.has(this))
            this._calculateChromatic();

        return DiatonicAlt._chromaticCache.get(this);
    }

    private _calculateChromatic() {
        let chromaticInt = this.diatonic.chromatic.valueOf();
        chromaticInt += this.alts;

        let chromatic: Chromatic = Chromatic.fromInt(chromaticInt);
        DiatonicAlt._chromaticCache.set(this, chromatic);
    }

    // Getters

    get diatonic(): Diatonic {
        return this._diatonic;
    }

    get alts(): number {
        return this._alts;
    }

    // Object methods

    toString(): string {
        return NamingDiatonicAlt.toString(this);
    }

    private _hash(): number {
        return this.diatonic.valueOf() * 197 + this.alts * 199;
    }

    valueOf(): number {
        return this._hash();
    }
}