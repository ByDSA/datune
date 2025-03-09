import type { DegreeFunc } from "../DegreeFunc";
import type { DegreeArray } from "chromatic";
import { fromDegrees as voicingFromDegrees } from "voicings/relative/chromatic/building/pitches";
import { fromDegreeVoicing } from "./fromDegreeVoicing";

export function fromDegrees(...degrees: DegreeArray): DegreeFunc {
  const voicing = voicingFromDegrees(...degrees);

  return fromDegreeVoicing(degrees[0], voicing);
}
