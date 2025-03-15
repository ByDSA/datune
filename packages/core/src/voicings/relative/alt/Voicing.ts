/* eslint-disable import/no-cycle */
import type { Voicing as IVoicing } from "../Voicing";
import { lockr } from "@datune/utils/immutables";
import { IntervalArray, Interval } from "intervals/alt";
import { Voicings as V } from ".";

export class Voicing implements IVoicing<Interval> {
  rootIntervals: IntervalArray;

  length: number;

  private constructor(key: IntervalArray) {
    this.rootIntervals = key;

    this.length = this.rootIntervals.length;

    lockr(this);
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

  toString(): string {
    return this.rootIntervals.map(String).join("-");
  }
}
