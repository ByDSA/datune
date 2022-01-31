import { lockr } from "@datune/utils/immutables";
import { Array as PitchArray, Pitch } from "pitches/alt";
import SymbolicChord from "../SymbolicChord";
import { Dto } from "./caching";

export default class Chord implements SymbolicChord<Pitch> {
  pitches: PitchArray;

  length: number;

  root: Pitch;

  private constructor(dto: Dto) {
    this.pitches = dto;
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

  toString(): string {
    return `${this.pitches.join("-")}`;
  }
}
