import { Arrays } from "@datune/utils";
import { fromDiatonicAlts as pitchFrom, Pitch as DiatonicAlt, toChromatic } from "pitches/alt";
import DiatonicAltBuilder from "pitches/alt/building/builders/DiatonicAltBuilder";
import { Pitch as Chromatic } from "pitches/chromatic";
import { ALL as D_ALL, Array as DiatonicArray, Pitch as Diatonic } from "pitches/diatonic";

export default class DiatonicAltFinder {
  private _maxSharps: number;

  private _maxFlats: number;

  private _note: Chromatic | undefined;

  private _diatonics: DiatonicArray | undefined;

  private constructor() {
    this._maxFlats = 2;
    this._maxSharps = this._maxFlats;
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
    if (this._note && this._diatonics && this._diatonics.length === 1) {
      const builder = DiatonicAltBuilder.create()
        .setNote(this._note)
        .setDiatonic(this._diatonics[0]);
      const diatonicAlt = builder.build();

      if (!diatonicAlt)
        return [];

      return [diatonicAlt];
    }

    if (!this._note && this._diatonics && this._diatonics.length > 0 && this._validMaxAlts()) {
      const ret: DiatonicAlt[] = [];

      this._createDiatonicAltsFromDiatonicsAndMaxAltsIterator(
        (diatonicAlt) => ret.push(diatonicAlt),
      );

      return ret;
    }

    if (this._note && this._validMaxAlts()) {
      const ret: DiatonicAlt[] = [];

      this._addAllDiatonicsIfEmpty();

      this._createDiatonicAltsFromDiatonicsAndMaxAltsIterator(
        (diatonicAlt: DiatonicAlt) => {
          if (toChromatic(diatonicAlt) === this._note)
            ret.push(diatonicAlt);
        },
      );

      return ret;
    }

    return [];
  }

  private _addAllDiatonicsIfEmpty() {
    if (!this._diatonics)
      this._diatonics = <Arrays.NonEmpty<Diatonic>>[...D_ALL];
  }

  private _createDiatonicAltsFromDiatonicsAndMaxAltsIterator(f: (dAlt: DiatonicAlt)=> void) {
    if (!this._diatonics)
      return;

    for (const diatonic of this._diatonics) {
      for (let alts = -this._maxFlats; alts <= this._maxSharps; alts++) {
        const diatonicAlt: DiatonicAlt = pitchFrom(diatonic, alts);

        f(diatonicAlt);
      }
    }
  }

  private _validMaxAlts(): boolean {
    return this._maxFlats >= 0 && this._maxSharps >= 0;
  }
}
