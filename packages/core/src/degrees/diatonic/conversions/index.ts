import { I, II, III, IV, V, VI, VII } from "../constants";
import type { Degree } from "../Degree";
import { Degree as ChromaticDegree, Degrees as CDegrees } from "degrees/chromatic";

export function toChromatic(obj: Degree): ChromaticDegree {
  switch (obj) {
    case I: return CDegrees.I;
    case II: return CDegrees.II;
    case III: return CDegrees.III;
    case IV: return CDegrees.IV;
    case V: return CDegrees.V;
    case VI: return CDegrees.VI;
    case VII: return CDegrees.VII;
    default: throw new Error();
  }
}
