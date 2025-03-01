import { frac, FracExp } from "../frac";
import { neg } from "../neg";
import { NumExp } from "../NumExp";
// eslint-disable-next-line import/no-cycle
import { mult } from "./mult";
import { MultExp } from "./MultExp";

export function multFrac(self: FracExp, other: NumExp): NumExp {
  if (other instanceof FracExp) {
    const newN = mult(self.numerator, other.numerator);
    const newD = mult(self.denominator, other.denominator);
    const ret = frac(
      newN,
      newD,
    );

    if (+self * +other < 0)
      return neg(ret);

    return ret;
  }

  if (typeof other === "number")
    return mult(self, frac(+other, 1));

  return new (MultExp as any)(self, other);
}
