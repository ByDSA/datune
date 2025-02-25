import { mult } from "..";
import { add } from "../add";
import Ratio from "../NumExp";

export default function sub(self: Ratio, other: Ratio): Ratio {
  return add(self, mult(other, -1));
}
