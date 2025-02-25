import { frac, Pow2Exp } from "@datune/utils/math";
import Interval from "../Interval";
import fromRatio from "./ratio";

export default function fromCents(cents: number): Interval {
  const ratio = cents2ratio(cents);

  return fromRatio(ratio);
}

function cents2ratio(cents: number): Pow2Exp {
  const f = frac(cents, 1200);

  return new (Pow2Exp as any)(f);
}
