import { fromInt as chromaticFromInt } from "pitches/chromatic";
import { toChromatic as diatonicToChromatic } from "pitches/diatonic";
import Pitch from "../Pitch";

export default function toChromatic(obj: Pitch) {
  const intValue = +diatonicToChromatic(obj.diatonic) + obj.alts;

  return chromaticFromInt(intValue);
}
