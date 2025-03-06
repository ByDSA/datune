import type { Dto } from "./caching/Dto";
import type { Scale as IScale } from "../../Scale";
import { DegreeArray, Degree } from "degrees/chromatic";
import { IntervalArray, Interval } from "intervals/chromatic";

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

  toString(): string {
    return this.rootIntervals.join("-");
  }
}
