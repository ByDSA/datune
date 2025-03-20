import type { Key } from "./building/cache";
import type { Pitch } from "pitches/alt";
import { deepFreeze } from "datils/datatypes/objects";
import { SymbolicSpn as ISpn } from "../SymbolicSpn";

export class Spn implements ISpn<Pitch> {
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
}
