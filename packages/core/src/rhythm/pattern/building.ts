import type { ArrayRhythm } from "./array";
import type { RhythmPattern } from "./Pattern";
import { NonEmptyNumberArray } from "datils";
import { cache } from "./cache";

export function fromArray(...ints: ArrayRhythm): RhythmPattern {
  const values = rhythmArray2Values(ints);
  const rhythm = cache.getOrCreate(values);

  return rhythm;
}

export function from(...values: NonEmptyNumberArray): RhythmPattern {
  checkPattern(values);
  const rhythm = cache.getOrCreate(values);

  return rhythm;
}

function checkPattern(ints: NonEmptyNumberArray) {
  for (const i of ints) {
    if (i < 1)
      throw new Error();
  }
}

function rhythmArray2Values(ints: ArrayRhythm): NonEmptyNumberArray {
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

  return ret as NonEmptyNumberArray;
}
