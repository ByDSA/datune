import type { Interval } from "../Interval";
import { frac, Pow2Exp } from "datils/math/num-exp";
import { from } from "./ratio";

export function fromCents(cents: number): Interval {
  const ratio = cents2ratio(cents);

  return from(ratio);
}

function cents2ratio(cents: number): Pow2Exp {
  const f = frac(cents, 1200);

  return new (Pow2Exp as any)(f);
}
