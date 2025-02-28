/* eslint-disable accessor-pairs */

import { Chord } from "chords/alt";
import { HarmonicFunction } from "functions/alt";
import { Key } from "keys/alt";

class Builder {
  #key: Key;

  #harmonicFunction: HarmonicFunction;

  private constructor(key: Key, harmonicFunction: HarmonicFunction) {
    this.#key = key;
    this.#harmonicFunction = harmonicFunction;
  }

  static from(
    key: Key,
    harmonicFunction: HarmonicFunction,
  ): Builder {
    return new Builder(key, harmonicFunction);
  }

  build(): Chord | null {
    return this.function.getChord(this.key);
  }

  get key(): Key {
    return this.#key;
  }

  get function(): HarmonicFunction {
    return this.#harmonicFunction;
  }
}

export function fromKeyFunction(
  key: Key,
  harmonicFunction: HarmonicFunction,
): Chord | null {
  return Builder.from(key, harmonicFunction).build();
}
