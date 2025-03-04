import type { Arrays } from "@datune/utils";
import type { ArrayRhythm } from "./array";
import { lockr } from "@datune/utils/immutables";

export class RhythmPattern implements Iterable<number> {
  array: ArrayRhythm;

  values: Arrays.Number;

  private constructor(...values: Arrays.Number) {
    this.values = values;
    this.array = calcArray(values);

    lockr(this);
  }

  private static create(...values: Arrays.Number): RhythmPattern {
    return new RhythmPattern(...values);
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
