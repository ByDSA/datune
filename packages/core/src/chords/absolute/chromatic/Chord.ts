import { lockr } from "@datune/utils/immutables";
import { Pitch } from "pitches/chromatic";
import { Array as SPNArray, SPN } from "spns/chromatic";
import AbsoluteChord from "../AbsoluteChordInterface";

export default class SPNChord implements AbsoluteChord<Pitch, SPN> {
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

  private static create(spns: SPNArray): SPNChord {
    return new SPNChord(spns);
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
