/* eslint-disable import/no-cycle */
import type { Key } from "./caching/key-id";
import type { IInterval } from "../IInterval";
import { MAJOR_SCALE_DEGREES } from "scales/symbolic/chromatic/constants/majorScaleDegrees";
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

  withNeg(): Interval {
    return I.neg(this);
  }

  withAbs(): Interval {
    return I.abs(this);
  }

  withSimplified(): Interval {
    return I.simplify(this);
  }

  withCyclicOctave(): Interval {
    return I.cyclicOctave(this);
  }

  toChromaticInterval() {
    const magnitude = MAJOR_SCALE_DEGREES[this.magnitude];

    return this.direction === Direction.ASCENDENT
      ? magnitude
      : -magnitude;
  }

  valueOf() {
    return this.direction === Direction.ASCENDENT
      ? this.magnitude
      : -this.magnitude;
  }

  toString() {
    return `${this.direction === Direction.ASCENDENT ? "" : "-"}${this.magnitude + 1}`;
  }
}
