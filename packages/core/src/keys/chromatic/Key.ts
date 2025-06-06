import type { Key as K } from "./caching/cache";
import type { Interval } from "intervals/chromatic";
import type { Chord } from "chords/chromatic";
import type { PitchArray, Pitch } from "pitches/chromatic";
import type { Scale } from "scales/chromatic";
import type { IKey } from "../Key";
import type { PitchSet } from "sets/pitch-set/chromatic";
import { fromPitches as pitchSetFromPitches } from "sets/pitch-set/chromatic/building";
import { rootIntervals as pitchesRootIntervals } from "pitches/chromatic/modifiers";
import { fromRootIntervals as scaleFromRootIntervals } from "scales/symbolic/chromatic/building/rootIntervals";
import { fromInt as pitchFromInt } from "pitches/chromatic/building";

export class Key implements
  IKey<Interval, Pitch, Scale, Chord, PitchSet> {
  pitches: PitchArray;

  root: Pitch;

  scale: Scale;

  length: number;

  pitchSet: PitchSet;

  private constructor(key: K) {
    this.root = pitchFromInt(key[0]);
    this.scale = scaleFromRootIntervals(...key[1]);
    this.length = this.scale.length;
    this.pitches = pitchesRootIntervals(this.root, this.scale.rootIntervals);
    this.pitchSet = pitchSetFromPitches(...this.pitches);
  }

  [Symbol.iterator](): Iterator<Pitch, any, any> {
    return this.pitches[Symbol.iterator]();
  }

  hasChord(chord: Chord): boolean {
    return this.hasPitches(...chord.pitches as PitchArray);
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
