/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import type { Arrays } from "@datune/utils";
import type { SPNArray } from "@datune/core/spns/chromatic";
import type { VoicingArray as ChromaticVoicingArray, Voicing as ChromaticVoicing } from "@datune/core/voicings/chromatic";
import { add } from "@datune/core/spns/symbolic/chromatic/modifiers";

export type IntraVoicing = { notesIndex: Arrays.Number;
voicing: ChromaticVoicing; };

export class IntraVoicingsFinder {
  #notes: SPNArray | undefined;

  #voicings: ChromaticVoicingArray | undefined;

  private constructor() {
  }

  static create(): IntraVoicingsFinder {
    return new IntraVoicingsFinder();
  }

  notes(...notes: SPNArray): IntraVoicingsFinder {
    this.#notes = notes;

    return this;
  }

  referenceVoicings(...voicings: ChromaticVoicingArray): IntraVoicingsFinder {
    this.#voicings = voicings;

    return this;
  }

  find(): IntraVoicing[] {
    if (!this.#notes || !this.#voicings)
      throw new Error();

    const intraVoicings: IntraVoicing[] = [];

    for (const voicing of this.#voicings) {
      spnFor: for (const spn of this.#notes) {
        const notesIndex = [];

        for (const interval of voicing) {
          const shiftedNote = add(spn, interval);

          if (!shiftedNote)
            continue;

          const index = this.#notes.indexOf(shiftedNote);

          if (index < 0)
            continue spnFor;

          notesIndex.push(index);
        }

        intraVoicings.push( {
          notesIndex: <Arrays.Number>notesIndex,
          voicing,
        } );
      }
    }

    return intraVoicings;
  }
}
