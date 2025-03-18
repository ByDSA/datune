import type { Key } from "./building/caching/key";
import type { Pitch } from "pitches/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { SymbolicSpn as ISpn } from "../SymbolicSpn";

export class Spn implements ISpn<Pitch> {
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
}
