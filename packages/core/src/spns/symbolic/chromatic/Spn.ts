/* eslint-disable import/no-cycle */
import type { Key } from "./building/caching/key";
import type { Pitch } from "pitches/chromatic";
import type { Interval } from "intervals/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { SymbolicSpn as ISpn } from "../SymbolicSpn";
import { Spns } from ".";

export class Spn implements ISpn<Interval, Pitch> {
  pitch: Pitch;

  octave: number;

  private constructor(key: Key) {
    this.pitch = key.pitch;
    this.octave = key.octave;
  }

  valueOf(): number {
    return +this.pitch + (this.octave * P.NUMBER);
  }

  toString(): string {
    return `${this.pitch}${this.octave}`;
  }

  withShifted(interval: number): Spn | null {
    return Spns.shift(this, interval);
  }

  withShiftedDown(interval: number): Spn | null {
    return Spns.shiftDown(this, interval);
  }

  withOctave(octave: number): Spn | null {
    return Spns.fromPitchOctave(this.pitch, octave);
  }

  withPitch(pitch: Pitch): Spn | null {
    return Spns.fromPitchOctave(pitch, this.octave);
  }
}
