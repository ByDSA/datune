import type { Key } from "./caching/key-id";
import { Direction } from "./Direction";

export class Interval {
  magnitude: number;

  direction: Direction;

  private constructor(key: Key) {
    this.magnitude = key.magnitude;
    this.direction = key.direction;
  }

  valueOf() {
    return this.direction === Direction.ASCENDENT ? this.magnitude : -this.magnitude;
  }

  toString() {
    return `${this.direction === Direction.ASCENDENT ? "" : "-"}${this.magnitude + 1}`;
  }
}
