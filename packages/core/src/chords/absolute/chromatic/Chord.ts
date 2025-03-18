import type { Pitch } from "pitches/chromatic";
import type { Key } from "./building/cache";
import { lockr } from "datils/datatypes/immutables";
import { SpnArray, Spn } from "spns/chromatic";
import { AbsoluteChord } from "../AbsoluteChord";

export class Chord implements AbsoluteChord<Pitch, Spn> {
  pitches: SpnArray;

  root: Spn;

  length: number;

  private constructor(key: Key) {
    this.pitches = key;
    // eslint-disable-next-line prefer-destructuring
    this.root = this.pitches[0];
    this.length = this.pitches.length;

    lockr(this);
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
