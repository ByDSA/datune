/* eslint-disable accessor-pairs */
/* eslint-disable import/no-cycle */
import type { IIntervalSet } from "../IIntervalSet";
import type { IntervalSet as CIS } from "sets/interval-sets/chromatic";
import type { IntervalSet as DIS } from "sets/interval-sets/diatonic";
import type { IntervalArray, Interval } from "intervals/alt";
import type { Key } from "./caching/cache";
import { inspect } from "node:util";
import { deepFreeze } from "datils/datatypes/objects";
import { sortedRootToDeltaIntervals } from "intervals/symbolic/alt/deltaRootIntervals";
import { toSorted } from "intervals/symbolic/alt/sorting";
import { toChromaticIntervalSet, toDiatonicIntervalSet } from "./conversions";
import { IntervalSets as IS } from ".";

export class IntervalSet implements IIntervalSet<Interval> {
  private set: Set<Interval>;

  #rootIntervals?: Interval[];

  #deltaIntervals?: Interval[];

  size: number;

  private constructor(key: Key) {
    this.set = key;
    this.size = this.set.size;

    deepFreeze(this);
  }

  has(interval: Interval): boolean {
    return this.set.has(interval);
  }

  hasAny(...rootIntervals: IntervalArray): boolean {
    return rootIntervals.some((i) => this.set.has(i));
  }

  hasAll(...rootIntervals: IntervalArray): boolean {
    return rootIntervals.every((i) => this.set.has(i));
  }

  get deltaIntervals(): Readonly<Interval[]> {
    if (this.#deltaIntervals === undefined) {
      this.#deltaIntervals = this.size > 0
        ? sortedRootToDeltaIntervals(...this.rootIntervals as IntervalArray)
        : [];
      Object.freeze(this.#deltaIntervals);
    }

    return this.#deltaIntervals;
  }

  get rootIntervals(): Readonly<Interval[]> {
    if (this.#rootIntervals === undefined) {
      this.#rootIntervals = toSorted(this.set);

      Object.freeze(this.#rootIntervals);
    }

    return this.#rootIntervals;
  }

  withAdded(...rootIntervals: IntervalArray): IntervalSet {
    return IS.add(this, ...rootIntervals);
  }

  withRemoved(...rootIntervals: IntervalArray): IntervalSet {
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

  withClosed(): IntervalSet {
    return IS.close(this);
  }

  toChromaticIntervalSet(): CIS {
    return toChromaticIntervalSet(this);
  }

  toDiatonicIntervalSet(): DIS {
    return toDiatonicIntervalSet(this);
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

  toString(): string {
    return this.rootIntervals.map(String).join("-");
  }
}
