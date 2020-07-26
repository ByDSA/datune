import { Immutables } from '../common/Immutables';
import { PrecalcCache } from '../common/PrecalcCache';
import { IntervalDiatonicAlt } from '../interval/IntervalDiatonicAlt';
import { NamingDiatonicAlt } from '../lang/naming/NamingDiatonicAlt';
import { Chromatic } from './Chromatic';
import { Degree } from './Degree';
import { Diatonic } from './Diatonic';

type HashingObjectType = { diatonic: Diatonic, alts: number };
export class DiatonicAlt implements Degree {
    // Precalc

    public static C: DiatonicAlt;
    public static CC: DiatonicAlt;
    public static CCC: DiatonicAlt;
    public static Cb: DiatonicAlt;
    public static Cbb: DiatonicAlt;

    public static D: DiatonicAlt;
    public static DD: DiatonicAlt;
    public static DDD: DiatonicAlt;
    public static Db: DiatonicAlt;
    public static Dbb: DiatonicAlt;

    public static E: DiatonicAlt;
    public static EE: DiatonicAlt;
    public static EEE: DiatonicAlt;
    public static Eb: DiatonicAlt;
    public static Ebb: DiatonicAlt;

    public static F: DiatonicAlt;
    public static FF: DiatonicAlt;
    public static FFF: DiatonicAlt;
    public static Fb: DiatonicAlt;
    public static Fbb: DiatonicAlt;

    public static G: DiatonicAlt;
    public static GG: DiatonicAlt;
    public static GGG: DiatonicAlt;
    public static Gb: DiatonicAlt;
    public static Gbb: DiatonicAlt;

    public static A: DiatonicAlt;
    public static AA: DiatonicAlt;
    public static AAA: DiatonicAlt;
    public static Ab: DiatonicAlt;
    public static Abb: DiatonicAlt;

    public static B: DiatonicAlt;
    public static BB: DiatonicAlt;
    public static BBB: DiatonicAlt;
    public static Bb: DiatonicAlt;
    public static Bbb: DiatonicAlt;

    private static immutablesCache = new PrecalcCache<DiatonicAlt, HashingObjectType>(
        function (hashingObject: HashingObjectType) {
            return hashingObject.diatonic.valueOf() + ":" + hashingObject.alts;
        },
        function (diatonicAlt: DiatonicAlt): HashingObjectType {
            return { diatonic: diatonicAlt.diatonic, alts: diatonicAlt.alts };
        },
        function (hashingObject: HashingObjectType): DiatonicAlt {
            return new DiatonicAlt(hashingObject.diatonic, hashingObject.alts);
        }
    );

    public static from(diatonic: Diatonic, alts: number): DiatonicAlt {
        return DiatonicAlt.immutablesCache.getOrCreate({ diatonic: diatonic, alts: alts });
    }

    public static fromString(str: string): DiatonicAlt {
        return NamingDiatonicAlt.get(str);
    }

    public static fromChromatic(chromatic: Chromatic, diatonic?: Diatonic): DiatonicAlt {
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
        let alts = chromatic.intValue - diatonic.chromatic.intValue;
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
    }

    getAdd(intervalDiatonicAlt: IntervalDiatonicAlt) {
        let diatonic: Diatonic = this.diatonic.getAdd(intervalDiatonicAlt.intervalDiatonic);
        let chromatic: Chromatic = this.chromatic.getShift(intervalDiatonicAlt.intervalChromatic);
        return DiatonicAlt.fromChromatic(chromatic, diatonic);
    }

    getSub(intervalDiatonicAlt: IntervalDiatonicAlt) {
        let diatonic: Diatonic = this.diatonic.getSub(intervalDiatonicAlt.intervalDiatonic);
        let chromatic: Chromatic = this.chromatic.getShift(-intervalDiatonicAlt.intervalChromatic);
        return DiatonicAlt.fromChromatic(chromatic, diatonic);
    }

    get chromatic(): Chromatic {
        let chromaticInt = this.diatonic.chromatic.intValue;
        chromaticInt += this.alts;

        return Chromatic.fromInt(chromaticInt);
    }

    public get diatonic(): Diatonic {
        return this._diatonic;
    }

    public get alts(): number {
        return this._alts;
    }

    public toString(): string {
        return NamingDiatonicAlt.toString(this);
    }

    valueOf(): number {
        return this.diatonic.intValue * 197 + this.alts * 199;
    }

    private static initialize() {
        DiatonicAlt.C = DiatonicAlt.from(Diatonic.C, 0);
        DiatonicAlt.CC = DiatonicAlt.from(Diatonic.C, 1);
        DiatonicAlt.CCC = DiatonicAlt.from(Diatonic.C, 2);
        DiatonicAlt.Cb = DiatonicAlt.from(Diatonic.C, -1);
        DiatonicAlt.Cbb = DiatonicAlt.from(Diatonic.C, -2);

        DiatonicAlt.D = DiatonicAlt.from(Diatonic.D, 0);
        DiatonicAlt.DD = DiatonicAlt.from(Diatonic.D, 1);
        DiatonicAlt.DDD = DiatonicAlt.from(Diatonic.D, 2);
        DiatonicAlt.Db = DiatonicAlt.from(Diatonic.D, -1);
        DiatonicAlt.Dbb = DiatonicAlt.from(Diatonic.D, -2);

        DiatonicAlt.E = DiatonicAlt.from(Diatonic.E, 0);
        DiatonicAlt.EE = DiatonicAlt.from(Diatonic.E, 1);
        DiatonicAlt.EEE = DiatonicAlt.from(Diatonic.E, 2);
        DiatonicAlt.Eb = DiatonicAlt.from(Diatonic.E, -1);
        DiatonicAlt.Ebb = DiatonicAlt.from(Diatonic.E, -2);

        DiatonicAlt.F = DiatonicAlt.from(Diatonic.F, 0);
        DiatonicAlt.FF = DiatonicAlt.from(Diatonic.F, 1);
        DiatonicAlt.FFF = DiatonicAlt.from(Diatonic.F, 2);
        DiatonicAlt.Fb = DiatonicAlt.from(Diatonic.F, -1);
        DiatonicAlt.Fbb = DiatonicAlt.from(Diatonic.F, -2);

        DiatonicAlt.G = DiatonicAlt.from(Diatonic.G, 0);
        DiatonicAlt.GG = DiatonicAlt.from(Diatonic.G, 1);
        DiatonicAlt.GGG = DiatonicAlt.from(Diatonic.G, 2);
        DiatonicAlt.Gb = DiatonicAlt.from(Diatonic.G, -1);
        DiatonicAlt.Gbb = DiatonicAlt.from(Diatonic.G, -2);

        DiatonicAlt.A = DiatonicAlt.from(Diatonic.A, 0);
        DiatonicAlt.AA = DiatonicAlt.from(Diatonic.A, 1);
        DiatonicAlt.AAA = DiatonicAlt.from(Diatonic.A, 2);
        DiatonicAlt.Ab = DiatonicAlt.from(Diatonic.A, -1);
        DiatonicAlt.Abb = DiatonicAlt.from(Diatonic.A, -2);

        DiatonicAlt.B = DiatonicAlt.from(Diatonic.B, 0);
        DiatonicAlt.BB = DiatonicAlt.from(Diatonic.B, 1);
        DiatonicAlt.BBB = DiatonicAlt.from(Diatonic.B, 2);
        DiatonicAlt.Bb = DiatonicAlt.from(Diatonic.B, -1);
        DiatonicAlt.Bbb = DiatonicAlt.from(Diatonic.B, -2);

        Immutables.lockrIf(DiatonicAlt, (obj) => !(obj instanceof PrecalcCache));
    }
}