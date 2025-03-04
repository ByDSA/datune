import type { SPN as ISPN } from "../SPN";
import { lockr } from "@datune/utils/immutables";

export class SPN implements ISPN {
  #frequency: number;

  constructor(frequency: number) {
    this.#frequency = frequency;
    lockr(this);
  }

  valueOf(): number {
    return this.#frequency;
  }
}
