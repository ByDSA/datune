import type { Interval } from "../Interval";
import { frac, Pow2Exp } from "datils/math/num-exp";

export function cents2ratio(cents: number): Pow2Exp {
  const f = frac(cents, 1200);

  return new (Pow2Exp as any)(f);
}

export function calcCents(obj: Interval): number {
  if (obj.ratio instanceof Pow2Exp)
    return pow2ToCents(obj.ratio);

  return 1200 * Math.log2(+obj.ratio);
}

function pow2ToCents(ratio: Pow2Exp): number {
  return 1200 * +ratio.arg1;
}
