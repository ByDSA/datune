import { IntervalDiatonicAlt } from '../../../../intervals';
import { Chromatic } from '../chromatic/Chromatic';
import { SymbolicDegree } from '../DegreeSymbolic';
import { Diatonic } from '../diatonic/Diatonic';
import { DiatonicAltBuilder } from './building/builders/DiatonicAltBuilder';
import { DiatonicAltCache, HashingObjectType } from './building/cache/DiatonicAltCache';
import { DiatonicAltFinder } from './building/finder/DiatonicAltFinder';
import { DiatonicAltStaticNames as DiatonicAltStaticNames } from './building/staticnames/DiatonicAltStaticNames';
import { NamingDiatonicAlt } from './naming/NamingDiatonicAlt';

export class DiatonicAlt extends DiatonicAltStaticNames implements SymbolicDegree {
    private static _cache = new DiatonicAltCache(
        (hashingObject: HashingObjectType) => new DiatonicAlt(hashingObject.diatonic, hashingObject.alts)
    );

    private static _noteAltCache = new Map<DiatonicAlt, Chromatic>();

    // Building

    static from(diatonic: Diatonic, alts: number): DiatonicAlt {
        return DiatonicAlt._cache.getOrCreate({ diatonic: diatonic, alts: alts });
    }

    static fromString(str: string): DiatonicAlt | null {
        return NamingDiatonicAlt.get(str);
    }

    static fromNote(c: Chromatic): DiatonicAlt {
        return <DiatonicAlt>DiatonicAlt.builder().setNote(c).build();
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

    withAdd(intervalDiatonicAlt: IntervalDiatonicAlt): DiatonicAlt {
        let diatonic: Diatonic = this.diatonic.withAdd(intervalDiatonicAlt.intervalDiatonic);
        let chromatic: Chromatic = this.note.withShift(intervalDiatonicAlt.interval);
        return <DiatonicAlt>DiatonicAlt.builder().setNote(chromatic).setDiatonic(diatonic).build();
    }

    withSub(intervalDiatonicAlt: IntervalDiatonicAlt): DiatonicAlt {
        let diatonic: Diatonic = this.diatonic.withSub(intervalDiatonicAlt.intervalDiatonic);
        let chromatic: Chromatic = this.note.withShift(-intervalDiatonicAlt.interval);
        return <DiatonicAlt>DiatonicAlt.builder().setNote(chromatic).setDiatonic(diatonic).build();
    }

    get note(): Chromatic {
        let chromatic = DiatonicAlt._noteAltCache.get(this);
        if (!chromatic) {
            chromatic = this._calcNote();
            DiatonicAlt._noteAltCache.set(this, chromatic);
        }

        return chromatic;
    }

    private _calcNote(): Chromatic {
        let int = this.diatonic.chromatic.valueOf();
        int += this.alts;

        return Chromatic.fromInt(int);
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