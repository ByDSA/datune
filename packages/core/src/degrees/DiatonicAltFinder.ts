import { Chromatic } from './Chromatic';
import { Diatonic } from './Diatonic';
import { DiatonicAlt } from './DiatonicAlt';

/** @internal */
export class DiatonicAltFinder {
    private _maxSharps: number;
    private _maxBemols: number;
    private _chromatic: Chromatic;
    private _diatonics: Diatonic[];

    private constructor() {
        this._maxSharps = this._maxBemols = 2;
        this._diatonics = [];
    }

    static create(): DiatonicAltFinder {
        return new DiatonicAltFinder();
    }

    setChromatic(c: Chromatic): DiatonicAltFinder {
        this._chromatic = c;

        return this;
    }

    addDiatonic(d: Diatonic): DiatonicAltFinder {
        this._diatonics.push(d);

        return this;
    }

    setMaxAlts(maxAlts: number): DiatonicAltFinder {
        this._maxBemols = maxAlts;
        this._maxSharps = maxAlts;
        return this;
    }

    setMaxSharps(maxSharps: number): DiatonicAltFinder {
        this._maxSharps = maxSharps;
        return this;
    }

    setMaxBemols(maxBemols: number): DiatonicAltFinder {
        this._maxBemols = maxBemols;
        return this;
    }

    find(): DiatonicAlt[] {
        if (this._chromatic && this._diatonics.length == 1) {
            const builder = DiatonicAlt.builder()
                .setChromatic(this._chromatic)
                .setDiatonic(this._diatonics[0]);

            const diatonicAlt = builder.build();
            return [diatonicAlt];
        } else if (!this._chromatic && this._diatonics.length > 0 && this._validMaxAlts()) {
            let ret: DiatonicAlt[] = [];
            this._createDiatonicAltsFromDiatonicsAndMaxAltsIterator(
                diatonicAlt => ret.push(diatonicAlt)
            )
            return ret;
        } else if (this._chromatic && this._validMaxAlts()) {
            let ret: DiatonicAlt[] = [];

            this._addAllDiatonicsIfEmpty();

            this._createDiatonicAltsFromDiatonicsAndMaxAltsIterator(
                diatonicAlt => {
                    if (diatonicAlt.chromatic == this._chromatic)
                        ret.push(diatonicAlt);
                }
            )
            return ret;
        }

        return [];
    }

    private _addAllDiatonicsIfEmpty() {
        if (this._diatonics.length == 0)
            for (const d of Diatonic.all())
                this._diatonics.push(d);
    }

    private _createDiatonicAltsFromDiatonicsAndMaxAltsIterator(f: (DiatonicAlt) => void) {
        for (let diatonic of this._diatonics)
            for (let alts = -this._maxBemols; alts <= this._maxSharps; alts++) {
                let diatonicAlt: DiatonicAlt = DiatonicAlt.from(diatonic, alts)
                f(diatonicAlt);
            }
    }

    private _validMaxAlts(): boolean {
        return this._maxBemols >= 0 && this._maxSharps >= 0;
    }
}