import { fromInt as degreeFromInt } from "degrees/diatonic";
import { Array, Pitch as DiatonicAlt } from "pitches/alt";
import { Array as DegreeAltArray, from as degreeFrom } from "../../../../degrees/alt";
import Scale from "../Scale";
import fromDegrees from "./degrees";

export default function fromDiatonicAlts(...pitches: Array): Scale {
  const degrees = <DegreeAltArray>pitches.map(
    (p: DiatonicAlt) => degreeFrom(degreeFromInt(+p.diatonic), p.alts),
  );
  const scale = fromDegrees(...degrees);

  return scale;
}
