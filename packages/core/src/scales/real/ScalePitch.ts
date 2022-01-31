import { Array as DegreeArray, Degree } from "degrees/chromatic";
import { Array, Interval } from "intervals/real";
import Scale from "../Scale";
import { Dto } from "./building/dto";

export default class ScalePitch implements Scale<Interval, Degree> {
  intraIntervals: Array;

  rootIntervals: Array;

  degrees: DegreeArray;

  length: number;

  private constructor(dto: Dto) {
    this.intraIntervals = dto;
    this.rootIntervals = [] as any; // TODO
    this.degrees = [] as any; // TODO
    this.length = dto.length;
  }

  private static create(dto: Dto): ScalePitch {
    return new ScalePitch(dto);
  }
}
