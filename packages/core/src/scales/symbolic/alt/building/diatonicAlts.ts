import type { Scale } from "../Scale";
import { Pitch as DiatonicAlt, PitchArray } from "pitches/alt";
import { Degrees as DDegrees } from "degrees/diatonic";
import { DegreeArray as DegreeAltArray, Degrees } from "../../../../degrees/alt";
import { fromDegrees } from "./degrees";

export function fromDiatonicAlts(...pitches: PitchArray): Scale {
  const degrees = <DegreeAltArray>pitches.map(
    (p: DiatonicAlt) => Degrees.from(
      DDegrees.fromInt(+p.diatonic),
      p.alts,
    ),
  );
  const scale = fromDegrees(...degrees);

  return scale;
}
