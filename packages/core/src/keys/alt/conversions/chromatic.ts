import { from as CTFrom, Key as ChromaticKey } from "keys/chromatic";
import { toChromatic } from "pitches/alt";
import { toChromatic as toChromaticScale } from "scales/alt";
import Key from "../Key";

export default function toChromaticKey(obj: Key): ChromaticKey {
  return CTFrom(toChromatic(obj.root), toChromaticScale(obj.scale));
}
