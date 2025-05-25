/* eslint-disable accessor-pairs */
import { inspect } from "node:util";
import { OctavePitch } from "../OctavePitch";

export class Pitch implements OctavePitch {
  private intValue: number;

  private constructor(intValue: number) {
    this.intValue = intValue;
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
