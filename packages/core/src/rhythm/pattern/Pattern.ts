import type { Arrays } from "@datune/utils";
import type { ArrayRhythm } from "./array";
import type { Key } from "./cache";
import { lockr } from "@datune/utils/immutables";

export class RhythmPattern implements Iterable<number> {
  array: ArrayRhythm;

  values: Arrays.Number;

  private constructor(key: Key) {
    this.values = key;
    this.array = calcArray(key);

    lockr(this);
  }

  [Symbol.iterator]() {
    return this.values[Symbol.iterator]();
  }
}

function calcArray(values: Arrays.Number): ArrayRhythm {
  let newInts: number[] = [];

  for (const i of values)
    newInts = newInts.concat(1).concat(Array(i - 1).fill(0));

  return <ArrayRhythm>newInts;
}
