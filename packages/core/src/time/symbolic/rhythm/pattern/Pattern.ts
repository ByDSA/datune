import { Arrays } from "@datune/utils";
import { lockr } from "@datune/utils/immutables";
import { Array } from "../array";

export default class Pattern implements Iterable<number> {
  array: Array;

  values: Arrays.Number;

  private constructor(...values: Arrays.Number) {
    this.values = values;
    this.array = calcArray(values);

    lockr(this);
  }

  private static create(...values: Arrays.Number): Pattern {
    return new Pattern(...values);
  }

  [Symbol.iterator]() {
    return this.values[Symbol.iterator]();
  }
}

function calcArray(values: Arrays.Number): Array {
  let newInts: number[] = [];

  for (const i of values)
    newInts = newInts.concat(1).concat(Array(i - 1).fill(0));

  return <Array>newInts;
}
