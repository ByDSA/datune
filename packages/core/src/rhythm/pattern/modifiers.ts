import type { RhythmPattern } from "./Pattern";
import { Arrays } from "@datune/utils";
import { from } from "./building";
import { cache } from "./cache";

export function rotate(obj: RhythmPattern, n: number = 1): RhythmPattern {
  const values = Array.from(obj.values) as Arrays.Number;

  Arrays.rotateRight(values, n);

  return cache.getOrCreate(values);
}

export function reverse(obj: RhythmPattern): RhythmPattern {
  const eucledianString = Array.from(obj.values).reverse() as Arrays.Number;

  return from(...eucledianString);
}
