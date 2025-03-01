import { FracExp } from "../frac";
import { NumExp } from "../NumExp";
// eslint-disable-next-line import/no-cycle
import { addFrac } from "./frac";

export function add(self: NumExp, other: NumExp): NumExp {
  if (self instanceof FracExp)
    return addFrac(self, other);

  return +self + +other;
}
