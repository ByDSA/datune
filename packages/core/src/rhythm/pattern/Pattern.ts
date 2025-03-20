import type { ArrayRhythm } from "./array";
import type { Key } from "./cache";
import { deepFreeze } from "datils/datatypes/objects";
import { NonEmptyNumberArray } from "datils/datatypes";

export class RhythmPattern implements Iterable<number> {
  array: ArrayRhythm;

  values: NonEmptyNumberArray;

  private constructor(key: Key) {
    this.values = key;
    this.array = calcArray(key);

    deepFreeze(this);
  }

  [Symbol.iterator]() {
    return this.values[Symbol.iterator]();
  }
}

function calcArray(values: NonEmptyNumberArray): ArrayRhythm {
  let newInts: number[] = [];

  for (const i of values)
    newInts = newInts.concat(1).concat(Array(i - 1).fill(0));

  return <ArrayRhythm>newInts;
}
