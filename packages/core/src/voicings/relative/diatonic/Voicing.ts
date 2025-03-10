import type { Arrays } from "@datune/utils";
import type { Voicing as IVoicing } from "../Voicing";
import type { IntervalArray, Interval } from "intervals/diatonic";
import { lockr } from "@datune/utils/immutables";
import { Intervals } from "intervals/diatonic";

export class Voicing implements IVoicing<Interval> {
  rootIndex: number;

  rootIntervalInts: Arrays.Number;

  rootIntervals: IntervalArray;

  intraIntervals: IntervalArray;

  inversionNumber: number;

  length: number;

  private constructor(...ints: Arrays.Number) {
    this.rootIntervalInts = ints;

    this.rootIndex = 0;
    this.rootIntervals = this.rootIntervalInts.map(
      (ic) => Intervals.fromInt(ic),
    ) as IntervalArray;
    this.intraIntervals = this.rootIntervalInts.map(
      (ic, i, a) => Intervals.fromInt(ic - i > 0 ? a[i - 1] : 0),
    ) as IntervalArray;
    this.inversionNumber = (this.rootIntervalInts.length - this.rootIndex)
    % this.rootIntervalInts.length;
    this.length = this.rootIntervalInts.length;
    lockr(this);
  }

  private static create(...ints: Arrays.Number): Voicing {
    return new Voicing(...ints);
  }

  [Symbol.iterator](): Iterator<Interval> {
    return this.rootIntervals[Symbol.iterator]();
  }
}
