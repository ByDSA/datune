import { Chord } from "@datune/core/chords/octave/alt/Chord";
import { ChordArray } from "@datune/core/chords/octave/alt/Array";
import { ALL, ALL_NON_INVERSIONS } from "@datune/core/chords/octave/alt/constants";
import { KeyArray } from "@datune/core/keys/alt";
import { PitchArray, Pitch } from "@datune/core/pitches/alt";

export class Finder {
  // TODO: por qué no se usa?
  // eslint-disable-next-line no-unused-private-class-members
  #tonalities?: KeyArray;

  #notes?: PitchArray;

  #maxLength: number;

  #minLength: number;

  #notInversions: boolean;

  #bass?: Pitch;

  constructor() {
    this.#maxLength = 100;
    this.#minLength = 1;
    this.#notInversions = false;
  }

  key(...keys: KeyArray): Finder {
    this.#tonalities = keys;

    return this;
  }

  containsNote(...notes: PitchArray): Finder {
    this.#notes = notes;

    return this;
  }

  find(): Chord[] {
    let chords = this.#notInversions ? ALL_NON_INVERSIONS : ALL;

    if (this.#bass)
      chords = this.#filterBass(chords);

    chords = this.#filterContainsAndNote(chords);
    chords = this.#filterLength(chords);

    return chords;
  }

  notInversions(): Finder {
    this.#notInversions = true;

    return this;
  }

  maxChordLength(n: number): Finder {
    this.#maxLength = n;

    return this;
  }

  bass(r: Pitch): Finder {
    this.#bass = r;

    return this;
  }

  minChordLength(n: number): Finder {
    this.#minLength = n;

    return this;
  }

  #filterContainsAndNote(chords: ChordArray): ChordArray {
    if (!this.#notes)
      return chords;

    return chords.filter((c) => {
      for (const n of <PitchArray> this.#notes) {
        if (!c.has(n))
          return false;
      }

      return true;
    } ) as ChordArray;
  }

  #filterLength(chords: Chord[]): ChordArray {
    return chords.filter(
      (c) => c.length >= this.#minLength && c.length <= this.#maxLength,
    ) as ChordArray;
  }

  #filterBass(chords: Chord[]): ChordArray {
    return chords.filter((c) => c.pitches[0] === this.#bass) as ChordArray;
  }
}
