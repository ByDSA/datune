import type { Dto } from "./building/dto/Dto";
import type { Scale as IScale } from "../Scale";
import { DegreeArray, Degree } from "degrees/chromatic";
import { IntervalArray, Interval } from "intervals/real";

export class Scale implements IScale<Interval, Degree> {
  intraIntervals: IntervalArray;

  rootIntervals: IntervalArray;

  degrees: DegreeArray;

  length: number;

  private constructor(dto: Dto) {
    this.intraIntervals = dto;
    this.rootIntervals = [] as any; // TODO
    this.degrees = [] as any; // TODO
    this.length = dto.length;
  }

  private static create(dto: Dto): Scale {
    return new Scale(dto);
  }
}
