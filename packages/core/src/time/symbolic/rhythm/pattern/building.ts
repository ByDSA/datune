import { Arrays } from "@datune/utils";
import type { Array } from "../array";
import { cache } from "./cache";
import type { Pattern } from "./Pattern";

export function fromArray(...ints: Array): Pattern {
  const values = rhythmArray2Values(ints);
  const rhythm = cache.getOrCreate(values);

  return rhythm;
}

export function from(...values: Arrays.Number): Pattern {
  checkPattern(values);
  const rhythm = cache.getOrCreate(values);

  return rhythm;
}

function checkPattern(ints: Arrays.Number) {
  for (const i of ints) {
    if (i < 1)
      throw new Error();
  }
}

function rhythmArray2Values(ints: Array): Arrays.Number {
  const ret: number[] = [];
  let current = 1;

  for (let i = 1; i < ints.length; i++) {
    if (ints[i] === 0)
      current++;
    else {
      ret.push(current);
      current = 1;
    }
  }

  ret.push(current);

  return ret as Arrays.Number;
}
