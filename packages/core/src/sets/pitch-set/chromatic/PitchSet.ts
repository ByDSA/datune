import type { Key } from "./caching/cache";
import type { Pitch } from "pitches/chromatic";
import { deepFreeze } from "datils/datatypes/objects";

export class PitchSet {
  pitches: Set<Pitch>;

  size: number;

  private constructor(key: Key) {
    this.pitches = new Set(key);
    this.size = this.pitches.size;

    deepFreeze(this);
  }

  has(pitch: Pitch): boolean {
    return this.pitches.has(pitch);
  }
}
