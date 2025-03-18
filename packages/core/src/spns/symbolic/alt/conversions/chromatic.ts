import type { Spn } from "../Spn";
import type { Spn as CSpn } from "spns/chromatic";
import { fromPitchOctave } from "spns/symbolic/chromatic/building/pitch-octave";
import { fromAltPitch as cPitchFromAltPitch } from "pitches/chromatic/building/altPitch";

export function toChromatic(spn: Spn): CSpn {
  const cPitch = cPitchFromAltPitch(spn.pitch);

  return fromPitchOctave(cPitch, spn.octave) as CSpn;
}
