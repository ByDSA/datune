import { PERFECT_UNISON } from "../constants";
import type { Interval } from "../Interval";
import { add } from "./add";
import { neg } from "./neg";

export function mult(self: Interval, num: number): Interval | null {
  const intNum = Math.trunc(num);

  if (intNum < 0)
    return mult(neg(self), -intNum);

  let ret: Interval | null = PERFECT_UNISON;

  for (let i = 0; i < intNum; i++) {
    if (!ret)
      return null;

    ret = add(ret, self);
  }

  return ret;
}
