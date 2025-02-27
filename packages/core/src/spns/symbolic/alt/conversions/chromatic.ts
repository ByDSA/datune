import { Pitches as OctavePitches } from "pitches/alt";
import { SPNs as CSPNs, SPN as ChromaticSPN } from "spns/chromatic";
import SPN from "../SPN";

export default function toChromaticSPN(obj: SPN): ChromaticSPN {
  const chromaticPitch = OctavePitches.toChromatic(obj.pitch);

  return CSPNs.fromPitchOctave(chromaticPitch, obj.octave) as ChromaticSPN;
}
