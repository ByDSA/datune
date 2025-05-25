/* eslint-disable accessor-pairs */
import type { Key } from "./caching/cache";
import type { Pitch, PitchArray } from "pitches/alt";
import type { Interval } from "intervals/alt";
import { inspect } from "node:util";
import { deepFreeze } from "datils/datatypes/objects";
import { IPitchSet } from "../IPitchSet";
import { add, remove, shift, shiftDown } from "./modifiers";

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

  get set() {
    return new Set(this.#set);
  }

  get pitches(): Pitch[] {
    return this.#array;
  }

  get size(): number {
    return this.#size;
  }

  get [Symbol.toStringTag](): string {
    return "PitchSet";
  }

  entries(): SetIterator<[Pitch, Pitch]> {
    return this.#set.entries();
  }

  keys(): SetIterator<Pitch> {
    return this.#set.keys();
  }

  values(): SetIterator<Pitch> {
    return this.#set.values();
  }

  [Symbol.iterator](): IterableIterator<Pitch> {
    return this.#set[Symbol.iterator]();
  }

  forEach(callbackfn: (value: Pitch, value2: Pitch, set: Set<Pitch>)=> void, thisArg?: any): void {
    this.#set.forEach(callbackfn, thisArg);
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

  toString() {
    return this.#array.map(String).join(", ");
  }

  [inspect.custom](): string {
    return `${this[Symbol.toStringTag]}(${this.pitches.join(",")})`;
  }
}
