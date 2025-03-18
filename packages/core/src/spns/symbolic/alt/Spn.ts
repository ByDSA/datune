import type { Key } from "./building/cache";
import type { Pitch } from "pitches/alt";
import { lockr } from "@datune/utils/immutables";
import { SymbolicSpn as ISpn } from "../SymbolicSpn";

export class Spn implements ISpn<Pitch> {
  pitch: Pitch;

  octave: number;

  private constructor(key: Key) {
    this.pitch = key.pitch;
    this.octave = key.octave;
    lockr(this);
  }

  valueOf(): number {
    return (+this.pitch * 197) + (this.octave * 199);
  }
}
