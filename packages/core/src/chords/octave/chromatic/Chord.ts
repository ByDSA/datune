import type { Dto } from "./caching/Dto";
import { lockr } from "@datune/utils/immutables";
import { PitchArray, Pitches, Pitch } from "pitches/chromatic";
import { SymbolicChord } from "../SymbolicChord";

export class Chord implements SymbolicChord<Pitch> {
  pitches: PitchArray;

  length: number;

  root: Pitch;

  private constructor(dto: Dto) {
    this.pitches = dto.map(Pitches.fromInt) as PitchArray;
    [this.root] = this.pitches;

    this.length = this.pitches.length;

    lockr(this);
  }

  private static create(dto: Dto): Chord {
    return new Chord(dto);
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

  toString(): string {
    return `${this.pitches.join("-")}`;
  }
}
