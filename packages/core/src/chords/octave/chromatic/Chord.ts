/* eslint-disable import/no-cycle */
import type { Key } from "./caching/cache";
import type { PitchArray, Pitch } from "pitches/chromatic";
import type { Interval, Voicing } from "chromatic";
import type { Chord as AChord } from "chords/alt";
import { lockr } from "datils/datatypes";
import { Voicings as V } from "voicings/relative/chromatic";
import { fromInt } from "pitches/chromatic/building/int";
import { Chords as AC } from "chords/alt";
import { SymbolicChord } from "../SymbolicChord";
import { Chords as C } from ".";

export class Chord implements SymbolicChord<Pitch> {
  pitches: PitchArray;

  length: number;

  root: Pitch;

  private constructor(key: Key) {
    this.pitches = key.map(fromInt) as PitchArray;
    [this.root] = this.pitches;

    this.length = this.pitches.length;

    lockr(this);
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

  toAlt(): AChord {
    return AC.fromChromaticChord(this);
  }

  toString(): string {
    return `${this.pitches.join("-")}`;
  }
}
