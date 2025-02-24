import { Degree as ChromaticDegree, I as C_I, II as C_II, III as C_III, IV as C_IV, V as C_V, VI as C_VI, VII as C_VII } from "degrees/chromatic";
import { I, II, III, IV, V, VI, VII } from "../constants";
import Degree from "../Degree";

export function hashCode(obj: Degree): string {
  return (+obj).toString();
}

export function toChromatic(obj: Degree): ChromaticDegree {
  switch (obj) {
    case I: return C_I;
    case II: return C_II;
    case III: return C_III;
    case IV: return C_IV;
    case V: return C_V;
    case VI: return C_VI;
    case VII: return C_VII;
    default: throw new Error();
  }
}
