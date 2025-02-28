import { lockr } from "@datune/utils/immutables";
import type { Dto } from "./caching/Dto";
import type { Pitch } from "pitches/chromatic";

export class NoteSet {
  pitches: Set<Pitch>;

  size: number;

  private constructor(dto: Dto) {
    this.pitches = new Set(dto);
    this.size = this.pitches.size;

    lockr(this);
  }

  has(pitch: Pitch): boolean {
    return this.pitches.has(pitch);
  }
}
