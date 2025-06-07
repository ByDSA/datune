/* eslint-disable accessor-pairs */
import type { SymbolicChord } from "../SymbolicChord";
import type { Key } from "./caching/cache";
import type { PitchArray, Pitch } from "pitches/alt";
import type { PitchSet } from "sets/pitch-set/alt/PitchSet";
import type { Interval, IntervalArray, Voicing } from "alt";
import type { Chord as CChord } from "chords/octave/chromatic";
import { deepFreeze } from "datils/datatypes/objects";
import { Arrays } from "datils/datatypes/arrays";
import { Intervals as I } from "intervals/alt";
import { Chords as CC } from "chords/octave/chromatic";
import { Chords as C } from "chords/alt";
import { Voicings as V } from "voicings/alt";

export class Chord implements SymbolicChord<Pitch, Interval> {
  #pitches?: Readonly<PitchArray>;

  #rootIntervals?: Readonly<IntervalArray>;

  pitchSet: PitchSet;

  root: Pitch;

  bass: Pitch;

  // eslint-disable-next-line no-use-before-define
  private static _from: (key: Key)=> Chord;

  private constructor(key: Key) {
    if (key.pitchSet.size === 0)
      throw new Error("Empty pitch set");

    this.pitchSet = key.pitchSet;
    this.root = key.root;
    this.bass = key.bass;

    deepFreeze(this);
  }

  get pitches(): Readonly<PitchArray> {
    if (!this.#pitches)
      this.#pitches = getPitches(this);

    return this.#pitches;
  }

  get size() {
    return this.pitchSet.size;
  }

  [Symbol.iterator](): Iterator<Pitch, any, any> {
    return this.pitchSet[Symbol.iterator]();
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

  hasRootIntervals(...rootIntervals: IntervalArray): boolean {
    const pitches = fromRootIntervals(this.root, rootIntervals);

    return this.pitchSet.hasAll(...pitches);
  }

  hasAnyRootIntervals(...rootIntervals: IntervalArray): boolean {
    const pitches = fromRootIntervals(this.root, rootIntervals);

    return this.pitchSet.hasAny(...pitches);
  }

  withShifted(interval: Interval): Chord {
    return C.shift(this, interval);
  }

  withShiftedDown(interval: Interval): Chord {
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

  withAdded(...pitches: PitchArray): Chord {
    return C.add(this, ...pitches);
  }

  withRemoved(...pitches: PitchArray): Chord {
    return C.remove(this, ...pitches);
  }

  withRootIntervalsAdded(...rootIntervals: IntervalArray): Chord {
    return C.addRootIntervals(this, ...rootIntervals);
  }

  withRootIntervalsRemoved(...rootIntervals: IntervalArray): Chord {
    return C.removeRootIntervals(this, ...rootIntervals);
  }

  withSus4(): Chord {
    const THIRDS = [I.M3, I.m3] as IntervalArray;
    let ret: Chord = this;
    const fourthPitch = this.root.withShifted(I.P4);
    const bassRootInterval = I.betweenNext(this.root, this.bass);

    if (THIRDS.includes(bassRootInterval))
      ret = ret.withBass(fourthPitch);

    return ret.withRootIntervalsRemoved(...THIRDS).withAdded(fourthPitch);
  }

  withSus2(): Chord {
    const THIRDS = [I.M3, I.m3] as IntervalArray;
    let ret: Chord = this;
    const secondPitch = this.root.withShifted(I.M2);
    const bassRootInterval = I.betweenNext(this.root, this.bass);

    if (THIRDS.includes(bassRootInterval))
      ret = ret.withBass(secondPitch);

    return ret.withRootIntervalsRemoved(...THIRDS).withAdded(secondPitch);
  }

  get rootIntervals(): Readonly<IntervalArray> {
    if (!this.#rootIntervals)
      this.#rootIntervals = getRootIntervals(this);

    return this.#rootIntervals;
  }

  toRootVoicing(): Voicing {
    return V.fromRootChord(this);
  }

  toChromatic(): CChord {
    return CC.fromAltChord(this);
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
    const chromaticPitches = pitches.map(p=>p.toChromatic());

    for (let i = 1; i < 12; i++) {
      const p = key.root.toChromatic().withShifted(i);

      rootIndex = chromaticPitches.findIndex(c=>c === p);

      if (rootIndex >= 0)
        break;
    }
  }

  Arrays.rotateLeft(pitches, rootIndex);
  pitches = [key.bass, ...pitches];

  return Object.freeze(pitches);
}

function getRootIntervals(chord: Chord): IntervalArray {
  const rootIntervals: IntervalArray = [] as unknown as IntervalArray;
  const { pitches } = chord;

  for (let i = 0; i < pitches.length; i++) {
    let rootInterval = chord.root === pitches[i] ? I.P1 : I.betweenNext(chord.root, pitches[i]);

    rootIntervals.push(rootInterval);
  }

  return rootIntervals.sort((a, b)=>+a - +b);
}

function fromRootIntervals(root: Pitch, rootIntervals: IntervalArray): PitchArray {
  return rootIntervals.map(i=>root.withShifted(i)) as PitchArray;
}
