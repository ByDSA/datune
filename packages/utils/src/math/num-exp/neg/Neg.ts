import NumExp from "../NumExp";
import NegExp from "./NegExp";

export default function abs(value: NumExp): NumExp {
  return new (NegExp as any)(value);
}
