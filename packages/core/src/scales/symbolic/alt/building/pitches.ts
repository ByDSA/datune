import type { Scale } from "../Scale";
import type { Pitch, PitchArray } from "pitches/alt";
import { Intervals as DI } from "intervals/diatonic";
import { Intervals as I } from "intervals/alt";
import { DegreeArray as DegreeAltArray } from "../../../../degrees/alt";
import { fromDegrees } from "./degrees";

export function fromPitches(...pitches: PitchArray): Scale {
  const degrees = pitches.map(
    (p: Pitch) => I.fromDiatonicInterval(
      DI.fromInt(+p.diatonic),
      p.alts,
    ),
  ) as DegreeAltArray;
  const scale = fromDegrees(...degrees);

  return scale;
}
