import { Arrays } from "@datune/utils";
import { from } from "./building";
import cache from "./cache";
import Pattern from "./Pattern";

export function rotate(obj: Pattern, n: number = 1): Pattern {
  const values = Array.from(obj.values) as Arrays.Number;

  Arrays.rotateRight(values, n);

  return cache.getOrCreate(values);
}

export function reverse(obj: Pattern): Pattern {
  const eucledianString = Array.from(obj.values).reverse() as Arrays.Number;

  return from(...eucledianString);
}
