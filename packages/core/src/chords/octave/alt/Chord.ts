import type { SymbolicChord } from "../SymbolicChord";
import type { Key } from "./caching/cache";
import type { PitchArray, Pitch } from "pitches/alt";
import type { Interval, Voicing } from "alt";
import type { Chord as CChord } from "chromatic";
import { deepFreeze } from "datils/datatypes/objects";
import { Chords as CC } from "chords/octave/chromatic";
import { Chords as C } from "chords/alt";
import { Voicings as V } from "voicings/alt";

export class Chord implements SymbolicChord<Pitch> {
  pitches: PitchArray;

  length: number;

  root: Pitch;

  private constructor(key: Key) {
    this.pitches = key;
    [this.root] = this.pitches;
    this.length = this.pitches.length;

    deepFreeze(this);
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

  toVoicing(): Voicing {
    return V.fromChord(this);
  }

  toChromatic(): CChord {
    return CC.fromAltChord(this);
  }

  toString(): string {
    return `${this.pitches.join("-")}`;
  }
}
