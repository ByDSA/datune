import type { Interval } from "../Interval";
import { pow as powExp } from "datils/math/num-exp";
import { from } from "../building";
import { UNISON } from "../constants";

export function neg(self: Interval): Interval {
  if (self === UNISON)
    return UNISON;

  const newRatio = powExp(self.ratio, -1);

  return from(newRatio);
}
