import type { Key } from "./caching/cache";
import type { Scale as IScale } from "../../Scale";
import type { DegreeArray, Degree } from "degrees/chromatic";
import type { IntervalArray, Interval } from "intervals/chromatic";
import { Scale as AScale, Scales as AS } from "scales/alt";

export class Scale implements IScale<Interval, Degree> {
  rootIntervals: IntervalArray;

  degrees: DegreeArray;

  length: number;

  private constructor(key: Key) {
    this.rootIntervals = key;
    this.length = this.rootIntervals.length;

    this.degrees = this.rootIntervals as DegreeArray;
  }

  toAlt(): AScale {
    return AS.fromChromaticScale(this);
  }

  toString(): string {
    return this.rootIntervals.join("-");
  }
}
