import type { Interval } from "../Interval";
import { UNISON } from "../constants";
import { add } from "./add";
import { neg } from "./neg";

export function mult(self: Interval, factor: number): Interval {
  if (factor === 0)
    return UNISON;

  if (self === UNISON)
    return UNISON;

  let acc = self;

  for (let i = 0; i < Math.abs(factor) - 1; i++)
    acc = add(acc, self);

  if (factor < 0)
    acc = neg(acc);

  return acc;
}
