import { mod, NonEmptyArray } from '@datune/utils';
import { Settings } from '../../../../config';
import { IntervalDiatonic, IntervalDiatonicAlt } from '../../../../intervals';
import { Chromatic, Diatonic } from '../../../../pitches';
import { fixAlts } from '../../../../pitches/symbolic/octave/alt/building/builders/DiatonicAltBuilder';
import { Degree } from '../../chromatic/degree/Degree';
import { Scale } from '../../chromatic/scale/Scale';
import { DiatonicDegree } from '../../degrees/DiatonicDegree';
import { DegreeAltCache, HashingObjectType } from './building/cache/DegreeAltCache';
import { DegreeAltStaticNames } from './building/staticnames/DiatonicAltDegreeStaticNames';

const ScaleMajorSemis = Scale.MAJOR.degrees;
export type DegreeAltArray = NonEmptyArray<DegreeAlt>;
export class DegreeAlt extends DegreeAltStaticNames {
    private static _cache = new DegreeAltCache(
        (hashingObject: HashingObjectType) => new DegreeAlt(hashingObject.diatonicDegree, hashingObject.alts)
    );

    private constructor(private _diatonicDegree: DiatonicDegree, private _alts: number) {
        super();
    }

    static from(diatonicDegree: DiatonicDegree, alts: number): DegreeAlt {
        alts = fixAlts(alts);
        return this._cache.getOrCreate({ diatonicDegree: diatonicDegree, alts: alts });
    }

    static fromDegrees(diatonicDegree: DiatonicDegree, degree: Degree): DegreeAlt {
        let alts = degree - Scale.MAJOR.degrees[diatonicDegree.valueOf()];
        return this.from(diatonicDegree, alts);
    }

    static toStringArray(degrees: DegreeAltArray): string {
        let first = true;
        let ret: string = "";
        degrees.forEach(degree => {
            if (first)
                first = false;
            else
                ret += "-";
            ret += degree.toString();
        });

        return ret;
    }

    get diatonicDegree(): DiatonicDegree {
        return this._diatonicDegree;
    }

    get alts(): number {
        return this._alts;
    }

    get degree(): Degree {
        let semis = Diatonic.fromInt(this.diatonicDegree.valueOf()).chromatic.valueOf() + this.alts;
        semis = mod(semis, Chromatic.NUMBER);
        return semis;
    }

    get intervalDiatonicAlt(): IntervalDiatonicAlt {
        let interval = Diatonic.fromInt(this.diatonicDegree.valueOf()).chromatic.valueOf() + this.alts;
        let intervalDiatonic = IntervalDiatonic.from(this.diatonicDegree.valueOf());
        return IntervalDiatonicAlt.fromIntervals(interval, intervalDiatonic);
    }

    withAdd(interval: IntervalDiatonicAlt) {
        let semis = this.degree + interval.interval;
        let diatonicDegreeInt = this.diatonicDegree.valueOf() + interval.intervalDiatonic.valueOf();
        let diatonicDegree = DiatonicDegree.fromInt(diatonicDegreeInt);
        let alts = semis - ScaleMajorSemis[diatonicDegree.valueOf()];
        return DegreeAlt.from(diatonicDegree, alts);
    }

    withSub(interval: IntervalDiatonicAlt) {
        let semis = this.degree - interval.interval;
        let diatonicDegreeInt = this.diatonicDegree.valueOf() - interval.intervalDiatonic.valueOf();
        let diatonicDegree = DiatonicDegree.fromInt(diatonicDegreeInt);
        let alts = semis - ScaleMajorSemis[diatonicDegree.valueOf()];
        return DegreeAlt.from(diatonicDegree, alts);
    }

    valueOf(): number {
        return this.degree;
    }

    toString(): string {
        let alts = Settings.symbols.alts(this.alts);
        return alts + this.diatonicDegree.toString();
    }
}