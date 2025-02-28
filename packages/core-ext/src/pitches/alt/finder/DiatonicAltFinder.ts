import { Arrays } from "@datune/utils";
import type { Pitch } from "@datune/core/pitches/alt";
import { fromDiatonicAlts as pitchFrom } from "@datune/core/pitches/alt/building/diatonicAlts";
import { toChromatic } from "@datune/core/pitches/alt/conversions";
import { DiatonicAltBuilder } from "@datune/core/pitches/alt/building/builders/DiatonicAltBuilder";
import { Pitch as Chromatic } from "@datune/core/pitches/chromatic";
import type { PitchArray as DPitchArray, Pitch as Diatonic } from "@datune/core/pitches/diatonic";
import { ALL as D_ALL } from "@datune/core/pitches/diatonic/constants";

export class DiatonicAltFinder {
  #maxSharps: number;

  #maxFlats: number;

  #note: Chromatic | undefined;

  #diatonics: DPitchArray | undefined;

  private constructor() {
    this.#maxFlats = 2;
    this.#maxSharps = this.#maxFlats;
  }

  static create(): DiatonicAltFinder {
    return new DiatonicAltFinder();
  }

  setNote(c: Chromatic): DiatonicAltFinder {
    this.#note = c;

    return this;
  }

  setDiatonics(...d: DPitchArray): DiatonicAltFinder {
    this.#diatonics = d;

    return this;
  }

  setMaxAlts(maxAlts: number): DiatonicAltFinder {
    this.#maxFlats = maxAlts;
    this.#maxSharps = maxAlts;

    return this;
  }

  setMaxSharps(maxSharps: number): DiatonicAltFinder {
    this.#maxSharps = maxSharps;

    return this;
  }

  setMaxFlats(maxBemols: number): DiatonicAltFinder {
    this.#maxFlats = maxBemols;

    return this;
  }

  find(): Pitch[] {
    if (this.#note && this.#diatonics && this.#diatonics.length === 1) {
      const builder = DiatonicAltBuilder.create()
        .setNote(this.#note)
        .setDiatonic(this.#diatonics[0]);
      const diatonicAlt = builder.build();

      if (!diatonicAlt)
        return [];

      return [diatonicAlt];
    }

    if (!this.#note && this.#diatonics && this.#diatonics.length > 0 && this.#validMaxAlts()) {
      const ret: Pitch[] = [];

      this.#createDiatonicAltsFromDiatonicsAndMaxAltsIterator(
        (diatonicAlt) => ret.push(diatonicAlt),
      );

      return ret;
    }

    if (this.#note && this.#validMaxAlts()) {
      const ret: Pitch[] = [];

      this.#addAllDiatonicsIfEmpty();

      this.#createDiatonicAltsFromDiatonicsAndMaxAltsIterator(
        (diatonicAlt: Pitch) => {
          if (toChromatic(diatonicAlt) === this.#note)
            ret.push(diatonicAlt);
        },
      );

      return ret;
    }

    return [];
  }

  #addAllDiatonicsIfEmpty() {
    if (!this.#diatonics)
      this.#diatonics = <Arrays.NonEmpty<Diatonic>>[...D_ALL];
  }

  #createDiatonicAltsFromDiatonicsAndMaxAltsIterator(f: (dAlt: Pitch)=> void) {
    if (!this.#diatonics)
      return;

    for (const diatonic of this.#diatonics) {
      for (let alts = -this.#maxFlats; alts <= this.#maxSharps; alts++) {
        const diatonicAlt: Pitch = pitchFrom(diatonic, alts);

        f(diatonicAlt);
      }
    }
  }

  #validMaxAlts(): boolean {
    return this.#maxFlats >= 0 && this.#maxSharps >= 0;
  }
}
