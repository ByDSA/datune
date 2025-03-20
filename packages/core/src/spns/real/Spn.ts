import type { Spn as ISpn } from "../Spn";
import { deepFreeze } from "datils/datatypes/objects";

export class Spn implements ISpn {
  #frequency: number;

  constructor(frequency: number) {
    this.#frequency = frequency;
    deepFreeze(this);
  }

  valueOf(): number {
    return this.#frequency;
  }
}
