import type { Degree } from "../Degree";
import { Degree as ChromaticDegree } from "degrees/chromatic";
import { toChromatic as innerToChromatic } from "../utils";

export function toChromaticDegree(obj: Degree): ChromaticDegree {
  return innerToChromatic(obj.diatonicDegree, obj.alts);
}
