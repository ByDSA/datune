import { lockr } from "@datune/utils/immutables";
import { AbsoluteChord } from "../AbsoluteChord";
import type { Pitch } from "pitches/chromatic";
import { SPNArray, SPN } from "spns/chromatic";

export class Chord implements AbsoluteChord<Pitch, SPN> {
  pitches: SPNArray;

  root: SPN;

  length: number;

  private constructor(spns: SPNArray) {
    this.pitches = spns;
    // eslint-disable-next-line prefer-destructuring
    this.root = this.pitches[0];
    this.length = this.pitches.length;

    lockr(this);
  }

  private static create(spns: SPNArray): Chord {
    return new Chord(spns);
  }

  has(note: SPN): boolean {
    return this.pitches.includes(note);
  }

  hasAll(...spns: SPNArray): boolean {
    for (const c of spns) {
      if (!this.pitches.includes(c))
        return false;
    }

    return true;
  }

  hasAny(...spns: SPNArray): boolean {
    for (const c of spns) {
      if (this.pitches.includes(c))
        return true;
    }

    return false;
  }
}
