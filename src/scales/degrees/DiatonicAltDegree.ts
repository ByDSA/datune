import { rotativeTrim } from '../../common/MathUtils';
import { Chromatic } from '../../degrees/Chromatic';
import { Diatonic } from '../../degrees/Diatonic';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { IntervalDiatonic } from '../../intervals/IntervalDiatonic';
import { IntervalDiatonicAlt } from '../../intervals/IntervalDiatonicAlt';
import { Settings } from '../../settings/Settings';
import { Scale } from '../Scale';
import { DiatonicDegree } from './DiatonicDegree';
import { DiatonicAltDegreeCache, HashingObjectType } from './DiatonicAltDegreeCache';

const ScaleMajor = [0, 2, 4, 5, 7, 9, 11];
export class DiatonicAltDegree {
    static I: DiatonicAltDegree;
    static bII: DiatonicAltDegree;
    static II: DiatonicAltDegree;
    static bIII: DiatonicAltDegree;
    static III: DiatonicAltDegree;
    static IV: DiatonicAltDegree;
    static bV: DiatonicAltDegree;
    static V: DiatonicAltDegree;
    static bVI: DiatonicAltDegree;
    static VI: DiatonicAltDegree;
    static bVII: DiatonicAltDegree;
    static VII: DiatonicAltDegree;

    private static _cache = new DiatonicAltDegreeCache(
        (hashingObject: HashingObjectType) => new DiatonicAltDegree(hashingObject.diatonicDegree, hashingObject.alts)
    );

    private constructor(private _diatonicDegree: DiatonicDegree, private _alts: number) {
    }

    static from(diatonicDegree: DiatonicDegree, alts: number): DiatonicAltDegree {
        alts = (<any>DiatonicAlt).fixAlts(alts);
        return this._cache.getOrCreate({ diatonicDegree: diatonicDegree, alts: alts });
    }

    static fromSemis(diatonicDegree: DiatonicDegree, semis: number): DiatonicAltDegree {
        let alts = semis - Scale.MAJOR.degrees[diatonicDegree.valueOf()].semis;
        return this.from(diatonicDegree, alts);
    }

    static toStringArray(degrees: DiatonicAltDegree[]): string {
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

    get semis(): number {
        let semis = Diatonic.fromInt(this.diatonicDegree.valueOf()).chromatic.valueOf() + this.alts;
        semis = rotativeTrim(semis, Chromatic.NUMBER);
        return semis;
    }

    get intervalDiatonicAlt(): IntervalDiatonicAlt {
        let semis = Diatonic.fromInt(this.diatonicDegree.valueOf()).chromatic.valueOf() + this.alts;
        let intervalDiatonic = IntervalDiatonic.from(this.diatonicDegree.valueOf());
        return IntervalDiatonicAlt.fromIntervals(semis, intervalDiatonic);
    }

    withAdd(interval: IntervalDiatonicAlt) {
        let semis = this.semis + interval.intervalChromatic;
        let diatonicDegreeInt = this.diatonicDegree.valueOf() + interval.intervalDiatonic.valueOf();
        let diatonicDegree = DiatonicDegree.fromInt(diatonicDegreeInt);
        let alts = semis - ScaleMajor[diatonicDegree.valueOf()];
        return DiatonicAltDegree.from(diatonicDegree, alts);
    }

    withSub(interval: IntervalDiatonicAlt) {
        let semis = this.semis - interval.intervalChromatic;
        let diatonicDegreeInt = this.diatonicDegree.valueOf() - interval.intervalDiatonic.valueOf();
        let diatonicDegree = DiatonicDegree.fromInt(diatonicDegreeInt);
        let alts = semis - ScaleMajor[diatonicDegree.valueOf()];
        return DiatonicAltDegree.from(diatonicDegree, alts);
    }

    hashCode(): string {
        return this._diatonicDegree.hashCode() + "a:" + this._alts;
    }

    valueOf(): number {
        return this.semis;
    }

    toString(): string {
        let alts = Settings.symbols.alts(this.alts);
        return alts + this.diatonicDegree.toString();
    }
}