import { Chromatic } from './Chromatic';
import { DiatonicAlt } from './DiatonicAlt';
import { Diatonic } from './Diatonic';

/** @internal */
export class DiatonicAltBuilder {
    private _chromatic: Chromatic;
    private _diatonic: Diatonic;
    private _diatonicAltList: DiatonicAlt[];

    private constructor() {
    }

    static create(): DiatonicAltBuilder {
        return new DiatonicAltBuilder();
    }

    setChromatic(c: Chromatic): DiatonicAltBuilder {
        this._chromatic = c;
        return this;
    }

    setDiatonic(d: Diatonic): DiatonicAltBuilder {
        this._diatonic = d;
        return this;
    }

    setDiatonicAltList(l: DiatonicAlt[]): DiatonicAltBuilder {
        this._diatonicAltList = l;
        return this;
    }

    build(): DiatonicAlt | undefined {
        if (!this._diatonic) {
            if (this._diatonicAltList)
                return DiatonicAltBuilder._getDiatonicAltInListFromChromatic(this._chromatic, this._diatonicAltList);
            let diatonicAlt = DiatonicAltBuilder.getDiatonicAltFromChromatic(this._chromatic);
            return diatonicAlt;
        }

        let alts = DiatonicAltBuilder.getAltsFromChromaticAndDiatonic(this._chromatic, this._diatonic);

        return DiatonicAlt.from(this._diatonic, alts);
    }

    private static _getDiatonicAltInListFromChromatic(chromatic: Chromatic, list: DiatonicAlt[]): DiatonicAlt | undefined {
        for (let diatonicAlt of list)
            if (diatonicAlt.chromatic == chromatic)
                return diatonicAlt;

        return undefined;
    }

    private static getDiatonicAltFromChromatic(c: Chromatic): DiatonicAlt {
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
    }

    private static getAltsFromChromaticAndDiatonic(chromatic: Chromatic, diatonic: Diatonic): number {
        let alts = chromatic.valueOf() - diatonic.chromatic.valueOf();
        alts = fixAlts(alts);

        return alts;
    }
}

/** @internal */
export function fixAlts(alts: number): number {
    alts %= Chromatic.NUMBER;
    if (alts < -Chromatic.NUMBER / 2)
        alts += Chromatic.NUMBER;
    else if (alts > Chromatic.NUMBER / 2)
        alts -= Chromatic.NUMBER;

    return alts;
}