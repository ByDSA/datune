import type { Pitch } from "@datune/core/pitches/alt";
import type { Pitch as CPitch } from "@datune/core/pitches/chromatic";
import type { PitchArray as DPitchArray, Pitch as DPitch } from "@datune/core/pitches/diatonic";
import type { Arrays } from "@datune/utils";
import { fromDiatonicAlts as pitchFrom } from "@datune/core/pitches/alt/building/diatonicAlts";
import { toChromatic } from "@datune/core/pitches/alt/conversions";
import { DiatonicAltBuilder } from "@datune/core/pitches/alt/building/builders/DiatonicAltBuilder";
import { ALL as D_ALL } from "@datune/core/pitches/diatonic/constants";

export class DiatonicAltFinder {
  #maxSharps: number;

  #maxFlats: number;

  #note: CPitch | undefined;

  #diatonics: DPitchArray | undefined;

  private constructor() {
    this.#maxFlats = 2;
    this.#maxSharps = this.#maxFlats;
  }

  static create(): DiatonicAltFinder {
    return new DiatonicAltFinder();
  }

  setNote(c: CPitch): DiatonicAltFinder {
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
      const pitch = builder.build();

      if (!pitch)
        return [];

      return [pitch];
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
      this.#diatonics = <Arrays.NonEmpty<DPitch>>[...D_ALL];
  }

  #createDiatonicAltsFromDiatonicsAndMaxAltsIterator(f: (dAlt: Pitch)=> void) {
    if (!this.#diatonics)
      return;

    for (const diatonic of this.#diatonics) {
      for (let alts = -this.#maxFlats; alts <= this.#maxSharps; alts++) {
        const pitch: Pitch = pitchFrom(diatonic, alts);

        f(pitch);
      }
    }
  }

  #validMaxAlts(): boolean {
    return this.#maxFlats >= 0 && this.#maxSharps >= 0;
  }
}
