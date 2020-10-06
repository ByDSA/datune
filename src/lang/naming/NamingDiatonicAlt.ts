import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { Settings } from '../../settings/Settings';

export class NamingDiatonicAlt {
    private constructor() {
    }

    static toString(diatonicAlt: DiatonicAlt): string {
        return diatonicAlt.diatonic.toString() + Settings.symbols.alts(diatonicAlt.alts);
    }

    static get(str: string): DiatonicAlt {
        str = this.normalizeInputString(str);

        switch (str) {
            case DiatonicAlt.C.toString().toLowerCase(): return DiatonicAlt.C;
            case DiatonicAlt.CC.toString().toLowerCase(): return DiatonicAlt.CC;
            case DiatonicAlt.CCC.toString().toLowerCase(): return DiatonicAlt.CCC;
            case DiatonicAlt.Cb.toString().toLowerCase(): return DiatonicAlt.Cb;
            case DiatonicAlt.Cbb.toString().toLowerCase(): return DiatonicAlt.Cbb;
            case DiatonicAlt.D.toString().toLowerCase(): return DiatonicAlt.D;
            case DiatonicAlt.DD.toString().toLowerCase(): return DiatonicAlt.DD;
            case DiatonicAlt.DDD.toString().toLowerCase(): return DiatonicAlt.DDD;
            case DiatonicAlt.Db.toString().toLowerCase(): return DiatonicAlt.Db;
            case DiatonicAlt.Dbb.toString().toLowerCase(): return DiatonicAlt.Dbb;
            case DiatonicAlt.E.toString().toLowerCase(): return DiatonicAlt.E;
            case DiatonicAlt.EE.toString().toLowerCase(): return DiatonicAlt.EE;
            case DiatonicAlt.EEE.toString().toLowerCase(): return DiatonicAlt.EEE;
            case DiatonicAlt.Eb.toString().toLowerCase(): return DiatonicAlt.Eb;
            case DiatonicAlt.Ebb.toString().toLowerCase(): return DiatonicAlt.Ebb;
            case DiatonicAlt.F.toString().toLowerCase(): return DiatonicAlt.F;
            case DiatonicAlt.FF.toString().toLowerCase(): return DiatonicAlt.FF;
            case DiatonicAlt.FFF.toString().toLowerCase(): return DiatonicAlt.FFF;
            case DiatonicAlt.Fb.toString().toLowerCase(): return DiatonicAlt.Fb;
            case DiatonicAlt.Fbb.toString().toLowerCase(): return DiatonicAlt.Fbb;
            case DiatonicAlt.G.toString().toLowerCase(): return DiatonicAlt.G;
            case DiatonicAlt.GG.toString().toLowerCase(): return DiatonicAlt.GG;
            case DiatonicAlt.GGG.toString().toLowerCase(): return DiatonicAlt.GGG;
            case DiatonicAlt.Gb.toString().toLowerCase(): return DiatonicAlt.Gb;
            case DiatonicAlt.Gbb.toString().toLowerCase(): return DiatonicAlt.Gbb;
            case DiatonicAlt.A.toString().toLowerCase(): return DiatonicAlt.A;
            case DiatonicAlt.AA.toString().toLowerCase(): return DiatonicAlt.AA;
            case DiatonicAlt.AAA.toString().toLowerCase(): return DiatonicAlt.AAA;
            case DiatonicAlt.Ab.toString().toLowerCase(): return DiatonicAlt.Ab;
            case DiatonicAlt.Abb.toString().toLowerCase(): return DiatonicAlt.Abb;
            case DiatonicAlt.B.toString().toLowerCase(): return DiatonicAlt.B;
            case DiatonicAlt.BB.toString().toLowerCase(): return DiatonicAlt.BB;
            case DiatonicAlt.BBB.toString().toLowerCase(): return DiatonicAlt.BBB;
            case DiatonicAlt.Bb.toString().toLowerCase(): return DiatonicAlt.Bb;
            case DiatonicAlt.Bbb.toString().toLowerCase(): return DiatonicAlt.Bbb;
        }
        throw new Error("Can't convert '" + str + "' to DiatonicAlt.");
    }

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '')
            .replace(/#/g, Settings.symbols.sharp)
            .replace(/(.)(b)/g, "$1" + Settings.symbols.bemol)
            .toLowerCase();

        while (strValue.match(Settings.symbols.bemol + "b")) {
            strValue = strValue.replace(Settings.symbols.bemol + "b", Settings.symbols.bemol + Settings.symbols.bemol);
        }

        return strValue;
    }
}