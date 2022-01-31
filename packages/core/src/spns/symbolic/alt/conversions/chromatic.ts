import { toChromatic as pitchToChromatic } from "pitches/alt";
import { fromPitchOctave as chromaticSPNFromPitchOctave, SPN as ChromaticSPN } from "spns/chromatic";
import SPN from "../SPN";

export default function toChromaticSPN(obj: SPN): ChromaticSPN {
  const chromaticPitch = pitchToChromatic(obj.pitch);

  return chromaticSPNFromPitchOctave(chromaticPitch, obj.octave) as ChromaticSPN;
}
