/* eslint-disable no-continue */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Arrays } from "@datune/utils";
import { add, Array as SPNArray } from "spns/chromatic";
import { Array as ChromaticVoicingArray, Voicing as ChromaticVoicing } from "voicings/chromatic";

export type IntraVoicing = { notesIndex: Arrays.Number; voicing: ChromaticVoicing };

export class IntraVoicingsFinder {
  private _notes: SPNArray | undefined;

  private _voicings: ChromaticVoicingArray | undefined;

  private constructor() {
  }

  static create(): IntraVoicingsFinder {
    return new IntraVoicingsFinder();
  }

  notes(...notes: SPNArray): IntraVoicingsFinder {
    this._notes = notes;

    return this;
  }

  referenceVoicings(...voicings: ChromaticVoicingArray): IntraVoicingsFinder {
    this._voicings = voicings;

    return this;
  }

  find(): IntraVoicing[] {
    if (!this._notes || !this._voicings)
      throw new Error();

    const intraVoicings: IntraVoicing[] = [];

    for (const voicing of this._voicings) {
      spnFor: for (const spn of this._notes) {
        const notesIndex = [];

        for (const interval of voicing) {
          const shiftedNote = add(spn, interval);

          if (!shiftedNote)
            continue;

          const index = this._notes.indexOf(shiftedNote);

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
