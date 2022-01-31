import { lockr } from "@datune/utils/immutables";
import { Pitch } from "pitches/chromatic";
import Dto from "./caching/Dto";

export default class NoteSet {
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
