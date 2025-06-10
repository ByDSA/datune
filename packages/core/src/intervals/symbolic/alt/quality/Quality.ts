import type { Key } from "./building/id";

export class Quality {
  #shortName: string;

  private constructor(key: Key) {
    this.#shortName = key;
  }

  toString() {
    return this.#shortName;
  }

  // eslint-disable-next-line accessor-pairs
  get shortName() {
    return this.#shortName;
  }
}
