/* eslint-disable import/no-cycle */
import type { Key } from "./building/cache";
import type { Pitch } from "pitches/alt";
import type { Interval } from "intervals/alt";
import { deepFreeze } from "datils/datatypes/objects";
import { SymbolicSpn as ISpn } from "../SymbolicSpn";
import { Spns } from ".";

export class Spn implements ISpn<Interval, Pitch> {
  pitch: Pitch;

  octave: number;

  private constructor(key: Key) {
    this.pitch = key.pitch;
    this.octave = key.octave;
    deepFreeze(this);
  }

  valueOf(): number {
    return (+this.pitch * 197) + (this.octave * 199);
  }

  toString(): string {
    return `${this.pitch}${this.octave}`;
  }

  withShifted(interval: Interval): Spn | null {
    return Spns.shift(this, interval);
  }

  withShiftedDown(interval: Interval): Spn | null {
    return Spns.shiftDown(this, interval);
  }

  withOctave(octave: number): Spn | null {
    return Spns.fromPitchOctave(this.pitch, octave);
  }

  withPitch(pitch: Pitch): Spn | null {
    return Spns.fromPitchOctave(pitch, this.octave);
  }
}
