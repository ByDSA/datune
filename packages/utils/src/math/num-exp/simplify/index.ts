import { AbsExp } from "../abs";
import NumExp from "../NumExp";
import simplifyAbs from "./abs";

export default function simplify(obj: NumExp): NumExp {
  if (obj instanceof AbsExp)
    return simplifyAbs(obj);

  return obj;
}
