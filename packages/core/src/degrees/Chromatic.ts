import { rotativeTrim } from '@datune/utils/MathUtils';
import { NamingChromatic } from '../lang/naming/NamingChromatic';
import { Settings } from '../settings/Settings';
import { Degree } from './Degree';

export class Chromatic implements Degree {
    static NUMBER = 12;

    // Precalc

    static C: Chromatic;
    static CC: Chromatic;
    static D: Chromatic;
    static DD: Chromatic;
    static E: Chromatic;
    static F: Chromatic;
    static FF: Chromatic;
    static G: Chromatic;
    static GG: Chromatic;
    static A: Chromatic;
    static AA: Chromatic;
    static B: Chromatic;

    private constructor(private _intValue: number) {
    }

    private static initializerConstructor(intValue: number): Chromatic {
        return new Chromatic(intValue);
    }

    static fromInt(intValue: number): Chromatic {
        intValue = rotativeTrim(intValue, Chromatic.NUMBER);
        switch (intValue) {
            case 0: return Chromatic.C;
            case 1: return Chromatic.CC;
            case 2: return Chromatic.D;
            case 3: return Chromatic.DD;
            case 4: return Chromatic.E;
            case 5: return Chromatic.F;
            case 6: return Chromatic.FF;
            case 7: return Chromatic.G;
            case 8: return Chromatic.GG;
            case 9: return Chromatic.A;
            case 10: return Chromatic.AA;
            case 11: return Chromatic.B;
        }
        throw new Error("Impossible get Chromatic from int value: " + intValue);
    }

    static fromString(strValue: string): Chromatic {
        strValue = this.normalizeInputString(strValue);

        switch (strValue) {
            case Chromatic.C.toString().toLowerCase(): return Chromatic.C;
            case Chromatic.CC.toString().toLowerCase(): return Chromatic.CC;
            case Chromatic.D.toString().toLowerCase(): return Chromatic.D;
            case Chromatic.DD.toString().toLowerCase(): return Chromatic.DD;
            case Chromatic.E.toString().toLowerCase(): return Chromatic.E;
            case Chromatic.F.toString().toLowerCase(): return Chromatic.F;
            case Chromatic.FF.toString().toLowerCase(): return Chromatic.FF;
            case Chromatic.G.toString().toLowerCase(): return Chromatic.G;
            case Chromatic.GG.toString().toLowerCase(): return Chromatic.GG;
            case Chromatic.A.toString().toLowerCase(): return Chromatic.A;
            case Chromatic.AA.toString().toLowerCase(): return Chromatic.AA;
            case Chromatic.B.toString().toLowerCase(): return Chromatic.B;
        }
        throw new Error("Impossible get Chromatic from string: " + strValue);
    }

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '')
            .replace("#", Settings.symbols.sharp)
            .replace("b", Settings.symbols.bemol)
            .toLowerCase();
        return strValue;
    }

    withShift(semis: number): Chromatic {
        let intValue = rotativeTrim(this.valueOf() + semis, Chromatic.NUMBER);
        return Chromatic.fromInt(intValue);
    }

    compareTo(chromatic: Chromatic): number {
        if (this._intValue < chromatic._intValue)
            return -1;
        else if (this._intValue > chromatic._intValue)
            return 1;
        else
            return 0;
    }

    private static _all: readonly Chromatic[];

    static all(): readonly Chromatic[] {
        return this._all;
    }

    toString() {
        return NamingChromatic.toString(this);
    }

    valueOf(): number {
        return this._intValue;
    }
}

export function getVarStringFrom(chromatic: Chromatic): string {
    switch (chromatic) {
        case Chromatic.C: return "C";
        case Chromatic.CC: return "CC";
        case Chromatic.D: return "D";
        case Chromatic.DD: return "DD";
        case Chromatic.E: return "E";
        case Chromatic.F: return "F";
        case Chromatic.FF: return "FF";
        case Chromatic.G: return "G";
        case Chromatic.GG: return "GG";
        case Chromatic.A: return "A";
        case Chromatic.AA: return "AA";
        case Chromatic.B: return "B";
    }
}