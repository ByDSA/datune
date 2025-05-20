import type { Pitch } from "pitches/chromatic";
import type { Key } from "./building/cache";
import { deepFreeze } from "datils/datatypes/objects";
import { SpnArray, Spn } from "spns/chromatic";
import { AbsoluteChord } from "../AbsoluteChord";

export class Chord implements AbsoluteChord<Pitch, Spn> {
  pitches: SpnArray;

  #root?: Spn;

  rootIndex: number;

  length: number;

  private constructor(key: Key) {
    this.pitches = key.pitches;

    this.rootIndex = key.rootIndex;
    this.length = this.pitches.length;

    deepFreeze(this);
  }

  // eslint-disable-next-line accessor-pairs
  get root(): Spn {
    if (this.#root === undefined)
      this.#root = this.pitches[this.rootIndex];

    return this.#root;
  }

  has(note: Spn): boolean {
    return this.pitches.includes(note);
  }

  hasAll(...spns: SpnArray): boolean {
    for (const c of spns) {
      if (!this.pitches.includes(c))
        return false;
    }

    return true;
  }

  hasAny(...spns: SpnArray): boolean {
    for (const c of spns) {
      if (this.pitches.includes(c))
        return true;
    }

    return false;
  }
}
