import type { Dto } from "./building/dto/Dto";
import { DegreeArray, Degree } from "degrees/chromatic";
import { IntervalArray, Interval } from "intervals/real";
import { Scale as IScale } from "../Scale";

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
