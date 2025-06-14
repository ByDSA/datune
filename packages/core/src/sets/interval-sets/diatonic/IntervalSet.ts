/* eslint-disable accessor-pairs */
/* eslint-disable import/no-cycle */
import type { IIntervalSet } from "../IIntervalSet";
import type { IntervalArray, Interval } from "intervals/diatonic";
import type { Key } from "./caching";
import { inspect } from "node:util";
import { deepFreeze } from "datils/datatypes/objects";
import { Intervals } from "intervals/diatonic";
import { IntervalSets as IS } from ".";

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
    return this.set.has(interval.magnitude);
  }

  hasAny(...rootIntervals: IntervalArray): boolean {
    return rootIntervals.some((i) => this.set.has(i.magnitude));
  }

  hasAll(...rootIntervals: IntervalArray): boolean {
    return rootIntervals.every((i) => this.set.has(i.magnitude));
  }

  get deltaIntervals(): Readonly<Interval[]> {
    if (!this.#deltaIntervals) {
      if (this.#rootIntervalSortedInts === undefined)
        this.#rootIntervalSortedInts = [...this.set].sort((a, b)=>a - b);

      this.#deltaIntervals = new Array<Interval>(this.size - 1);

      for (let i = 1; i < this.size; i++) {
        this.#deltaIntervals![i - 1] = Intervals.fromInt(
          this.#rootIntervalSortedInts[i] - this.#rootIntervalSortedInts[i - 1],
        );
      }

      Object.freeze(this.#deltaIntervals);
    }

    return this.#deltaIntervals;
  }

  get rootIntervals(): Readonly<Interval[]> {
    if (!this.#rootIntervals) {
      if (this.#rootIntervalSortedInts === undefined)
        this.#rootIntervalSortedInts = [...this.set].sort((a, b)=>a - b);

      this.#rootIntervals = Object.freeze(this.#rootIntervalSortedInts.map(
        (ic) => Intervals.fromInt(ic),
      )) as IntervalArray;
    }

    return this.#rootIntervals;
  }

  withAdded(...rootIntervals: Interval[]): IntervalSet {
    return IS.add(this, ...rootIntervals);
  }

  withRemoved(...rootIntervals: Interval[]): IntervalSet {
    return IS.remove(this, ...rootIntervals);
  }

  withShifted(rootInterval: Interval): IntervalSet {
    return IS.shift(this, rootInterval);
  }

  withShiftedDown(rootInterval: Interval): IntervalSet {
    return IS.shiftDown(this, rootInterval);
  }

  withInv(n: number = 1): IntervalSet {
    return IS.inv(this, n);
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
}
