import { lockr } from "@datune/utils/immutables";
import { Array as IntervalArray, Interval } from "intervals/symbolic/chromatic";
import IVoicing from "../Voicing";
import Dto from "./building/Dto";

export default class Voicing implements IVoicing<Interval> {
  rootIntervals: IntervalArray;

  length: number;

  private constructor(...values: Dto) {
    this.rootIntervals = values;
    this.length = this.rootIntervals.length;
    lockr(this);
  }

  private static create(values: Dto): Voicing {
    return new Voicing(...values);
  }

  [Symbol.iterator](): Iterator<Interval> {
    return this.rootIntervals[Symbol.iterator]();
  }

  toString() {
    return this.rootIntervals.map(String).join("-");
  }
}
