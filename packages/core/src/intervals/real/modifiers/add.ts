import type { Interval } from "../Interval";
import { mult as multExp } from "@datune/utils/math";
import { from } from "../building";

export function add(self: Interval, other: Interval): Interval {
  const ratio = multExp(self.ratio, other.ratio);

  return from(ratio);
}
