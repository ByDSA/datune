import type { Key } from "./building/cache";
import type { Scale as IScale } from "../Scale";
import { IntervalArray, Interval } from "intervals/real";
import { mode } from "./modifiers/mode";

export class Scale implements IScale<Interval, Interval> {
  deltaIntervals: Readonly<IntervalArray>;

  degrees: Readonly<IntervalArray>;

  length: number;

  private constructor(key: Key) {
    this.deltaIntervals = Object.freeze(key);
    this.degrees = Object.freeze([]) as any; // TODO
    this.length = key.length;
  }

  [Symbol.iterator](): Iterator<Interval, any, any> {
    return this.degrees[Symbol.iterator]();
  }

  hasDegrees(...degrees: IntervalArray): boolean {
    return degrees.every(i=>this.degrees.includes(i));
  }

  withMode(n: number = 2): Scale {
    return mode(this, n);
  }
}
