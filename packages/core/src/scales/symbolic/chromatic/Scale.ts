import type { Dto } from "./caching/Dto";
import type { Scale as IScale } from "../../Scale";
import type { DegreeArray, Degree } from "degrees/chromatic";
import type { IntervalArray, Interval } from "intervals/chromatic";
import { Scale as AScale, Scales as AS } from "scales/alt";

export class Scale implements IScale<Interval, Degree> {
  rootIntervals: IntervalArray;

  degrees: DegreeArray;

  length: number;

  private constructor(...rootIntervals: Dto) {
    this.rootIntervals = rootIntervals;
    this.length = this.rootIntervals.length;

    this.degrees = this.rootIntervals as DegreeArray;
  }

  private static create(intraIntervals: Dto): Scale {
    return new Scale(...intraIntervals);
  }

  toAlt(): AScale {
    return AS.fromChromaticScale(this);
  }

  toString(): string {
    return this.rootIntervals.join("-");
  }
}
