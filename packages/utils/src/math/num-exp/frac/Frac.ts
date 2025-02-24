import NumExp from "../NumExp";
import Frac from "./FracExp";

export default function frac(numerator: NumExp, denominator: NumExp): Frac {
  return new (Frac as any)(numerator, denominator);
}
