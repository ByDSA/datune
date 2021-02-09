import { mod } from '@datune/utils';
import { Settings } from '../../../../config';
import { DiatonicAlt } from '../alt/DiatonicAlt';
import { SymbolicDegree } from '../DegreeSymbolic';
import { NoteStaticNames } from './building/staticnames/ChromaticStaticNames';

export class Chromatic extends NoteStaticNames implements SymbolicDegree {
    // Building

    public constructor(private _intValue: number) {
        super();
    }

    private static _create(i: number): Chromatic {
        return new Chromatic(i);
    }

    static fromInt(intValue: number): Chromatic {
        intValue = mod(intValue, Chromatic.NUMBER);
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

        throw new Error();
    }

    static fromString(strValue: string): Chromatic | null {
        strValue = normalizeInputString(strValue);

        switch (strValue) {
            case normalizeNoteString(Chromatic.C.toString()): return Chromatic.C;
            case normalizeNoteString(Chromatic.CC.toString()): return Chromatic.CC;
            case normalizeNoteString(Chromatic.D.toString()): return Chromatic.D;
            case normalizeNoteString(Chromatic.DD.toString()): return Chromatic.DD;
            case normalizeNoteString(Chromatic.E.toString()): return Chromatic.E;
            case normalizeNoteString(Chromatic.F.toString()): return Chromatic.F;
            case normalizeNoteString(Chromatic.FF.toString()): return Chromatic.FF;
            case normalizeNoteString(Chromatic.G.toString()): return Chromatic.G;
            case normalizeNoteString(Chromatic.GG.toString()): return Chromatic.GG;
            case normalizeNoteString(Chromatic.A.toString()): return Chromatic.A;
            case normalizeNoteString(Chromatic.AA.toString()): return Chromatic.AA;
            case normalizeNoteString(Chromatic.B.toString()): return Chromatic.B;
        }

        return null;
    }

    // Immutable methods

    withShift(semis: number): Chromatic {
        let intValue = this.valueOf() + semis;
        return Chromatic.fromInt(intValue);
    }

    // Sortable methods

    compareTo(chromatic: Chromatic): number {
        if (this._intValue < chromatic._intValue)
            return -1;
        else if (this._intValue > chromatic._intValue)
            return 1;
        else
            return 0;
    }

    // Object methods

    toString() {
        let diatonicAlt = DiatonicAlt.fromNote(this)
        return diatonicAlt.toString();
    }

    valueOf(): number {
        return this._intValue;
    }
}

function normalizeInputString(strValue: string): string {
    strValue = strValue.replace(/ /g, '')
        .replace(Settings.symbols.sharp, "#")
        .replace(Settings.symbols.bemol, "b")
        .toLowerCase();
    return strValue;
}

function normalizeNoteString(strValue: string): string {
    strValue = strValue
        .replace(Settings.symbols.sharp, "#")
        .replace(Settings.symbols.bemol, "b")
        .toLowerCase();
    return strValue;
}