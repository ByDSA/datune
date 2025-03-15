import type { Key } from "./building/cache";
import type { Scale as IScale } from "../Scale";
import { DegreeArray, Degree } from "degrees/chromatic";
import { IntervalArray, Interval } from "intervals/real";

export class Scale implements IScale<Interval, Degree> {
  intraIntervals: IntervalArray;

  rootIntervals: IntervalArray;

  degrees: DegreeArray;

  length: number;

  private constructor(key: Key) {
    this.intraIntervals = key;
    this.rootIntervals = [] as any; // TODO
    this.degrees = [] as any; // TODO
    this.length = key.length;
  }
}
