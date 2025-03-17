/* eslint-disable max-len */
import type { Key } from "./cache";
import { Interval } from "@datune/core/intervals/chromatic";
import { add as SPNAdd } from "@datune/core/spns/symbolic/chromatic/modifiers";
import { Step } from "../Step";
import { Target } from "../Target";

/*
Interval = 0: significa que la voz no cambia, pero sigue existiendo. Se usa por ejemplo cuando en sus4 una de las voces debe mantenerse en la resolución
Interval = null: significa que la voz con ese index se elimina (se pone a null, no se borra del array)
Interval = undefined: valor inválido, sigifica que el step no existe (usado en CompositeStep)
*/
export class SingleStep implements Step {
  index: number;

  interval: Interval | null;

  private constructor(key: Key) {
    this.index = key.index;
    this.interval = key.interval;
    Object.freeze(this);
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
