import { lockr } from "@datune/utils/immutables";
import type { SPN as ISPN } from "../SPN";

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
