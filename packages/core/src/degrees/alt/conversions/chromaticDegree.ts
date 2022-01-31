import { Degree as ChromaticDegree } from "degrees/chromatic";
import Degree from "../Degree";
import { toChromatic as innerToChromatic } from "../utils";

export default function toChromaticDegree(obj: Degree): ChromaticDegree {
  return innerToChromatic(obj.diatonicDegree, obj.alts);
}
