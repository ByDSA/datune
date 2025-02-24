import { Interval } from "@datune/core/intervals/chromatic";
import { add as SPNAdd } from "@datune/core/spns/chromatic";
import { SPNOrNullArray, Step } from "../Step";

export default class SingleStep implements Step {
  index: number;

  interval: Interval | null;

  private constructor(index: number, interval: Interval | null) {
    this.index = index;
    this.interval = interval;
    Object.freeze(this);
  }

  private static create(index: number, interval: Interval | null): SingleStep {
    return new SingleStep(index, interval);
  }

  toString(): string {
    return `[${this.index}] => ${this.interval}`;
  }

  apply(notes: SPNOrNullArray): SPNOrNullArray {
    const noteIndex = notes[this.index];

    if (noteIndex === null)
      return notes;

    const ret: SPNOrNullArray = [...notes];

    if (this.interval !== null)
      ret[this.index] = SPNAdd(noteIndex, this.interval);
    else
      ret[this.index] = null;

    return ret;
  }
}

export type SingleStepOrNull = SingleStep | null;
