import type { SPN } from "../SPN";
import { Pitches as OctavePitches } from "pitches/alt";
import type { SPN as ChromaticSPN } from "spns/chromatic";
import { SPNs as CSPNs } from "spns/chromatic";

export function toChromatic(obj: SPN): ChromaticSPN {
  const chromaticPitch = OctavePitches.toChromatic(obj.pitch);

  return CSPNs.fromPitchOctave(chromaticPitch, obj.octave) as ChromaticSPN;
}
