/* eslint-disable accessor-pairs */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Chord } from "chords/alt";
import { HarmonicFunction } from "functions/alt";
import { Key } from "keys/alt";

class Builder {
  private constructor(private _key: Key, private _harmonicFunction: HarmonicFunction) {
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
    return this._key;
  }

  get function(): HarmonicFunction {
    return this._harmonicFunction;
  }
}

export default function fromKeyFunction(
  key: Key,
  harmonicFunction: HarmonicFunction,
): Chord | null {
  return Builder.from(key, harmonicFunction).build();
}
