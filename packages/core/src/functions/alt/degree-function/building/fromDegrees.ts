import type { DegreeFunc } from "../DegreeFunc";
import { type DegreeArray, Voicings as V } from "alt";
import { fromDegreeVoicing } from "./fromDegreeVoicing";

export function fromDegrees(...degrees: DegreeArray): DegreeFunc {
  const voicing = V.fromDegrees(...degrees);

  return fromDegreeVoicing(degrees[0], voicing);
}
