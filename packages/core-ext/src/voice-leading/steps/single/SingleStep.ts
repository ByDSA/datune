/* eslint-disable max-len */
import { Interval } from "@datune/core/intervals/chromatic";
import { add as SPNAdd } from "@datune/core/spns/symbolic/chromatic/modifiers";
import { Step, Target } from "../Step";

/*
Interval = 0: significa que la voz no cambia, pero sigue existiendo. Se usa por ejemplo cuando en sus4 una de las voces debe mantenerse en la resolución
Interval = null: significa que la voz con ese index se elimina (se pone a null, no se borra del array)
Interval = undefined: valor inválido, sigifica que el step no existe (usado en CompositeStep)
*/
export class SingleStep implements Step {
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

  applyTo(spnArray: Target): void {
    if (this.interval === undefined)
      return;

    const spnAtIndex = spnArray[this.index];

    if (!spnAtIndex)
      return;

    if (this.interval !== null)
      spnArray[this.index] = SPNAdd(spnAtIndex, this.interval);
    else
      spnArray[this.index] = null;
  }
}

export type SingleStepOrNull = SingleStep | null;
