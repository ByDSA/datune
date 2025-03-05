/* eslint-disable accessor-pairs */
import { Chord } from "chords/alt";
import { Func } from "functions/alt";
import { Key } from "keys/alt";

class Builder {
  #key: Key;

  #func: Func;

  private constructor(key: Key, func: Func) {
    this.#key = key;
    this.#func = func;
  }

  static from(
    key: Key,
    func: Func,
  ): Builder {
    return new Builder(key, func);
  }

  build(): Chord | null {
    return this.function.getChord(this.key);
  }

  get key(): Key {
    return this.#key;
  }

  get function(): Func {
    return this.#func;
  }
}

export function fromKeyFunc(
  key: Key,
  func: Func,
): Chord | null {
  return Builder.from(key, func).build();
}
