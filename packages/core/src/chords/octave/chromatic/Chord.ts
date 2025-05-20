/* eslint-disable import/no-cycle */
import type { Key } from "./caching/cache";
import type { PitchArray, Pitch } from "pitches/chromatic";
import type { Interval, Voicing } from "chromatic";
import type { Chord as AChord } from "chords/alt";
import { deepFreeze } from "datils/datatypes/objects";
import { Voicings as V } from "voicings/relative/chromatic";
import { Chords as AC } from "chords/alt";
import { SymbolicChord } from "../SymbolicChord";
import { Chords as C } from ".";

export class Chord implements SymbolicChord<Pitch> {
  pitches: PitchArray;

  length: number;

  #root?: Pitch;

  rootIndex: number;

  private constructor(key: Key) {
    this.pitches = key.pitches;
    this.rootIndex = key.rootIndex;

    this.length = this.pitches.length;

    deepFreeze(this);
  }

  // eslint-disable-next-line accessor-pairs
  get root() {
    if (this.#root === undefined)
      this.#root = this.pitches[this.rootIndex];

    return this.#root;
  }

  has(pitch: Pitch): boolean {
    return this.pitches.includes(pitch);
  }

  hasAll(...pitches: PitchArray): boolean {
    for (const c of pitches) {
      if (!this.pitches.includes(c))
        return false;
    }

    return true;
  }

  hasAny(...pitches: PitchArray): boolean {
    for (const c of pitches) {
      if (this.pitches.includes(c))
        return true;
    }

    return false;
  }

  withShift(interval: Interval): Chord {
    return C.shift(this, interval);
  }

  withShiftDown(interval: Interval): Chord {
    return C.shiftDown(this, interval);
  }

  withInv(n: number = 1): Chord {
    return C.inv(this, n);
  }

  withBass(pitch: Pitch): Chord {
    return C.bass(this, pitch);
  }

  withRootIndex(index: number) {
    return C.rootIndex(this, index);
  }

  toVoicing(): Voicing {
    return V.fromChord(this);
  }

  toAlt(): AChord {
    return AC.fromChromaticChord(this);
  }

  toString(): string {
    return `${this.pitches.join("-")} (rootIndex=${this.rootIndex})`;
  }
}
