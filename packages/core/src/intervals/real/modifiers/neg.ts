import { pow as powExp } from "@datune/utils/math";
import { from } from "../building";
import { UNISON } from "../constants";
import type { Interval } from "../Interval";

export function neg(self: Interval): Interval {
  if (self === UNISON)
    return UNISON;

  const newRatio = powExp(self.ratio, -1);

  return from(newRatio);
}
