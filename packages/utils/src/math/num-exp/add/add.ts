import { FracExp } from "../frac";
import NumExp from "../NumExp";
import addFrac from "./frac";

export default function add(self: NumExp, other: NumExp): NumExp {
  if (self instanceof FracExp)
    return addFrac(self, other);

  return +self + +other;
}
