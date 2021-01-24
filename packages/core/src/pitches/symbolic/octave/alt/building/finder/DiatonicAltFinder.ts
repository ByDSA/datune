import { NonEmptyArray } from '@datune/utils';
import { Chromatic } from '../../../chromatic/Chromatic';
import { Diatonic, DiatonicArray } from '../../../diatonic/Diatonic';
import { DiatonicAlt } from '../../DiatonicAlt';


export class DiatonicAltFinder {
    private _maxSharps: number;
    private _maxFlats: number;
    private _note: Chromatic | undefined;
    private _diatonics: DiatonicArray | undefined;

    private constructor() {
        this._maxSharps = this._maxFlats = 2;
    }

    static create(): DiatonicAltFinder {
        return new DiatonicAltFinder();
    }

    setNote(c: Chromatic): DiatonicAltFinder {
        this._note = c;

        return this;
    }

    setDiatonics(...d: DiatonicArray): DiatonicAltFinder {
        this._diatonics = d;

        return this;
    }

    setMaxAlts(maxAlts: number): DiatonicAltFinder {
        this._maxFlats = maxAlts;
        this._maxSharps = maxAlts;
        return this;
    }

    setMaxSharps(maxSharps: number): DiatonicAltFinder {
        this._maxSharps = maxSharps;
        return this;
    }

    setMaxFlats(maxBemols: number): DiatonicAltFinder {
        this._maxFlats = maxBemols;
        return this;
    }

    find(): DiatonicAlt[] {
        if (this._note && this._diatonics && this._diatonics.length == 1) {
            const builder = DiatonicAlt.builder()
                .setNote(this._note)
                .setDiatonic(this._diatonics[0]);

            const diatonicAlt = builder.build();
            if (!diatonicAlt)
                return [];
            return [diatonicAlt];
        } else if (!this._note && this._diatonics && this._diatonics.length > 0 && this._validMaxAlts()) {
            let ret: DiatonicAlt[] = [];
            this._createDiatonicAltsFromDiatonicsAndMaxAltsIterator(
                diatonicAlt => ret.push(diatonicAlt)
            )
            return ret;
        } else if (this._note && this._validMaxAlts()) {
            let ret: DiatonicAlt[] = [];

            this._addAllDiatonicsIfEmpty();

            this._createDiatonicAltsFromDiatonicsAndMaxAltsIterator(
                (diatonicAlt: DiatonicAlt) => {
                    if (diatonicAlt.note == this._note)
                        ret.push(diatonicAlt);
                }
            )
            return ret;
        }

        return [];
    }

    private _addAllDiatonicsIfEmpty() {
        if (!this._diatonics)
            this._diatonics = <NonEmptyArray<Diatonic>>[...Diatonic.all];
    }

    private _createDiatonicAltsFromDiatonicsAndMaxAltsIterator(f: (dAlt: DiatonicAlt) => void) {
        if (!this._diatonics)
            return;
        for (let diatonic of this._diatonics)
            for (let alts = -this._maxFlats; alts <= this._maxSharps; alts++) {
                let diatonicAlt: DiatonicAlt = DiatonicAlt.from(diatonic, alts)
                f(diatonicAlt);
            }
    }

    private _validMaxAlts(): boolean {
        return this._maxFlats >= 0 && this._maxSharps >= 0;
    }
}