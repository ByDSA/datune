import type { Key as K } from "./caching/cache";
import type { Interval } from "intervals/chromatic";
import type { Chord } from "chords/chromatic";
import type { PitchArray, Pitch } from "pitches/chromatic";
import type { Scale } from "scales/chromatic";
import type { IKey } from "../Key";
import type { PitchSet } from "sets/pitch-set/chromatic";
import { fromPitches as pitchSetFromPitches } from "sets/pitch-set/chromatic/building";
import { rootIntervals as pitchesRootIntervals } from "pitches/chromatic/modifiers";
import { fromDegrees as scaleFromDegrees } from "scales/symbolic/chromatic/building/degrees";
import { fromInt as pitchFromInt } from "pitches/chromatic/building";
import { IFunc } from "functions/IFunc";
import { mode, seventhRootChord, triadRootChord } from "./modifiers";
import { root } from "./modifiers/root";
import { scale } from "./modifiers/scale";

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
    this.root = pitchFromInt(key[0]);
    this.scale = scaleFromDegrees(...key[1]);
    this.length = this.scale.length;
    this.pitches = Object.freeze(pitchesRootIntervals(this.root, this.scale.degrees));
    this.pitchSet = pitchSetFromPitches(...this.pitches);
  }

  [Symbol.iterator](): Iterator<Pitch, any, any> {
    return this.pitches[Symbol.iterator]();
  }

  hasChord(chord: Chord): boolean {
    return this.hasPitches(...chord.pitches as PitchArray);
  }

  getChord(func: IFunc<Pitch, Chord>): Chord {
    return func.getChord(this.root);
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
