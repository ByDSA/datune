import NumExp from "../NumExp";
import AbsExp from "./AbsExp";

export default function abs(value: NumExp): AbsExp {
  return new (AbsExp as any)(value);
}
