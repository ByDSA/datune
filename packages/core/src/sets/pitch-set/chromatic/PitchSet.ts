/* eslint-disable accessor-pairs */
import type { Key } from "./caching/cache";
import type { Pitch } from "pitches/chromatic";
import type { Interval, PitchArray } from "chromatic";
import type { PitchSet as IPitchSet } from "../PitchSet";
import { inspect } from "node:util";
import { deepFreeze } from "datils/datatypes/objects";
import { add, remove, reverse, shift, shiftDown } from "./modifiers";

export class PitchSet implements IPitchSet<Pitch, Interval> {
  #set: Set<Pitch>;

  #size: number;

  // Es Pitch[] y no PitchArray porque hay Empty PitchSet
  #array: Pitch[];

  private constructor(key: Key) {
    this.#set = new Set(key);
    this.#size = this.#set.size;
    this.#array = [...this.#set];

    deepFreeze(this);
  }

  has(pitch: Pitch): boolean {
    return this.#set.has(pitch);
  }

  hasAny(...pitches: PitchArray): boolean {
    return pitches.some((pitch) => this.#set.has(pitch));
  }

  hasAll(...pitches: PitchArray): boolean {
    return pitches.every((pitch) => this.#set.has(pitch));
  }

  get pitches(): Pitch[] {
    return this.#array;
  }

  get size(): number {
    return this.#size;
  }

  get set(): Readonly<Set<Pitch>> {
    return new Set(this.#set);
  }

  get [Symbol.toStringTag](): string {
    return "PitchSet";
  }

  [inspect.custom](): string {
    return `${this[Symbol.toStringTag]}(${this.pitches.join(",")})`;
  }

  [Symbol.iterator](): IterableIterator<Pitch> {
    return this.#set[Symbol.iterator]();
  }

  forEach(callbackfn: (value: Pitch, value2: Pitch, set: Set<Pitch>)=> void, thisArg?: any): void {
    this.#set.forEach(callbackfn, thisArg);
  }

  keys(): SetIterator<Pitch> {
    return this.#set.keys();
  }

  values(): SetIterator<Pitch> {
    return this.#set.values();
  }

  entries(): IterableIterator<[Pitch, Pitch]> {
    return this.#set.entries();
  }

  withAdd(...pitches: PitchArray): PitchSet {
    return add(this, ...pitches);
  }

  withRemove(...pitches: PitchArray): PitchSet {
    return remove(this, ...pitches);
  }

  withShift(interval: Interval): PitchSet {
    return shift(this, interval);
  }

  withShiftDown(interval: Interval): PitchSet {
    return shiftDown(this, interval);
  }

  withReverse(): PitchSet {
    return reverse(this);
  }

  toString() {
    return this.#array.map(String).join(", ");
  }
}
