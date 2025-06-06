import type { Interval } from "intervals/alt";
import type { Chord } from "chords/alt";
import type { PitchArray, Pitch } from "pitches/alt";
import type { Scale } from "scales/alt";
import type { IKey } from "../Key";
import type { K } from "./building/caching/cache";
import type { PitchSet } from "sets/pitch-set/alt";
import { fromPitches as pitchSetFromPitches } from "sets/pitch-set/alt/building";
import { rootIntervals as pitchesRootIntervals } from "pitches/alt/modifiers";

export class Key implements
  IKey<Interval, Pitch, Scale, Chord, PitchSet> {
  pitches: PitchArray;

  root: Pitch;

  scale: Scale;

  length: number;

  pitchSet: PitchSet;

  private constructor(key: K) {
    this.root = key.root;
    this.scale = key.scale;
    this.length = this.scale.length;
    this.pitches = pitchesRootIntervals(this.root, this.scale.rootIntervals);
    this.pitchSet = pitchSetFromPitches(...this.pitches);
  }

  [Symbol.iterator](): Iterator<Pitch, any, any> {
    return this.pitches[Symbol.iterator]();
  }

  hasChord(chord: Chord): boolean {
    return this.hasPitches(...chord.pitches);
  }

  hasPitches(...pitches: PitchArray): boolean {
    for (const pitch of pitches) {
      if (!this.pitches.includes(pitch))
        return false;
    }

    return true;
  }

  toString() {
    return `${this.root} ${this.scale}`;
  }
}
