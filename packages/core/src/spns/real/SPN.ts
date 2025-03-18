import type { Spn as ISpn } from "../Spn";
import { lockr } from "datils/datatypes";

export class Spn implements ISpn {
  #frequency: number;

  constructor(frequency: number) {
    this.#frequency = frequency;
    lockr(this);
  }

  valueOf(): number {
    return this.#frequency;
  }
}
