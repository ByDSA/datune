import { DiatonicAltArray } from '../../../../../../chords';
import { Chromatic } from '../../../chromatic/Chromatic';
import { Diatonic } from '../../../diatonic/Diatonic';
import { DiatonicAlt } from '../../DiatonicAlt';


export class DiatonicAltBuilder {
    private _note: Chromatic | undefined;
    private _diatonic: Diatonic | undefined;
    private _diatonicAltList: DiatonicAltArray | undefined;

    private constructor() {
    }

    static create(): DiatonicAltBuilder {
        return new DiatonicAltBuilder();
    }

    setNote(c: Chromatic): DiatonicAltBuilder {
        this._note = c;
        return this;
    }

    setDiatonic(d: Diatonic): DiatonicAltBuilder {
        this._diatonic = d;
        return this;
    }

    setNoteAltList(...l: DiatonicAltArray): DiatonicAltBuilder {
        this._diatonicAltList = l;
        return this;
    }

    build(): DiatonicAlt | null {
        if (!this._note)
            return null;

        if (!this._diatonic) {
            if (this._diatonicAltList)
                return DiatonicAltBuilder._getDiatonicAltInListFromNote(this._note, this._diatonicAltList);
            let diatonicAlt = DiatonicAltBuilder.getDiatonicAltFromNote(this._note);
            return diatonicAlt;
        }

        let alts = DiatonicAltBuilder.getAltsFromNoteAndDiatonic(this._note, this._diatonic);

        return DiatonicAlt.from(this._diatonic, alts);
    }

    private static _getDiatonicAltInListFromNote(chromatic: Chromatic, list: DiatonicAlt[]): DiatonicAlt | null {
        for (let diatonicAlt of list)
            if (diatonicAlt.note == chromatic)
                return diatonicAlt;

        return null;
    }

    private static getDiatonicAltFromNote(c: Chromatic): DiatonicAlt {
        switch (c) {
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

        throw new Error();
    }

    private static getAltsFromNoteAndDiatonic(chromatic: Chromatic, diatonic: Diatonic): number {
        let alts = chromatic.valueOf() - diatonic.chromatic.valueOf();
        alts = fixAlts(alts);

        return alts;
    }
}

export function fixAlts(alts: number): number {
    alts %= Chromatic.NUMBER;
    if (alts < -Chromatic.NUMBER / 2)
        alts += Chromatic.NUMBER;
    else if (alts > Chromatic.NUMBER / 2)
        alts -= Chromatic.NUMBER;

    return alts;
}