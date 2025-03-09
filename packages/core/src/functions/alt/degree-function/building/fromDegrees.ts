import type { DegreeFunc } from "../DegreeFunc";
import type { DegreeArray } from "degrees/alt";
import { Voicings as V } from "voicings/alt";
import { fromDegreeVoicing } from "./fromDegreeVoicing";

export function fromDegrees(...degrees: DegreeArray): DegreeFunc {
  const voicing = V.fromDegrees(...degrees);

  return fromDegreeVoicing(degrees[0], voicing);
}
