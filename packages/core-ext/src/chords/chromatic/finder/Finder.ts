import { ALL, ALL_NON_INVERSIONS, Array as ChordArray, Chord } from "chords/chromatic";
import { Array as KeyArray } from "keys/chromatic";
import { Array as PitchArray, Pitch } from "pitches/chromatic";

export default class Finder {
  private _tonalities?: KeyArray;

  private _notes?: PitchArray;

  private _maxLength: number;

  private _minLength: number;

  private _notInversions: boolean;

  private _bass?: Pitch;

  constructor() {
    this._maxLength = 100;
    this._minLength = 1;
    this._notInversions = false;
  }

  key(...keys: KeyArray): Finder {
    this._tonalities = keys;

    return this;
  }

  containsNote(...notes: PitchArray): Finder {
    this._notes = notes;

    return this;
  }

  find(): Chord[] {
    let chords = this._notInversions ? ALL_NON_INVERSIONS : ALL;

    if (this._bass)
      chords = this._filterBass(chords);

    chords = this._filterContainsAndNote(chords);
    chords = this._filterLength(chords);

    return chords;
  }

  notInversions(): Finder {
    this._notInversions = true;

    return this;
  }

  maxChordLength(n: number): Finder {
    this._maxLength = n;

    return this;
  }

  bass(r: Pitch): Finder {
    this._bass = r;

    return this;
  }

  minChordLength(n: number): Finder {
    this._minLength = n;

    return this;
  }

  private _filterContainsAndNote(chords: ChordArray): ChordArray {
    if (!this._notes)
      return chords;

    return chords.filter((c) => {
      for (const n of <PitchArray> this._notes) {
        if (!c.has(n))
          return false;
      }

      return true;
    } ) as ChordArray;
  }

  private _filterLength(chords: Chord[]): ChordArray {
    return chords.filter(
      (c) => c.length >= this._minLength && c.length <= this._maxLength,
    ) as ChordArray;
  }

  private _filterBass(chords: Chord[]): ChordArray {
    return chords.filter((c) => c.pitches[0] === this._bass) as ChordArray;
  }
}
