import { lockr } from "@datune/utils/immutables";
import { Array as IntervalArray, Interval } from "intervals/alt";
import Voicing from "../Voicing";

export default class DiatonicAltVoicing implements Voicing<Interval> {
  rootIntervals: IntervalArray;

  length: number;

  private constructor(...values: IntervalArray) {
    this.rootIntervals = values;

    this.length = this.rootIntervals.length;

    lockr(this);
  }

  private static create(values: IntervalArray): DiatonicAltVoicing {
    return new DiatonicAltVoicing(...values);
  }

  [Symbol.iterator](): Iterator<Interval> {
    return this.rootIntervals[Symbol.iterator]();
  }

  toString(): string {
    return this.rootIntervals.map(String).join("-");
  }
}
