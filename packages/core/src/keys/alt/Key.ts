import type { Interval } from "intervals/alt";
import type { Chord } from "chords/alt";
import type { PitchArray, Pitch } from "pitches/alt";
import type { Scale } from "scales/alt";
import type { IKey } from "../Key";
import type { K } from "./building/caching/cache";
import type { PitchSet } from "sets/pitch-sets/alt";
import { fromPitches as pitchSetFromPitches } from "sets/pitch-sets/alt/building";
import { rootIntervals as pitchesRootIntervals } from "pitches/alt/modifiers";
import { IFunc } from "functions/IFunc";
import { mode, root, scale, seventhRootChord, triadRootChord } from "./modifiers";

export class Key implements
  IKey<Interval, Pitch, Scale, Chord, PitchSet> {
  pitches: Readonly<PitchArray>;

  root: Pitch;

  scale: Scale;

  length: number;

  pitchSet: PitchSet;

  #triadRootChord?: Chord | null;

  #seventhRootChord?: Chord | null;

  private constructor(key: K) {
    this.root = key.root;
    this.scale = key.scale;
    this.length = this.scale.length;
    this.pitches = Object.freeze(pitchesRootIntervals(this.root, this.scale.degrees));
    this.pitchSet = pitchSetFromPitches(...this.pitches);
  }

  [Symbol.iterator](): Iterator<Pitch, any, any> {
    return this.pitches[Symbol.iterator]();
  }

  getChord(func: IFunc<Pitch, Chord>): Chord {
    return func.getChord(this.root);
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

  withMode(n: number = 2): Key {
    return mode(this, n);
  }

  withRoot(newRoot: Pitch): Key {
    return root(this, newRoot);
  }

  withScale(newScale: Scale): Key {
    return scale(this, newScale);
  }

  // eslint-disable-next-line accessor-pairs
  get triadRootChord(): Chord | null {
    if (this.#triadRootChord === undefined)
      this.#triadRootChord = triadRootChord(this);

    return this.#triadRootChord;
  }

  // eslint-disable-next-line accessor-pairs
  get seventhRootChord(): Chord | null {
    if (this.#seventhRootChord === undefined)
      this.#seventhRootChord = seventhRootChord(this);

    return this.#seventhRootChord;
  }

  toString() {
    return `${this.root} ${this.scale}`;
  }
}
