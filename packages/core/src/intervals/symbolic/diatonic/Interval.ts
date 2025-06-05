/* eslint-disable import/no-cycle */
import type { Key } from "./caching/key-id";
import type { IInterval } from "../IInterval";
import { Direction } from "./Direction";
import { Intervals as I } from ".";

export class Interval implements IInterval {
  magnitude: number;

  direction: Direction;

  private constructor(key: Key) {
    this.magnitude = key.magnitude;
    this.direction = key.direction;
  }

  withShifted(interval: Interval): Interval {
    return I.shift(this, interval);
  }

  withShiftedDown(interval: Interval): Interval {
    return I.shiftDown(this, interval);
  }

  valueOf() {
    return this.direction === Direction.ASCENDENT ? this.magnitude : -this.magnitude;
  }

  toString() {
    return `${this.direction === Direction.ASCENDENT ? "" : "-"}${this.magnitude + 1}`;
  }
}
