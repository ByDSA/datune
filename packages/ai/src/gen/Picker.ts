/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { random } from "@datune/utils";

export default class Picker<T> {
  constructor(private _possibilities: T[] = []) {
  }

  pickAndRemove(): T | null {
    if (this._possibilities.length === 0)
      return null;

    if (this._possibilities.length === 1) {
      const ret = this._possibilities[0];

      this._possibilities.splice(0);

      return ret;
    }

    const index = random(this._possibilities.length);
    const ret = this._possibilities[index];

    this._possibilities.splice(index, 1);

    return ret;
  }

  // eslint-disable-next-line accessor-pairs
  get possibilities(): T[] {
    return this._possibilities;
  }
}
