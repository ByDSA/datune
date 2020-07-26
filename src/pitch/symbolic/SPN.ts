import { PrecalcCache } from '../../common/PrecalcCache';
import { Chromatic } from '../../degrees/Chromatic';
import { SymbolicPitch } from './SymbolicPitch';

type HashingObject = { chromatic: Chromatic, octave: number };
export class SPN implements SymbolicPitch {
    public static C_S1;
    public static CC_S1;
    public static D_S1;
    public static DD_S1;
    public static E_S1;
    public static F_S1;
    public static FF_S1;
    public static G_S1;
    public static GG_S1;
    public static A_S1;
    public static AA_S1;
    public static B_S1;
    public static C0;
    public static CC0;
    public static D0;
    public static DD0;
    public static E0;
    public static F0;
    public static FF0;
    public static G0;
    public static GG0;
    public static A0;
    public static AA0;
    public static B0;
    public static C1;
    public static CC1;
    public static D1;
    public static DD1;
    public static E1;
    public static F1;
    public static FF1;
    public static G1;
    public static GG1;
    public static A1;
    public static AA1;
    public static B1;
    public static C2;
    public static CC2;
    public static D2;
    public static DD2;
    public static E2;
    public static F2;
    public static FF2;
    public static G2;
    public static GG2;
    public static A2;
    public static AA2;
    public static B2;
    public static C3;
    public static CC3;
    public static D3;
    public static DD3;
    public static E3;
    public static F3;
    public static FF3;
    public static G3;
    public static GG3;
    public static A3;
    public static AA3;
    public static B3;
    public static C4;
    public static CC4;
    public static D4;
    public static DD4;
    public static E4;
    public static F4;
    public static FF4;
    public static G4;
    public static GG4;
    public static A4;
    public static AA4;
    public static B4;
    public static C5;
    public static CC5;
    public static D5;
    public static DD5;
    public static E5;
    public static F5;
    public static FF5;
    public static G5;
    public static GG5;
    public static A5;
    public static AA5;
    public static B5;
    public static C6;
    public static CC6;
    public static D6;
    public static DD6;
    public static E6;
    public static F6;
    public static FF6;
    public static G6;
    public static GG6;
    public static A6;
    public static AA6;
    public static B6;
    public static C7;
    public static CC7;
    public static D7;
    public static DD7;
    public static E7;
    public static F7;
    public static FF7;
    public static G7;
    public static GG7;
    public static A7;
    public static AA7;
    public static B7;
    public static C8;
    public static CC8;
    public static D8;
    public static DD8;
    public static E8;
    public static F8;
    public static FF8;
    public static G8;
    public static GG8;
    public static A8;
    public static AA8;
    public static B8;
    public static C9;
    public static CC9;
    public static D9;
    public static DD9;
    public static E9;
    public static F9;
    public static FF9;
    public static G9;
    public static GG9;
    public static A9;
    public static AA9;
    public static B9;

    private static immutablesCache = new PrecalcCache<SPN, HashingObject>(
        function (hashingObject: HashingObject): number {
            return hashingObject.chromatic.valueOf() + hashingObject.octave * Chromatic.NUMBER;
        },
        function (spn: SPN): HashingObject {
            return { chromatic: spn.chromatic, octave: spn.octave };
        },
        function (hashingObject: HashingObject): SPN {
            return new SPN(hashingObject.chromatic, hashingObject.octave);
        }
    );

    private constructor(private _chromatic: Chromatic, private _octave: number) {
    }

    public static from(chromatic: Chromatic, octave: number) {
        return this.immutablesCache.getOrCreate({ chromatic: chromatic, octave: octave });
    }

    public get chromatic(): Chromatic {
        return this._chromatic;
    }

    public get degree(): Chromatic {
        return this.chromatic;
    }

    public get octave(): number {
        return this._octave;
    }

    public toString() {
        return this.chromatic.toString() + this.octave;
    }

    public valueOf(): number {
        return this.chromatic.valueOf() + this.octave * Chromatic.NUMBER;
    }

    public get next(): SPN {
        let chromatic = this.chromatic.getShift(1);
        let octave = this.octave;
        if (chromatic.compareTo(this._chromatic) < 0)
            octave++;

        return SPN.from(chromatic, octave);
    }

    public get previous(): SPN {
        let chromatic = this.chromatic.getShift(-1);
        let octave = this.octave;
        if (chromatic.compareTo(this._chromatic) > 0)
            octave--;

        return SPN.from(chromatic, octave);
    }

    private static initialize() {
        for (let octave of [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            for (const chromatic of Chromatic.all) {
                let chromaticStr = (<any>chromatic).varStr;
                let octaveStr;
                if (octave >= 0)
                    octaveStr = octave;
                else
                    octaveStr = "_S" + (-octave);
                let varName = chromaticStr + octaveStr;
                this[varName] = SPN.from(chromatic, octave);
                Object.freeze(this[varName]);
            }
    }
}