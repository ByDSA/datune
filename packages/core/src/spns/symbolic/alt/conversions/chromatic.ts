import type { SPN } from "../SPN";
import type { SPN as ChromaticSPN } from "spns/chromatic";
import { SPNs as CSPNs } from "spns/chromatic";
import { fromAltPitch as cPitchFromAltPitch } from "pitches/chromatic/building/altPitch";

export function toChromatic(spn: SPN): ChromaticSPN {
  const cPitch = cPitchFromAltPitch(spn.pitch);

  return CSPNs.fromPitchOctave(cPitch, spn.octave) as ChromaticSPN;
}
