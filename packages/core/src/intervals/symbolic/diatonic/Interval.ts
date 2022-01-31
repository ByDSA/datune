import { Dto } from "./caching";
import Direction from "./Direction";

export default class Interval {
  magnitude: number;

  direction: Direction;

  private constructor(dto: Dto) {
    this.magnitude = dto.magnitude;
    this.direction = dto.direction;
  }

  private static create(dto: Dto): Interval {
    return new Interval(dto);
  }

  valueOf() {
    return this.direction === Direction.ASCENDENT ? this.magnitude : -this.magnitude;
  }

  toString() {
    return `${this.direction === Direction.ASCENDENT ? "" : "-"}${this.magnitude + 1}`;
  }
}
