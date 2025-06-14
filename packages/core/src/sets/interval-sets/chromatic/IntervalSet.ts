/* eslint-disable accessor-pairs */
/* eslint-disable import/no-cycle */
import type { Key } from "./caching/cache";
import type { IIntervalSet } from "../IIntervalSet";
import { inspect } from "node:util";
import { deepFreeze } from "datils/datatypes/objects";
import { IntervalArray, Interval } from "intervals/symbolic/chromatic";
import { IntervalSets } from ".";

export class IntervalSet implements IIntervalSet<Interval> {
  private set: Set<number>;

  #rootIntervalSortedInts?: number[];

  #rootIntervals?: Interval[];

  #deltaIntervals?: Interval[];

  size: number;

  private constructor(key: Key) {
    this.set = key;
    this.size = this.set.size;

    deepFreeze(this);
  }

  has(interval: Interval): boolean {
    return this.set.has(Math.abs(interval));
  }

  hasAny(...rootIntervals: IntervalArray): boolean {
    return rootIntervals.some((i) => this.set.has(Math.abs(i)));
  }

  hasAll(...rootIntervals: IntervalArray): boolean {
    return rootIntervals.every((i) => this.set.has(Math.abs(i)));
  }

  get deltaIntervals(): Interval[] {
    if (!this.#deltaIntervals) {
      if (this.#rootIntervalSortedInts === undefined)
        this.#rootIntervalSortedInts = [...this.set].sort((a, b)=>a - b);

      this.#deltaIntervals = new Array<Interval>(this.size - 1) as IntervalArray;

      for (let i = 1; i < this.size; i++) {
        this.#deltaIntervals[i - 1] = this.#rootIntervalSortedInts[i]
       - this.#rootIntervalSortedInts[i - 1];
      }

      Object.freeze(this.#deltaIntervals);
    }

    return this.#deltaIntervals;
  }

  get rootIntervals(): Interval[] {
    if (!this.#rootIntervals) {
      if (this.#rootIntervalSortedInts === undefined)
        this.#rootIntervalSortedInts = [...this.set].sort((a, b)=>a - b);

      this.#rootIntervals = this.#rootIntervalSortedInts as IntervalArray;

      Object.freeze(this.#rootIntervals);
    }

    return this.#rootIntervals;
  }

  withAdded(...intervals: IntervalArray): IntervalSet {
    return IntervalSets.add(this, ...intervals);
  }

  withRemoved(...intervals: IntervalArray): IntervalSet {
    return IntervalSets.remove(this, ...intervals);
  }

  withShifted(interval: Interval): IntervalSet {
    return IntervalSets.shift(this, interval);
  }

  withShiftedDown(interval: Interval): IntervalSet {
    return IntervalSets.shiftDown(this, interval);
  }

  withInv(n: number = 1): IntervalSet {
    return IntervalSets.inv(this, n);
  }

  get [Symbol.toStringTag](): string {
    return "IntervalSet";
  }

  [inspect.custom](): string {
    return `${this[Symbol.toStringTag]}(${this.rootIntervals.join(",")})`;
  }

  [Symbol.iterator](): IterableIterator<Interval> {
    return this.rootIntervals[Symbol.iterator]();
  }

  toString() {
    return this.rootIntervals.map(String).join("-");
  }
}
