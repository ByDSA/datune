/* eslint-disable accessor-pairs */
import type { SymbolicChord } from "../SymbolicChord";
import type { Key } from "./caching/cache";
import type { PitchArray, Pitch } from "pitches/chromatic";
import type { PitchSet } from "sets/pitch-set/chromatic/PitchSet";
import type { Interval, IntervalArray, Voicing } from "chromatic";
import type { Chord as AChord } from "chords/octave/alt";
import { deepFreeze } from "datils/datatypes/objects";
import { Arrays } from "datils/datatypes/arrays";
import { Chords as AC } from "chords/octave/alt";
import { Chords as C } from "chords/chromatic";
import { Voicings as V } from "voicings/chromatic";

export class Chord implements SymbolicChord<Pitch, Interval> {
  #pitches?: Readonly<PitchArray>;

  #rootIntervals?: Readonly<IntervalArray>;

  pitchSet: PitchSet;

  root: Pitch;

  bass: Pitch;

  private constructor(key: Key) {
    if (key.pitchSet.size === 0)
      throw new Error("Empty pitch set");

    this.pitchSet = key.pitchSet;
    this.root = key.root;
    this.bass = key.bass;

    deepFreeze(this);
  }

  // eslint-disable-next-line no-use-before-define
  private static _from: (key: Key)=> Chord;

  get pitches(): Readonly<PitchArray> {
    if (!this.#pitches)
      this.#pitches = getPitches(this);

    return this.#pitches;
  }

  get size() {
    return this.pitches.length;
  }

  has(pitch: Pitch): boolean {
    return this.pitchSet.has(pitch);
  }

  hasAll(...pitches: PitchArray): boolean {
    return this.pitchSet.hasAll(...pitches);
  }

  hasAny(...pitches: PitchArray): boolean {
    return this.pitchSet.hasAny(...pitches);
  }

  withShift(interval: Interval): Chord {
    return C.shift(this, interval);
  }

  withShiftDown(interval: Interval): Chord {
    return C.shiftDown(this, interval);
  }

  withInv(n: number = 1): Chord {
    return C.inv(this, n);
  }

  withBass(bass: Pitch): Chord {
    return C.bass(this, bass);
  }

  withRoot(root: Pitch): Chord {
    return C.root(this, root);
  }

  withAdd(...pitches: PitchArray): Chord {
    return C.add(this, ...pitches);
  }

  withRemove(...pitches: PitchArray): Chord {
    return C.remove(this, ...pitches);
  }

  get rootIntervals(): Readonly<IntervalArray> {
    if (!this.#rootIntervals)
      this.#rootIntervals = getRootIntervals(this);

    return this.#rootIntervals;
  }

  toRootVoicing(): Voicing {
    return V.fromRootChord(this);
  }

  toAlt(): AChord {
    return AC.fromChromaticChord(this);
  }

  toString(): string {
    return `${this.pitches.map(p=>p === this.root ? `[${p}]` : p).join("-")}`;
  }
}

function getPitches(key: Key): Readonly<PitchArray> {
  let pitches = [...key.pitchSet.pitches] as PitchArray;
  const bassIndex = pitches.indexOf(key.bass);

  pitches.splice(bassIndex, 1);
  let rootIndex = pitches.indexOf(key.root);

  if (rootIndex < 0) {
    for (let i = 1; i < 12; i++) {
      const p = key.root.withAdd(i);

      rootIndex = pitches.findIndex(c=>c === p);

      if (rootIndex >= 0)
        break;
    }
  }

  Arrays.rotateLeft(pitches, rootIndex);
  pitches = [key.bass, ...pitches];

  return Object.freeze(pitches);
}

function getRootIntervals(key: Key): Readonly<IntervalArray> {
  const rootIntervals: IntervalArray = [] as unknown as IntervalArray;

  for (let i = 0; i < 12; i++) {
    if (key.pitchSet.has(key.root.withAdd(i)))
      rootIntervals.push(i);
  }

  return Object.freeze(rootIntervals);
}
