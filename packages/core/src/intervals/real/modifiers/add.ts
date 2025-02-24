import { mult as multExp } from "@datune/utils/math";
import { from } from "../building";
import Interval from "../Interval";

export default function add(self: Interval, other: Interval): Interval {
  const ratio = multExp(self.ratio, other.ratio);

  return from(ratio);
}
