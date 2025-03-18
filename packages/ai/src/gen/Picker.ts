import { randomN } from "datils/math";

export class Picker<T> {
  #possibilities: T[];

  constructor(possibilities: T[] = []) {
    this.#possibilities = possibilities;
  }

  pickAndRemove(): T | null {
    if (this.#possibilities.length === 0)
      return null;

    if (this.#possibilities.length === 1) {
      const [ret] = this.#possibilities;

      this.#possibilities.splice(0);

      return ret;
    }

    const index = randomN(this.#possibilities.length);
    const ret = this.#possibilities[index];

    this.#possibilities.splice(index, 1);

    return ret;
  }

  // eslint-disable-next-line accessor-pairs
  get possibilities(): T[] {
    return this.#possibilities;
  }
}
