import type { Degree } from "../Degree";
import { toChromatic as innerToChromatic } from "../utils";
import { Degree as ChromaticDegree } from "degrees/chromatic";

export function toChromaticDegree(obj: Degree): ChromaticDegree {
  return innerToChromatic(obj.diatonicDegree, obj.alts);
}
