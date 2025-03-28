/* eslint-disable import/no-cycle */
import type { Key } from "./caching/cache";
import { deepFreeze } from "datils/datatypes/objects";
import { IntervalArray, Interval } from "intervals/symbolic/chromatic";
import { Voicing as IVoicing } from "../Voicing";
import { Voicings as V } from ".";

export class Voicing implements IVoicing<Interval> {
  rootIntervals: IntervalArray;

  length: number;

  private constructor(key: Key) {
    this.rootIntervals = key;
    this.length = this.rootIntervals.length;
    deepFreeze(this);
  }

  [Symbol.iterator](): Iterator<Interval> {
    return this.rootIntervals[Symbol.iterator]();
  }

  withAdd(...intervals: Interval[]): Voicing {
    return V.add(this, ...intervals);
  }

  withOmit(...intervals: Interval[]): Voicing | null {
    return V.omit(this, ...intervals);
  }

  withInv(n: number = 1): Voicing {
    return V.inv(this, n);
  }

  toString() {
    return this.rootIntervals.map(String).join("-");
  }
}
