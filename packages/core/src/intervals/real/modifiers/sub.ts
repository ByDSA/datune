import { mult as multExp } from "@datune/utils/math";
import { from } from "../building";
import Interval from "../Interval";

export default function sub(self: Interval, other: Interval): Interval {
  const ratio = multExp(self.ratio, 1 / +other.ratio);

  return from(ratio);
}
