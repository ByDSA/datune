import { DegreeArray as DegreeAltArray, Degrees } from "../../../../degrees/alt";
import { Scale } from "../Scale";
import { fromDegrees } from "./degrees";
import { Pitch as DiatonicAlt, PitchArray } from "pitches/alt";
import { Degrees as DDegrees } from "degrees/diatonic";

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
