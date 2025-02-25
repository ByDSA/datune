import { Array as DegreeArray, Degree } from "degrees/chromatic";
import { Array as IntervalArray, Interval } from "intervals/chromatic";
import IScale from "../../Scale";
import { Dto } from "./caching";

export default class Scale implements IScale<Interval, Degree> {
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
