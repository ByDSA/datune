/* eslint-disable accessor-pairs */
/* eslint-disable import/no-cycle */
import type { OctavePitch } from "../OctavePitch";
import type { Interval } from "intervals/chromatic";
import type { Pitch as APitch } from "pitches/alt";
import { inspect } from "node:util";
import { Pitches as AP } from "pitches/alt";
import { Pitches as P } from ".";

export class Pitch implements OctavePitch<Interval> {
  private intValue;

  private constructor(intValue: number) {
    this.intValue = intValue;
  }

  valueOf(): number {
    return this.intValue;
  }

  toAlt(): APitch {
    return AP.fromChromatic(this);
  }

  toString() {
    switch (+this) {
      case 0: return "C";
      case 1: return "C#";
      case 2: return "D";
      case 3: return "D#";
      case 4: return "E";
      case 5: return "F";
      case 6: return "F#";
      case 7: return "G";
      case 8: return "G#";
      case 9: return "A";
      case 10: return "A#";
      case 11: return "B";
      default: return "Pitch";
    }
  }

  withShifted(interval: Interval): Pitch {
    return P.shift(this, interval);
  }

  withShiftedDown(interval: Interval): Pitch {
    return P.shiftDown(this, interval);
  }

  get [Symbol.toStringTag](): string {
    return "Pitch";
  }

  [inspect.custom](): string {
    return `${this[Symbol.toStringTag]}(${this.toString()})`;
  }
}
