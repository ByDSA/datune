import lcm from "math/lcm";
import { frac, FracExp } from "../frac";
import { mult } from "../mult";
import { neg } from "../neg";
import NumExp from "../NumExp";
import Sign from "../Sign";
import add from "./add";

export default function addFrac(self: FracExp, other: NumExp): NumExp {
  if (other instanceof FracExp) {
    const denominator = lcm(+self.denominator, +other.denominator);
    let numeratorSelf = mult(denominator / +self.denominator, +self.numerator);
    let numeratorOther = mult(denominator / +other.denominator, +other.numerator);

    if (self.sign === Sign.NEGATIVE)
      numeratorSelf = neg(numeratorSelf);

    if (other.sign === Sign.NEGATIVE)
      numeratorOther = neg(numeratorOther);

    const numerator = add(numeratorSelf, numeratorOther);
    const ret = frac(
      numerator,
      denominator,
    );

    return ret;
  }

  if (typeof other === "number")
    return add(self, frac(+other, 1));

  return add(+self, +other);
}
