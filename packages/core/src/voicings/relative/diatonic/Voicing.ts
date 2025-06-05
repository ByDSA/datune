/* eslint-disable import/no-cycle */
import type { Voicing as IVoicing } from "../Voicing";
import type { IntervalArray, Interval } from "intervals/diatonic";
import type { Key } from "./building";
import { NonEmptyNumberArray } from "datils/datatypes";
import { deepFreeze } from "datils/datatypes/objects";
import { Intervals } from "intervals/diatonic";
import { Voicings as V } from ".";

export class Voicing implements IVoicing<Interval> {
  rootIndex: number;

  rootIntervalInts: NonEmptyNumberArray;

  rootIntervals: IntervalArray;

  intraIntervals: IntervalArray;

  inversionNumber: number;

  length: number;

  private constructor(key: Key) {
    this.rootIntervalInts = key;

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
    deepFreeze(this);
  }

  withAdded(...intervals: Interval[]): Voicing {
    return V.add(this, ...intervals);
  }

  withRemoved(...intervals: Interval[]): Voicing | null {
    return V.remove(this, ...intervals);
  }

  withShifted(interval: Interval): Voicing {
    return V.shift(this, interval);
  }

  withShiftedDown(interval: Interval): Voicing {
    return V.shiftDown(this, interval);
  }

  [Symbol.iterator](): Iterator<Interval, any, any> {
    return this.rootIntervals[Symbol.iterator]();
  }
}
