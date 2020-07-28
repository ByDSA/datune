import { rotativeTrim } from '../../common/MathUtils';
import { PrecalcCache } from '../../common/PrecalcCache';
import { Chromatic } from '../../degrees/Chromatic';
import { Diatonic } from '../../degrees/Diatonic';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { IntervalDiatonic } from '../../interval/IntervalDiatonic';
import { IntervalDiatonicAlt } from '../../interval/IntervalDiatonicAlt';
import { Settings } from '../../settings/Settings';
import { Scale } from '../../tonality/Scale';
import { DiatonicDegree } from './DiatonicDegree';

const ScaleMajor = [0, 2, 4, 5, 7, 9, 11];
type HashingObjectType = { diatonicDegree: DiatonicDegree, alts: number };
export class DiatonicAltDegree {
    public static I: DiatonicAltDegree;
    public static bII: DiatonicAltDegree;
    public static II: DiatonicAltDegree;
    public static bIII: DiatonicAltDegree;
    public static III: DiatonicAltDegree;
    public static IV: DiatonicAltDegree;
    public static bV: DiatonicAltDegree;
    public static V: DiatonicAltDegree;
    public static bVI: DiatonicAltDegree;
    public static VI: DiatonicAltDegree;
    public static bVII: DiatonicAltDegree;
    public static VII: DiatonicAltDegree;

    private static _cache = new (class Cache extends PrecalcCache<DiatonicAltDegree, HashingObjectType>{
        getHash(hashingObject: HashingObjectType): string {
            return hashingObject.diatonicDegree.hashCode() + "a:" + hashingObject.alts;
        }

        getHashingObject(diatonicAltDegree: DiatonicAltDegree): HashingObjectType {
            return { diatonicDegree: diatonicAltDegree.diatonicDegree, alts: diatonicAltDegree.alts };
        }

        create(hashingObject: HashingObjectType): DiatonicAltDegree {
            return new DiatonicAltDegree(hashingObject.diatonicDegree, hashingObject.alts);
        }
    });

    private constructor(private _diatonicDegree: DiatonicDegree, private _alts: number) {
    }
    valueOf(): number {
        return this.semis;
    }

    public static from(diatonicDegree: DiatonicDegree, alts: number): DiatonicAltDegree {
        alts = (<any>DiatonicAlt).fixAlts(alts);
        return this._cache.getOrCreate({ diatonicDegree: diatonicDegree, alts: alts });
    }

    public static fromSemis(diatonicDegree: DiatonicDegree, semis: number): DiatonicAltDegree {
        let alts = semis - Scale.MAJOR.degrees[diatonicDegree.intValue].semis;
        return this.from(diatonicDegree, alts);
    }

    public get diatonicDegree(): DiatonicDegree {
        return this._diatonicDegree;
    }

    public get alts(): number {
        return this._alts;
    }

    public get semis(): number {
        let semis = Diatonic.fromInt(this.diatonicDegree.intValue).chromatic.intValue + this.alts;
        semis = rotativeTrim(semis, Chromatic.NUMBER);
        return semis;
    }

    public get intervalDiatonicAlt(): IntervalDiatonicAlt {
        let semis = Diatonic.fromInt(this.diatonicDegree.intValue).chromatic.intValue + this.alts;
        let intervalDiatonic = IntervalDiatonic.from(this.diatonicDegree.intValue);
        return IntervalDiatonicAlt.fromIntervals(semis, intervalDiatonic);
    }

    getAdd(interval: IntervalDiatonicAlt) {
        let semis = this.semis + interval.intervalChromatic;
        let diatonicDegreeInt = this.diatonicDegree.intValue + interval.intervalDiatonic.intValue;
        let diatonicDegree = DiatonicDegree.fromInt(diatonicDegreeInt);
        let alts = semis - ScaleMajor[diatonicDegree.intValue];
        return DiatonicAltDegree.from(diatonicDegree, alts);
    }

    getSub(interval: IntervalDiatonicAlt) {
        let semis = this.semis - interval.intervalChromatic;
        let diatonicDegreeInt = this.diatonicDegree.intValue - interval.intervalDiatonic.intValue;
        let diatonicDegree = DiatonicDegree.fromInt(diatonicDegreeInt);
        let alts = semis - ScaleMajor[diatonicDegree.intValue];
        return DiatonicAltDegree.from(diatonicDegree, alts);
    }

    public hashCode(): string {
        return this._diatonicDegree.hashCode() + "a:" + this._alts;
    }

    public toString(): string {
        let alts = Settings.symbols.alts(this.alts);
        return alts + this.diatonicDegree;
    }

    public static toStringArray(degrees: DiatonicAltDegree[]): string {
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

    private static initialize() {
        DiatonicAltDegree.I = DiatonicAltDegree.from(DiatonicDegree.I, 0);
        DiatonicAltDegree.bII = DiatonicAltDegree.from(DiatonicDegree.II, -1);
        DiatonicAltDegree.II = DiatonicAltDegree.from(DiatonicDegree.II, 0);
        DiatonicAltDegree.bIII = DiatonicAltDegree.from(DiatonicDegree.III, -1);
        DiatonicAltDegree.III = DiatonicAltDegree.from(DiatonicDegree.III, 0);
        DiatonicAltDegree.IV = DiatonicAltDegree.from(DiatonicDegree.IV, 0);
        DiatonicAltDegree.bV = DiatonicAltDegree.from(DiatonicDegree.V, -1);
        DiatonicAltDegree.V = DiatonicAltDegree.from(DiatonicDegree.V, 0);
        DiatonicAltDegree.bVI = DiatonicAltDegree.from(DiatonicDegree.VI, -1);
        DiatonicAltDegree.VI = DiatonicAltDegree.from(DiatonicDegree.VI, 0);
        DiatonicAltDegree.bVII = DiatonicAltDegree.from(DiatonicDegree.VII, -1);
        DiatonicAltDegree.VII = DiatonicAltDegree.from(DiatonicDegree.VII, 0);
    }
}