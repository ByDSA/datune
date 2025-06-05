/* eslint-disable import/no-cycle */
/* eslint-disable accessor-pairs */
import type { Interval } from "intervals/symbolic/diatonic";
import type { OctavePitch } from "../OctavePitch";
import { inspect } from "node:util";
import { Pitches as P } from ".";

export class Pitch implements OctavePitch<Interval> {
  private intValue: number;

  private constructor(intValue: number) {
    this.intValue = intValue;
  }

  withShifted(interval: Interval): Pitch {
    return P.shift(this, interval);
  }

  withShiftedDown(interval: Interval): Pitch {
    return P.shiftDown(this, interval);
  }

  valueOf(): number {
    return this.intValue;
  }

  toString() {
    switch (+this) {
      case 0: return "C";
      case 1: return "D";
      case 2: return "E";
      case 3: return "F";
      case 4: return "G";
      case 5: return "A";
      case 6: return "B";
      default: throw new Error(`Invalid pitch value: ${this.intValue}`);
    }
  }

  get [Symbol.toStringTag](): string {
    return "Pitch";
  }

  [inspect.custom](): string {
    return `${this[Symbol.toStringTag]}(${this.toString()})`;
  }
}
