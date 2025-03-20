import type { RhythmPattern } from "./Pattern";
import { type NonEmptyNumberArray } from "datils/datatypes";
import { Arrays } from "datils/datatypes/arrays";
import { from } from "./building";
import { cache } from "./cache";

export function rotate(obj: RhythmPattern, n: number = 1): RhythmPattern {
  const values = Array.from(obj.values) as NonEmptyNumberArray;

  Arrays.rotateRight(values, n);

  return cache.getOrCreate(values);
}

export function reverse(obj: RhythmPattern): RhythmPattern {
  const eucledianString = Array.from(obj.values).reverse() as NonEmptyNumberArray;

  return from(...eucledianString);
}
